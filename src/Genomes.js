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
		const infoAllGenomes = []
		this.httpsOptions.method = 'GET'
		return new Promise((resolve, reject) => {
			const per_page = 100
			let page = 1
			const morePages = true

			this.httpsOptions.path = '/v1/genomes/' +
			
			
			resolve(infoAllGenomes)
		})
	}
}
