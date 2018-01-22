'use strict'

const http = require('http')
const bunyan = require('bunyan')

const NodeMist3 = require('./NodeMist3Abstract')

const kDefaults = {
	downstream: 10,
	upstream: 10
}

module.exports =
class Genomes extends NodeMist3 {
	constructor(options) {
		super(options)
		this.log = bunyan.createLogger(
			{
				name: 'node-mist3-genomes'
			}
		)
	}

	getGenomeInfoByVersion(version) {
		this.httpOptions.method = 'GET'
		this.httpOptions.path = '/v1/genomes/' + version
		this.httpOptions.method = 'GET'
		this.httpOptions.header = {}
		return new Promise((resolve, reject) => {
			this.log.info('Fetching info from genome: ' + version)
			const self = this
			const req = http.request(this.httpOptions, function(res) {
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
}
