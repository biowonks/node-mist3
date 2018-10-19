'use strict'

<<<<<<< HEAD
const https = require('https')

const apiHostnameList = [
	'api.mistdb.com',
	'api.mistdb.caltech.edu'
]

const httpsDefaultOptions = {
=======
let httpsDefaultOptions = {
	hostname: 'api.mistdb.caltech.edu',
>>>>>>> master
	headers: {},
	agent: false
}

module.exports =
class NodeMist3 {
	constructor(options) {
		this.httpsOptions = options ? options : httpsDefaultOptions
<<<<<<< HEAD
	}

	init() {
		httpsDefaultOptions.method = 'HEAD'
		const requests = []
		for (const apiHostname of apiHostnameList) {
			httpsDefaultOptions.hostname = apiHostname
			requests.push(https.request(httpsDefaultOptions))
		}
		return Promise.all(requests).then((responses) => {
			for (const response of responses) {
				console.log(response.statusCode)
			}
			return
		})
=======
>>>>>>> master
	}
}
