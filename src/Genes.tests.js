'use strict'

const stream = require('stream')
const through2 = require('through2')
const fs = require('fs')

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const expect = chai.expect
const should = chai.should()
const Genes = require('./Genes')

describe('Genes', function() {
	this.timeout(1200000)
	describe('byGenomes', function() {
		it('should pass', function() {
			const genes = new Genes()
			const expectedNumberOfGenes = 741
			const genome = 'GCF_000701865.1' // 'GCF_000006765.1'
			return genes.byGenomeVersion(genome).then((items) => {
				expect(items.length).eql(expectedNumberOfGenes)
			})
		})
		it('should fail', function() {
			const genes = new Genes()
			const expectedNumberOfGenes = 741
			const genome = 'GCF_001889063.1' // 'GCF_000006765.1'
			return genes.byGenomeVersion(genome).should.be.rejected
		})
		it('must fail is passed invalid version')
	})
	describe('info', function() {
		it('should pass', function() {
			const genes = new Genes()
			const stableId = 'GCF_000302455.1-A994_RS01985'
			return genes.info(stableId).then((item) => {
				expect(item.stable_id).eql(stableId)
			})
		})
		it('should throw error when fed with invalid id', function() {
			const genes = new Genes()
			const stableId = 'GCF_000302455.1-A994_RS0198'
			return genes.info(stableId).should.be.rejectedWith(Error)
		})
		it.skip('should throw error when fed with empty id', function() {
			const genes = new Genes()
			const stableId = ''
			return genes.info(stableId).should.be.rejectedWith(Error)
		})
	})
	describe('infoAll', function() {
		it('should pass', function() {
			const genes = new Genes()
			const geneVersions = ['GCF_000302455.1-A994_RS01985', 'GCF_000302455.1-A994_RS00015']
			return genes.infoAll(geneVersions).then((items) => {
				items.forEach((item, i) => {
					expect(item.stable_id).eql(geneVersions[i])
				})
			})
		})
		it('should be rejected with invalid stable id', function() {
			const genes = new Genes()
			const stableIds = ['GCF_000302455.1-A994_RS01985', 'xxxGCF_000302455.1-A994_RS00010']
			return genes.infoAll(stableIds).should.be.rejectedWith('Not Found')
		})
		it('should pass with bunch', function() {
			const genes = new Genes()
			const stableIds = [
				'GCF_000006765.1-PA1072',
				'GCF_000006765.1-PA1073',
				'GCF_000006765.1-PA1074',
				'GCF_000006765.1-PA1075',
				'GCF_000006765.1-PA1076',
				'GCF_000006765.1-PA1077',
				'GCF_000006765.1-PA1078',
				'GCF_000006765.1-PA1079',
				'GCF_000006765.1-PA1080',
				'GCF_000006765.1-PA1081',
				'GCF_000006765.1-PA1082',
				'GCF_000196175.1-BD_RS15560',
				'GCF_000196175.1-BD_RS15565',
				'GCF_000196175.1-BD_RS15570',
				'GCF_000196175.1-BD_RS15575',
				'GCF_000006765.1-PA1072',
				'GCF_000006765.1-PA1073',
				'GCF_000006765.1-PA1074',
				'GCF_000006765.1-PA1075',
				'GCF_000006765.1-PA1076',
				'GCF_000006765.1-PA1077',
				'GCF_000006765.1-PA1078',
				'GCF_000006765.1-PA1079',
				'GCF_000006765.1-PA1080',
				'GCF_000006765.1-PA1081',
				'GCF_000006765.1-PA1082',
				'GCF_000196175.1-BD_RS15560',
				'GCF_000196175.1-BD_RS15565',
				'GCF_000196175.1-BD_RS15570',
				'GCF_000196175.1-BD_RS15575',
				'GCF_000196175.1-BD_RS15580',
				'GCF_000196175.1-BD_RS15585',
				'GCF_000196175.1-BD_RS15590',
				'GCF_000196175.1-BD_RS15595',
				'GCF_000196175.1-BD_RS15600',
				'GCF_000196175.1-BD_RS15605',
				'GCF_000196175.1-BD_RS15560',
				'GCF_000196175.1-BD_RS15565',
				'GCF_000196175.1-BD_RS15570',
				'GCF_000196175.1-BD_RS15575',
				'GCF_000196175.1-BD_RS15580',
				'GCF_000196175.1-BD_RS15585',
				'GCF_000196175.1-BD_RS15590',
				'GCF_000196175.1-BD_RS15595',
				'GCF_000196175.1-BD_RS15600',
				'GCF_000196175.1-BD_RS15605',
				'GCF_000196175.1-BD_RS15560',
				'GCF_000196175.1-BD_RS15565',
				'GCF_000196175.1-BD_RS15570',
				'GCF_000196175.1-BD_RS15575',
				'GCF_000196175.1-BD_RS15580',
				'GCF_000196175.1-BD_RS15585',
				'GCF_000196175.1-BD_RS15590',
				'GCF_000196175.1-BD_RS15595',
				'GCF_000196175.1-BD_RS15600',
				'GCF_000196175.1-BD_RS15605',
				'GCF_000006765.1-PA1072',
				'GCF_000006765.1-PA1073',
				'GCF_000006765.1-PA1074',
				'GCF_000006765.1-PA1075',
				'GCF_000006765.1-PA1076',
				'GCF_000006765.1-PA1077',
				'GCF_000006765.1-PA1078',
				'GCF_000006765.1-PA1079',
				'GCF_000006765.1-PA1080',
				'GCF_000006765.1-PA1081',
				'GCF_000006765.1-PA1082',
				'GCF_000196175.1-BD_RS15560',
				'GCF_000196175.1-BD_RS15565',
				'GCF_000196175.1-BD_RS15570',
				'GCF_000196175.1-BD_RS15575',
				'GCF_000196175.1-BD_RS15580',
				'GCF_000196175.1-BD_RS15585',
				'GCF_000196175.1-BD_RS15590',
				'GCF_000196175.1-BD_RS15595',
				'GCF_000196175.1-BD_RS15600',
				'GCF_000196175.1-BD_RS15605',
				'GCF_000196175.1-BD_RS15560',
				'GCF_000196175.1-BD_RS15565',
				'GCF_000196175.1-BD_RS15570',
				'GCF_000196175.1-BD_RS15575',
				'GCF_000196175.1-BD_RS15580',
				'GCF_000196175.1-BD_RS15585',
				'GCF_000196175.1-BD_RS15590',
				'GCF_000196175.1-BD_RS15595',
				'GCF_000196175.1-BD_RS15600',
				'GCF_000196175.1-BD_RS15605',
				'GCF_000196175.1-BD_RS15560',
				'GCF_000196175.1-BD_RS15565',
				'GCF_000196175.1-BD_RS15570',
				'GCF_000196175.1-BD_RS15575',
				'GCF_000196175.1-BD_RS15580',
				'GCF_000196175.1-BD_RS15585',
				'GCF_000196175.1-BD_RS15590',
				'GCF_000196175.1-BD_RS15595',
				'GCF_000196175.1-BD_RS15600',
				'GCF_000196175.1-BD_RS15605',
				'GCF_000196175.1-BD_RS15580',
				'GCF_000196175.1-BD_RS15585',
				'GCF_000196175.1-BD_RS15590',
				'GCF_000196175.1-BD_RS15595',
				'GCF_000196175.1-BD_RS15600',
				'GCF_000196175.1-BD_RS15605',
				'GCF_000196175.1-BD_RS15560',
				'GCF_000196175.1-BD_RS15565',
				'GCF_000196175.1-BD_RS15570',
				'GCF_000196175.1-BD_RS15575',
				'GCF_000196175.1-BD_RS15580',
				'GCF_000196175.1-BD_RS15585',
				'GCF_000196175.1-BD_RS15590',
				'GCF_000196175.1-BD_RS15595',
				'GCF_000196175.1-BD_RS15600',
				'GCF_000196175.1-BD_RS15605',
				'GCF_000196175.1-BD_RS15560',
				'GCF_000196175.1-BD_RS15565',
				'GCF_000196175.1-BD_RS15570',
				'GCF_000196175.1-BD_RS15575',
				'GCF_000196175.1-BD_RS15580',
				'GCF_000196175.1-BD_RS15585',
				'GCF_000196175.1-BD_RS15590',
				'GCF_000196175.1-BD_RS15595',
				'GCF_000196175.1-BD_RS15600',
				'GCF_000196175.1-BD_RS15605',
				'GCF_000006765.1-PA1072',
				'GCF_000006765.1-PA1073',
				'GCF_000006765.1-PA1074',
				'GCF_000006765.1-PA1075',
				'GCF_000006765.1-PA1076',
				'GCF_000006765.1-PA1077',
				'GCF_000006765.1-PA1078',
				'GCF_000006765.1-PA1079',
				'GCF_000006765.1-PA1080',
				'GCF_000006765.1-PA1081',
				'GCF_000006765.1-PA1082',
				'GCF_000196175.1-BD_RS15560',
				'GCF_000196175.1-BD_RS15565',
				'GCF_000196175.1-BD_RS15570',
				'GCF_000196175.1-BD_RS15575',
				'GCF_000196175.1-BD_RS15580',
				'GCF_000196175.1-BD_RS15585',
				'GCF_000196175.1-BD_RS15590',
				'GCF_000196175.1-BD_RS15595',
				'GCF_000196175.1-BD_RS15600',
				'GCF_000196175.1-BD_RS15605',
				'GCF_000196175.1-BD_RS15560',
				'GCF_000196175.1-BD_RS15565',
				'GCF_000196175.1-BD_RS15570',
				'GCF_000196175.1-BD_RS15575',
				'GCF_000196175.1-BD_RS15580',
				'GCF_000196175.1-BD_RS15585',
				'GCF_000196175.1-BD_RS15590',
				'GCF_000196175.1-BD_RS15595',
				'GCF_000196175.1-BD_RS15600',
				'GCF_000196175.1-BD_RS15605',
				'GCF_000196175.1-BD_RS15560',
				'GCF_000196175.1-BD_RS15565',
				'GCF_000196175.1-BD_RS15570',
				'GCF_000196175.1-BD_RS15575',
				'GCF_000196175.1-BD_RS15580',
				'GCF_000196175.1-BD_RS15585',
				'GCF_000196175.1-BD_RS15590',
				'GCF_000196175.1-BD_RS15595',
				'GCF_000196175.1-BD_RS15600',
				'GCF_000196175.1-BD_RS15605',
				'GCF_000196175.1-BD_RS15610'
			]
			return genes.infoAll(stableIds).then((items) => {
				items.forEach((item, i) => {
					expect(item.stable_id).eql(stableIds[i])
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
		})
		it('should pass with any stable ID', function() {
			const genes = new Genes()
			const stableId = 'GCF_000006765.1-PA1105'
			const upstream = 2
			const downstream = 4
			return genes.getGeneHood(stableId, upstream, downstream).then((items) => {
				expect(items.length).eql(upstream + downstream + 1)
			})
		})
		it('should should be rejected with invalid stable id', function() {
			const genes = new Genes()
			const stableId = 'xxGCF_000302455.1-A994_RS00140'
			const upstream = 2
			const downstream = 4
			return genes.getGeneHood(stableId, upstream, downstream).should.be.rejectedWith('Not Found')
		})
	})
	describe('addAseqInfo', function() {
		it('should pass', function() {
			const genes = new Genes()
			const stableId = 'GCF_000302455.1-A994_RS01985'
			return genes.info(stableId).then((gene) => {
				return genes.addAseqInfo([gene]).then((result) => {
					expect(result[0].ai).to.not.be.null
					expect(result.length).eql(1)
				})
			})
		})
		it('should reject if gene is not found', function() {
			const genes = new Genes()
			const stableId = 'GCF_000302455.1-A994_RS01985'
			return genes.info(stableId).then((gene) => {
				gene.aseq_id = 'wTCio8ibKOlaJ_LDGhkSVA'
				return genes.addAseqInfo([gene], {keepGoing: false}).should.be.rejectedWith('not found')
			})
		})
		it('should reject if aseq is null', function() {
			const genes = new Genes()
			const stableId = 'GCF_000302455.1-A994_RS01985'
			return genes.info(stableId).then((gene) => {
				gene.aseq_id = null
				return genes.addAseqInfo([gene], {keepGoing: false}).should.be.rejectedWith('has null aseq')
			})
		})
		it('should pass (with warning) null if aseq_id is null and told to keep going', function() {
			const genes = new Genes()
			const stableId = 'GCF_000302455.1-A994_RS01985'
			return genes.info(stableId).then((gene) => {
				gene.aseq_id = null
				return genes.addAseqInfo([gene], {keepGoing: true}).then((results) => {
					expect(results[0].ai).to.be.null
				})
			})
		})
		it('should warns if gene is not found and asked to not throw error in options', function() {
			const genes = new Genes()
			const stableId = 'GCF_000302455.1-A994_RS01985'
			return genes.info(stableId).then((gene) => {
				gene.aseq_id = 'wTCio8ibKOlaJ_LDGhkSVA'
				return genes.addAseqInfo([gene], {keepGoing: true}).then((results) => {
					expect(results[0].ai).to.be.undefined
				})
			})
		})
		it('should pass with bunch even if one is null any stable ID', function() {
			const genes = new Genes()
			const stableId = 'GCF_000006765.1-PA1105'
			const upstream = 10
			const downstream = 10
			return genes.getGeneHood(stableId, upstream, downstream).then((items) => {
				items.forEach((item) => {
					return genes.addAseqInfo(items, {keepGoing: true}).then((result) => {
						expect(result.length).eql(upstream + downstream + 1)
					})
				})
			})
		})
		it('should pass with bunch', function() {
			const genes = new Genes()
			const stableId = 'GCF_000302455.1-A994_RS00140'
			const upstream = 10
			const downstream = 10
			return genes.getGeneHood(stableId, upstream, downstream).then((items) => {
				return genes.addAseqInfo(items).then((result) => {
					expect(result.length).eql(upstream + downstream + 1)
				})
			})
		})
		it('should pass even if it is way too many', function() {
			const genes = new Genes()
			const options = {keepGoing: true}
			const stableIds = JSON.parse(fs.readFileSync('./data-test/stableIds.3398.json'))
			return genes.infoAll(stableIds, options).then((geneList) => {
				return genes.addAseqInfo(geneList, options).then((geneWithAseqInfoList) => {
					expect(geneWithAseqInfoList.length).eql(stableIds.length)
				})
			})
		})
	})
	describe('Integration', function() {
		describe('getGeneHood and addAseqInfo', function() {
			it('should pass', function(done) {
				const genes = new Genes()
				const stableIds = [
					'GCF_000196175.1-BD_RS15585',
					'GCF_000006765.1-PA1077',
					'GCF_000008485.1-lpg1216'
				]
				const upstream = 10
				const downstream = 10
				stableIds.forEach((stableId, i) => {
					genes.getGeneHood(stableId, upstream, downstream).then((items) => {
						genes.addAseqInfo(items).then((result) => {
							expect(result.length).eql(upstream + downstream + 1)
							if (i === stableIds.length - 1)
								done()
						})
					})
				})
			})
			it('should pass', function(done) {
				const genes = new Genes()
				const stableIds = [
					'GCF_000196175.1-BD_RS15585',
					'GCF_000006765.1-PA1077',
					'GCF_000008485.1-lpg1216'
				]
				const upstream = 10
				const downstream = 10
				stableIds.forEach((stableId, i) => {
					genes.getGeneHood(stableId, upstream, downstream).then((items) => {
						genes.addAseqInfo(items).then((result) => {
							expect(result.length).eql(upstream + downstream + 1)
							if (i === stableIds.length - 1)
								done()
						})
					})
				})
			})
			it('should pass wrapped in streams', function(done) {
				const upstream = 10
				const downstream = 10

				const genes = new Genes()
				const stableIds = [
					'GCF_000196175.1-BD_RS15585',
					'GCF_000006765.1-PA1077',
					'GCF_000008485.1-lpg1216'
				]

				const geneStream = new stream.Readable()
				stableIds.forEach((stableId) => {
					geneStream.push(stableId)
				})
				geneStream.push(null)

				const addSeqInfo = through2.obj(function(chunk, enc, next) {
					const self = this
					genes.addAseqInfo(chunk).then((items) => {
						self.push(JSON.stringify(items))
						next()
					})
				})

				const getGN = function(ds, us) {
					return through2.obj(function(chunk, enc, next) {
						const self = this
						genes.getGeneHood(chunk, ds, us).then(function(result) {
							next()
						})
					})
				}

				geneStream.pipe(getGN(downstream, upstream)).pipe(addSeqInfo)
					.on('finish', () => {
						expect(1).eql(1)
						done()
					})
			})
		})
	})
})
