'use strict'

const https = require('https')
const bunyan = require('bunyan')

const NodeMist3 = require('./NodeMist3Abstract')

const kDefaults = {
	maxRequests: 30
}

module.exports =
class Taxonomy extends NodeMist3 {
	constructor(options, logLevel = 'info') {
		super(options)
		this.log = bunyan.createLogger(
			{
				name: 'node-mist3-taxonomy',
				level: logLevel
			}
		)
	}

	getParents(taxid, options = {skipFailed: false}) {
		this.log.info(`Getting parents of taxid: ${taxid} with options ${JSON.stringify(options)}`)
		this.httpsOptions.method = 'GET'
		this.httpsOptions.path = `/v1/taxonomy/${taxid}/parents`
		return new Promise((resolve, reject) => {
			const request = https.request(this.httpsOptions, (response) => {
				if (response.statusCode === 504) {
					if (options.skipFailed){
						this.log.warn(`taxid ${taxid} ::: ${response.statusCode} - ${response.statusMessage}`)
						return resolve([])
					}
					else {
						this.log.error(`taxid ${taxid} ::: ${response.statusCode} - ${response.statusMessage}`)
						return reject(response.statusCode)
					}
				}
				const chunks = []
				response.on('data', (chunk) => chunks.push(chunk))
				response.on('end', () => {
					const buffer = Buffer.concat(chunks)
					let taxonomy = []
					try {
						taxonomy = JSON.parse(buffer)
						if (!Array.isArray(taxonomy))
							throw Error(taxonomy)
						resolve(taxonomy)
					}
					catch (err) {
						if (options.skipFailed === true){
							this.log.warn(buffer.toString())
							resolve([])
						}
						else {
							this.log.error(buffer.toString())
							reject(err)
						}
					}
				})
				response.on('error', (err) => {
					this.log.fatal(err)
					reject(err)
				})
			})
			request.end()
		})
	}

	getParentsMany(taxids, options = {skipFailed: true}) {
		const tmpTaxids = []
		taxids.forEach((taxid) => tmpTaxids.push(taxid))
		this.log.info(`getting taxonomy from ${tmpTaxids.length} taxids`)
		const self = this
		async function asyncGetMany (listOfTaxids) {
			const allResponses = []
			self.log.debug(`Full list: ${listOfTaxids}`)
			while (listOfTaxids.length !== 0) {
				const requests = []
				const batch = listOfTaxids.splice(0, kDefaults.maxRequests)
				self.log.debug(`new Batch: ${batch}`)
				batch.forEach((taxid) => requests.push(self.getParents(taxid, options)))
				await Promise.all(requests).then((responses) => {
					responses.forEach((response) => {
						allResponses.push(response)
					})
				}).catch((err) => {
					throw err
				})
			}
			return allResponses
		}
		return asyncGetMany(tmpTaxids)
	}
}
