'use strict'


let httpsDefaultOptions = {
	hostname: 'api.mistdb.caltech.edu',
	headers: {},
	agent: false
}

module.exports =
class NodeMist3 {
	constructor(options) {
		this.httpsOptions = options ? options : httpsDefaultOptions
	}
}
