'use strict'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const expect = chai.expect
const should = chai.should()

const NodeMist3Abstract = require('./NodeMist3Abstract')

describe.only('NodeMist3Abstract', function() {
	it('init should work', function() {
		const abstract = new NodeMist3Abstract()
		return abstract.init()
	})
})
