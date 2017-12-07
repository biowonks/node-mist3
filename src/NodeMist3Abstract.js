'use strict'

let httpDefaultOptions = {
	method: 'GET',
	hostname: 'api.mistdb.com',
	port: 5000,
	headers: {},
	agent: false
}

module.exports =
class NodeMist3 {
	constructor(options) {
		this.httpOptions = options ? options : httpDefaultOptions
	}
}
