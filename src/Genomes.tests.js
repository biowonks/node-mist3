'use strict'

const stream = require('stream')
const through2 = require('through2')

const expect = require('chai').expect
const Genomes = require('./Genomes')

describe('Genomes', function() {
	describe('getGenomeInfoByGenomeVersion', function() {
		it('should pass', function() {
			const genomes = new Genomes()
			const genomeVersion = 'GCF_000302455.1'
			return genomes.getGenomeInfoByVersion(genomeVersion).then((item) => {
				expect(item.version).eql(genomeVersion)
			})
		})
	})
	describe.skip('getInfoAll', function() {
		it('should get info of all genomes', function() {
			this.timeout(240000)
			const genomes = new Genomes()
			const minNumGenomes = 5000
			return genomes.getInfoAll().then((genomeInfoAll) => {
				expect(genomeInfoAll.length).greaterThan(minNumGenomes)
			})
		})
	})
})
