'use strict'

let expect = require('chai').expect
let Genes = require('./Genes')

describe('Genes', function() {
	describe('byGenomes', function() {
		it('should pass', function() {
			this.timeout(14000)
			const genes = new Genes()
			const expectedNumberOfGenes = 736
			const genome = 'GCF_000701865.1' // 'GCF_000006765.1'
			return genes.byGenome(genome).then((items) => {
				expect(items.length).eql(expectedNumberOfGenes)
			})
		})
		it('must fail is passed invalid version')
	})
	describe('info', function() {
		it('should pass', function() {
			const genes = new Genes()
			const geneVersion = 'GCF_000302455.1-A994_RS01985'
			return genes.info(geneVersion).then((item) => {
				expect(item.stable_id).eql(geneVersion)
			})
		})
	})
	describe('infoAll', function() {
		it('should pass', function() {
			const genes = new Genes()
			const geneVersions = ['GCF_000302455.1-A994_RS01985', 'GCF_000302455.1-A994_RS00010']
			return genes.infoAll(geneVersions).then((items) => {
				items.forEach((item, i) => {
					expect(item.stable_id).eql(geneVersions[i])
				})
			})
		})
	})
	describe('getGeneHood', function() {
		it('should pass', function() {
			const genes = new Genes()
			const stableId = 'GCF_000302455.1-A994_RS00140'
			const upstream = 2
			const downstream = 4
			return genes.getGeneHood(stableId, upstream, downstream).then((items) => {
				expect(items.length).eql(upstream + downstream + 1)
			})
				.catch((err) => {
					console.log(err)
				})
		})
	})
})
