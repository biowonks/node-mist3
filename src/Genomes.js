'use strict'

const https = require('https')
const bunyan = require('bunyan')

const NodeMist3 = require('./NodeMist3Abstract')

module.exports =
class Genomes extends NodeMist3 {
	constructor(options, logLevel = 'info') {
		super(options)
		this.log = bunyan.createLogger(
			{
				name: 'node-mist3-genomes',
				level: logLevel
			}
		)
	}

	getGenomeInfoByVersion(version) {
		this.httpsOptions.method = 'GET'
		this.httpsOptions.path = '/v1/genomes/' + version
		this.httpsOptions.header = {}
		return new Promise((resolve, reject) => {
			this.log.info('Fetching info from genome: ' + version)
			const self = this
			const req = https.request(this.httpsOptions, function(res) {
				const chunks = []
				res.on('data', function(chunk) {
					chunks.push(chunk)
				})
				res.on('end', function() {
					self.log.info('Information from genome ' + version + ' was received.')
					const info = JSON.parse(Buffer.concat(chunks))
					resolve(info)
				})
			})
			req.end()
		})
	}

	getInfoAll() {
		const self = this
		const per_page = 100
		this.httpsOptions.method = 'GET'
		const getOnePage = (page) => { 
			self.httpsOptions.path = `/v1/genomes?per_page=${per_page}&page=${page}`
			const chunks = []
			return new Promise((resolve, reject) => {
				const req = https.request(self.httpsOptions, (res) => {
					if (res.statusCode === 400) {
						buffer.push(Buffer.from([null]))
					}
					if (res.statusCode !== 200) {
						reject(res.statusMessage)
					}
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
				})
				req.end()
			})	
		}
		async function getAll() {
			const per_page = 100
			const infoAllGenomes = []
			let page = 1
			let maxIterations = 1000
			let morePages = true
			while (morePages === true && maxIterations > 0) {
				self.log.debug(`Requesting page ${page}`)
				await getOnePage(page).then(function(data) {
					self.log.debug(`Page ${page} received`)
					if (data.length !== 0) {
 						data.forEach((genome) => {
							infoAllGenomes.push(genome)
						})
						page++
					}
					else {
						morePages = false
					}
				})
				.catch((err) => {
					morePages = false
					throw err
				})
				maxIterations--
			}
			return infoAllGenomes
		}
		return getAll().then((allInfo) => {
			this.log.debug('Done fetching genomes')
			return allInfo
		})
	}
}
