'use strict'

const http = require('http')
const bunyan = require('bunyan')

const NodeMist3 = require('./NodeMist3Abstract')

const kDefaults = {
	downstream: 10,
	upstream: 10,
	maxAseqs: 1000
}

module.exports =
class Genes extends NodeMist3 {
	constructor(options) {
		super(options)
		this.log = bunyan.createLogger(
			{
				name: 'node-mist3-genes'
			}
		)
	}

	addAseqInfo(genes = [], options = {throwError: true}) {
		this.log.info(`Adding Aseq information for ${genes.length} proteins from MiST3`)
		return new Promise((resolve, reject) => {
			const aseqs = []

			genes.forEach((gene) => {
				aseqs.push(gene.aseq_id)
			})

			const unique = aseqs.filter((v, i, a) => {
				return a.indexOf(v) === i
			})

			const aseqFetches = []

			while (unique.length !== 0) {
				const batch = unique.splice(0, kDefaults.maxAseqs)
				aseqFetches.push(this.getAseqInfoBatch(batch))
			}
			Promise.all(aseqFetches).then((aseqBatches) => {
				this.log.info('All Aseq has been retrieved, now adding to genes')
				let aseqInfo = []
				try {
					aseqBatches.forEach((aseqBatch) => {
						aseqInfo = aseqInfo.concat(aseqBatch)
					})
					genes.forEach((gene) => {
						gene.ai = aseqInfo.filter((item) => {
							return gene.aseq_id === item.id
						})[0]
						if (!gene.ai) {
							if (gene.header())
								this.log.warn(`gene ${gene.header_} not found`)
							this.log.warn(`Aseq ${gene.aseq_id} not found`)
							if (options.throwError === true) {
								reject(`Aseq ${gene.aseq_id} not found`)
							}
						}
					})
					resolve(genes)
				}
				catch (err) {
					reject(err.message)
				}
			})
				.catch((err) => {
					reject(err)
				})
		})
	}

	getAseqInfoBatch(aseqs = [], options = {throwError: true}) {
		this.log.info(`Fetching Aseq Info from MiST3`)
		this.httpOptions.method = 'POST'
		this.httpOptions.path = '/v1/aseqs'
		this.httpOptions.headers = {
			'Content-Type': 'application/json'
		}
		if (aseqs.length > kDefaults.maxAseqs)
			throw Error('Only 1000 aseqs can be called at once')
		const content = JSON.stringify(aseqs)
		this.log.info(`Fetching information for ${aseqs.length} sequences from MiST3`)
		let buffer = []
		return new Promise((resolve, reject) => {
			const req = http.request(this.httpOptions, (res) => {
				if (res.statusCode === 400) {
					reject(res)
					return
				}
				if (res.statusCode !== 200) {
					reject(res)
					return
				}
				res.on('data', (data) => {
					buffer.push(data)
				})
				res.on('error', reject)
				res.on('end', () => {
					this.log.info('Aseq retrieved')
					const items = JSON.parse(Buffer.concat(buffer))
					const final = []
					resolve(items)
				})
			})
			req.write(content)
			req.end()
		})
	}

	infoAll(geneList) {
		const queries = []
		geneList.forEach((stableId) => {
			queries.push(this.info(stableId))
		})
		return new Promise((resolve, reject) => {
			Promise.all(queries).then((results) => {
				resolve(results)
			})
		})
	}

	info(stableID) {
		this.httpOptions.method = 'GET'
		this.httpOptions.path = '/v1/genes/' + stableID
		return new Promise((resolve, reject) => {
			this.log.info('Fetching gene information from MiST3 : ' + stableID)
			const req = http.request(this.httpOptions, function(res) {
				const chunks = []
				res.on('data', function(chunk) {
					chunks.push(chunk)
				})
				res.on('end', function() {
					const newGenes = JSON.parse(Buffer.concat(chunks))
					resolve(newGenes)
				})
				res.on('error', reject)
			})
			req.end()
		})
	}

	byGenome(version) {
		const allGenes = []
		let page = 1
		const getGenes = (v, p) => {
			return new Promise((resolve, rejectg) => {
				this.byGenomePerPage(v, p)
					.then((newGenes) => {
						if (newGenes.length !== 0) {
							newGenes.forEach((gene) => {
								allGenes.push(gene)
							})
							p++
							resolve(getGenes(v, p))
						}
						else {
							resolve(allGenes)
						}
					})
			})
		}
		return getGenes(version, page)
	}

	byGenomePerPage(version, page = 1) {
		const genes = []
		const genesPerPage = 100
		this.httpOptions.method = 'GET'
		this.httpOptions.path = '/v1/genomes/' + version + '/genes?per_page=' + genesPerPage + '&page=' + page
		return new Promise((resolve, reject) => {
			this.log.info('Fetching genes from MiST3 : ' + version + ' page ' + page)
			const req = http.request(this.httpOptions, function(res) {
				const chunks = []
				res.on('data', function(chunk) {
					chunks.push(chunk)
				})
				res.on('end', function() {
					const newGenes = JSON.parse(Buffer.concat(chunks))
					resolve(newGenes)
				})
			})
			req.end()
		})
	}

	getGeneHood(stableId, downstream = kDefaults.downstream, upstream = kDefaults.upstream) {
		return new Promise((resolve, reject) => {
			this.info(stableId).then((mainGeneInfo) => {
				this.log.info(`Info from reference gene acquired: ${mainGeneInfo.aseq_id}`)
				this.httpOptions.method = 'GET'
				this.httpOptions.path = `/v1/genes/${stableId}/neighbors?amountBefore=${upstream}&amountAfter=${downstream}`
				const req = http.request(this.httpOptions, (res) => {
					const chunks = []
					res.on('data', (chunk) => {
						chunks.push(chunk)
					})
					res.on('end', () => {
						this.log.info('Got info from gene neighborhood. Parsing.')
						const geneHood = JSON.parse(Buffer.concat(chunks))
						geneHood.splice(upstream, 0, mainGeneInfo)
						resolve(geneHood)
					})
					res.on('error', (err) => {
						reject(err)
					})
				})
				req.end()
			})
		})
	}
}
