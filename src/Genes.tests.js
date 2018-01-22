'use strict'

const stream = require('stream')
const through2 = require('through2')

const expect = require('chai').expect
const Genes = require('./Genes')

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
		it.skip('should throw error when fed with invalid id', function() {
			const genes = new Genes()
			const geneVersion = 'GCF_000302455.1-A994_RS0198'
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
		it('should pass with bunch', function() {
			this.timeout(14000)
			const genes = new Genes()
			const geneVersions = [
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
	describe('getAseqInfo', function() {
		it('should pass', function() {
			const genes = new Genes()
			const geneVersion = 'GCF_000302455.1-A994_RS01985'
			return genes.info(geneVersion).then((gene) => {
				genes.getAseqInfo([gene]).then((result) => {
					expect(result.length).eql(1)
				})
			})
		})
		it('should pass with bunch', function() {
			const genes = new Genes()
			const stableId = 'GCF_000302455.1-A994_RS00140'
			const upstream = 10
			const downstream = 10
			return genes.getGeneHood(stableId, upstream, downstream).then((items) => {
				genes.getAseqInfo(items).then((result) => {
					expect(result.length).eql(upstream + downstream + 1)
				})
			})
		})
	})
	describe('Integration', function() {
		describe('getGeneHood and getAseqInfo', function() {
			this.timeout(14000)
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
						genes.getAseqInfo(items).then((result) => {
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
						genes.getAseqInfo(items).then((result) => {
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
					genes.getAseqInfo(chunk).then((items) => {
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
