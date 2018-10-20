'use strict'

const https = require('https')
const bunyan = require('bunyan')

const NodeMist3 = require('./NodeMist3Abstract')

const kDefaults = {
	downstream: 10,
	upstream: 10,
	maxAseqs: 1000,
	maxInfo: 250,
	maxTries: 2
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

	checkGenes(genes = []) {
		return new Promise((resolve, reject) => {

		})
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

	getAseqInfoBatch(aseqs = [], options = {throwError: true}, tries = 0) {
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
					this.log.debug(`Error message of code ${res.statusCode}`)
					this.log.debug(`Error message: ${res.statusMessage}`)
					this.log.warn('********************Error requesting aseq INFO')
					if (tries < kDefaults.maxTries) {
						this.log.warn(`trying again: ${tries + 1}`)
						resolve(this.getAseqInfoBatch(aseqs, options, tries + 1))
						return
					}
					else {
						console.log('Here')
						this.log.fatal(`Can't get all the data. Aborting operation.`)
						throw err
					}
				}
				else {
					res.on('data', (data) => {
						buffer.push(data)
					})
					res.on('error', reject)
					res.on('end', () => {
						this.log.info('Aseq retrieved')
						const data = Buffer.concat(buffer).toString()
						if (data.match('html')) {
							this.log.debug(Buffer.concat(buffer).toString())
							this.log.debug(res.statusMessage)
							this.log.debug(res.statusCode)
						}
						const items = JSON.parse(Buffer.concat(buffer))
						const final = []
						resolve(items)
					})
				}
			})
			req.on('error', (err) => {
				console.log('Here')
				this.log.fatal(`Can't get all the data. Aborting operation.`)
				throw err
			})
			req.write(content)
			req.end()
		})
	}

	infoAll(geneList, options={keepGoing: false}) {
		const self = this
		const newList = []
		geneList.forEach((item) => {
			newList.push(item)
		})
		async function asyncInfo (list) {
			const data = []
			while (list.length !== 0) {
				const queries = []
				const geneBatch = list.splice(0, kDefaults.maxInfo)
				geneBatch.forEach((stableId) => {
					queries.push(self.info(stableId, options))
				})
				await Promise.all(queries).then((results) => {
						results.forEach((item) => {
							data.push(item)
						})
					}).catch((err) => {
						throw err
					})
			}
			return data			
		}
		return asyncInfo(newList)
	}

	info(stableId, options={keepGoing: false}, tries = 0) {
		return new Promise((resolve, reject) => {
			this.httpsOptions.method = 'GET'
			this.httpsOptions.path = '/v1/genes/' + stableId
			this.log.info(`Fetching gene information from MiST3: ${stableId} | ${tries}`)
			const req = https.request(this.httpsOptions, (res) => {
				this.log.debug(`Information received for ${stableId}`)
				const chunks = []
				if (res.statusCode === 404) {
					this.log.error(`${stableId} ${res.statusMessage}`)
					if (options.keepGoing)
						resolve({})
					else
						reject(Error(`${stableId} ${res.statusMessage}`))
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
			req.on('error', (err) => {
				this.log.warn(`Error on request: ${stableId}`)
				if (tries < kDefaults.maxTries) {
					this.log.warn(`trying again: ${tries + 1}`)
					resolve(this.info(stableId, options, tries + 1))
					return
				}
				console.log('Here')
				this.log.fatal(`Error on request: ${stableId}`)
				throw err
			})
			req.end()
		})
	}

	byGenomeVersion(version) {
		const allGenes = []
		let page = 1
		const getGenes = (v, p) => {
			return new Promise((resolve, reject) => {
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
					}).catch(reject)
			})
		}
		return getGenes(version, page)
	}

	byGenomeVersionPerPage(version, page = 1) {
		const genes = []
		const genesPerPage = 100
		const self = this
		this.httpsOptions.method = 'GET'
		this.httpsOptions.path = '/v1/genomes/' + version + '/genes?per_page=' + genesPerPage + '&page=' + page
		return new Promise((resolve, reject) => {
			self.log.info('Fetching genes from MiST3 : ' + version + ' page ' + page)
			const req = https.request(this.httpsOptions, function(res) {
				if (res.statusCode === 504) {
					self.log.error(`${res.statusCode} - ${res.statusMessage}`)
					return reject(res.statusCode)
				}
				const chunks = []
				res.on('data', function(chunk) {
					chunks.push(chunk)
				})
				res.on('end', function() {
					let newGenes = ''
					const buffer = Buffer.concat(chunks)
					try {
						newGenes = JSON.parse(buffer)
						resolve(newGenes)
					}
					catch(err) {
						self.log.error(buffer.toString())
						reject(err)
					}
				})
				req.on('error', function(err) {
					// This is not a "Second reject", just a different sort of failure
					reject(err);
				});
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
