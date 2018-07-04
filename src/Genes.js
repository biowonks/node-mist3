'use strict'

const https = require('https')
const bunyan = require('bunyan')

const NodeMist3 = require('./NodeMist3Abstract')

const kDefaults = {
	downstream: 10,
	upstream: 10,
	maxAseqs: 1000
}

module.exports =
class Genes extends NodeMist3 {
	constructor(options, logLevel = 'info') {
		super(options)
		this.log = bunyan.createLogger(
			{
				name: 'node-mist3-genes',
				level: logLevel
			}
		)
	}

	addAseqInfo(genes = [], options = {keepGoing: false}) {
		this.log.info(`Adding Aseq information for ${genes.length} proteins from MiST3`)
		return new Promise((resolve, reject) => {
			const aseqs = []

			genes.forEach((gene) => {
				if (gene.aseq_id)
					aseqs.push(gene.aseq_id)
			})

			const unique = aseqs.filter((v, i, a) => {
				return a.indexOf(v) === i
			})

			const aseqFetches = []
			let error = false

			while (unique.length !== 0) {
				const batch = unique.splice(0, kDefaults.maxAseqs)
				aseqFetches.push(this.getAseqInfoBatch(batch))
			}
			Promise.all(aseqFetches).then((aseqBatches) => {
				this.log.info('All Aseq has been retrieved, now adding to genes')
				let aseqInfo = []

				aseqBatches.forEach((aseqBatch) => {
					aseqInfo = aseqInfo.concat(aseqBatch)
				})
				genes.forEach((gene) => {
					if (gene.aseq_id) {
						gene.ai = aseqInfo.filter((item) => {
							return gene.aseq_id === item.id
						})[0]
						if (!gene.ai) {
							if (options.keepGoing === false) {
								this.log.error(`Aseq ${gene.aseq_id} not found`)
								throw Error(`Aseq ${gene.aseq_id} not found`)
							}
							else {
								this.log.warn(`Aseq ${gene.aseq_id} not found`)
							}
						}
					}
					else {
						if (options.keepGoing === false) {
							this.log.error(`Gene ${gene.stable_id} has null aseq`)
							throw Error(`Gene ${gene.stable_id} has null aseq`)
						}
						this.log.warn(`Gene ${gene.stable_id} has null aseq`)
						gene.ai = null
					}
				})
				resolve(genes)
			})
				.catch((err) => {
					reject(err)
				})
		})
	}

	getAseqInfoBatch(aseqs = [], options = {throwError: true}) {
		this.log.info(`Fetching Aseq Info from MiST3`)
		this.httpsOptions.method = 'POST'
		this.httpsOptions.path = '/v1/aseqs'
		this.httpsOptions.headers = {
			'Content-Type': 'application/json'
		}
		if (aseqs.length > kDefaults.maxAseqs)
			throw Error('Only 1000 aseqs can be called at once')
		const content = JSON.stringify(aseqs)
		this.log.info(`Fetching information for ${aseqs.length} sequences from MiST3`)
		let buffer = []
		return new Promise((resolve, reject) => {
			const req = https.request(this.httpsOptions, (res) => {
				if (res.statusCode === 400) {
					buffer.push(Buffer.from([null]))
				}
				if (res.statusCode !== 200) {
					reject(res.statusMessage)
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
			}).catch((err) => {
				reject(err)
			})
		})
	}

	info(stableId) {
		return new Promise((resolve, reject) => {
			this.httpsOptions.method = 'GET'
			this.httpsOptions.path = '/v1/genes/' + stableId
			this.log.info('Fetching gene information from MiST3 : ' + stableId)
			const req = https.request(this.httpsOptions, (res) => {
				const chunks = []
				if (res.statusCode === 404) {
					this.log.error(`${stableId} ${res.statusMessage}`)
					reject(Error(`${stableId} ${res.statusMessage}`))
					return
				}
				res.on('data', function(chunk) {
					chunks.push(chunk)
				})
				res.on('end', function() {
					const allChunks = Buffer.concat(chunks)
					try {
						const newGenes = JSON.parse(allChunks)
						resolve(newGenes)
					}
					catch (err) {
						console.log(allChunks.toString())
						reject(allChunks)
					}
				})
				res.on('error', reject)
			})
			req.end()
		})
	}

	byGenomeVersion(version) {
		const allGenes = []
		let page = 1
		const getGenes = (v, p) => {
			return new Promise((resolve, rejectg) => {
				this.byGenomeVersionPerPage(v, p)
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

	byGenomeVersionPerPage(version, page = 1) {
		const genes = []
		const genesPerPage = 100
		this.httpsOptions.method = 'GET'
		this.httpsOptions.path = '/v1/genomes/' + version + '/genes?per_page=' + genesPerPage + '&page=' + page
		return new Promise((resolve, reject) => {
			this.log.info('Fetching genes from MiST3 : ' + version + ' page ' + page)
			const req = https.request(this.httpsOptions, function(res) {
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
			this.info(stableId)
				.then((mainGeneInfo) => {
					this.log.info(`Info from reference gene acquired: ${mainGeneInfo.aseq_id}`)
					this.httpsOptions.method = 'GET'
					this.httpsOptions.path = `/v1/genes/${stableId}/neighbors?amountBefore=${upstream}&amountAfter=${downstream}`
					const req = https.request(this.httpsOptions, (res) => {
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
				.catch((err) => {
					reject(err)
				})
		})
	}
}
