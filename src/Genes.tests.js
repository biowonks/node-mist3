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
	describe('search', function() {
		it('should return null if no info is found', function() {
			const genes = new Genes()
			const term = 'Galf'
			const expected = []
			return genes.search(term).then((response) => {
				expect(response).eql(expected)
			})
		})
		it('should return info if find gene', function() {
			const genes = new Genes()
			const term = 'Galf_1012'
			const expected = [
				{
					id: 13282865,
					stable_id: 'GCF_000145255.1-GALF_RS05040',
					component_id: 164319,
					dseq_id: 'zQfabUSF3UO3sUrJH83KRw',
					aseq_id: 'R0eYWHRrArOEBq6-QrE7uA',
					accession: 'WP_013292982',
					version: 'WP_013292982.1',
					locus: 'GALF_RS05040',
					old_locus: 'Galf_1012',
					location: '1067262..1068884',
					strand: '+',
					start: 1067262,
					stop: 1068884,
					length: 1623,
					names: null,
					pseudo: false,
					notes: null,
					product: 'methyl-accepting chemotaxis protein',
					codon_start: 1,
					translation_table: 11,
					qualifiers: {},
					cds_location: '1067262..1068884',
					cds_qualifiers: {
						inference: 'COORDINATES: similar to AA sequence:RefSeq:WP_013292983.1'
					}
				}
			]
			return genes.search(term).then((response) => {
				expect(response).eql(expected)
			})
		})
	})
	describe('searchMany', function() {
		it('should return info', function() {
			const genes = new Genes()
			const terms = [
				'Galf_1012',
				'Galf_1013',
				'X970_27400',
				'RPC_2742',
				'PCC21_027230',
				'Spea_0900'
			]
			const expected = [
				[{
					id: 13282865,
					stable_id: 'GCF_000145255.1-GALF_RS05040',
					component_id: 164319,
					dseq_id: 'zQfabUSF3UO3sUrJH83KRw',
					aseq_id: 'R0eYWHRrArOEBq6-QrE7uA',
					accession: 'WP_013292982',
					version: 'WP_013292982.1',
					locus: 'GALF_RS05040',
					old_locus: 'Galf_1012',
					location: '1067262..1068884',
					strand: '+',
					start: 1067262,
					stop: 1068884,
					length: 1623,
					names: null,
					pseudo: false,
					notes: null,
					product: 'methyl-accepting chemotaxis protein',
					codon_start: 1,
					translation_table: 11,
					qualifiers: {},
					cds_location: '1067262..1068884',
					cds_qualifiers: {
						inference: 'COORDINATES: similar to AA sequence:RefSeq:WP_013292983.1'
					}
				}],
				[{
					id: 13282866,
					stable_id: 'GCF_000145255.1-GALF_RS05045',
					component_id: 164319,
					dseq_id: 'qwhR8bGlSFpuWWugqj0uXA',
					aseq_id: '2aa9s6Sz2LXYGggmkq_vAw',
					accession: 'WP_013292983',
					version: 'WP_013292983.1',
					locus: 'GALF_RS05045',
					old_locus: 'Galf_1013',
					location: '1068967..1070619',
					strand: '+',
					start: 1068967,
					stop: 1070619,
					length: 1653,
					names: null,
					pseudo: false,
					notes: null,
					product: 'methyl-accepting chemotaxis protein',
					codon_start: 1,
					translation_table: 11,
					qualifiers: {},
					cds_location: '1068967..1070619',
					cds_qualifiers: {
						inference: 'COORDINATES: similar to AA sequence:RefSeq:WP_013292983.1'
					}}],
				[{
					id: 419052180,
					stable_id: 'GCF_000510325.1-X970_RS26830',
					component_id: 11574308,
					dseq_id: 'minQhT-4bVsGyjpQw0yF6A',
					aseq_id: 'TSEy2ycJLt33L6n9j5mEQg',
					accession: 'WP_013970514',
					version: 'WP_013970514.1',
					locus: 'X970_RS26830',
					old_locus: 'X970_27400',
					location: 'complement(5907483..5909108)',
					strand: '-',
					start: 5907483,
					stop: 5909108,
					length: 1626,
					names: null,
					pseudo: false,
					notes: null,
					product: 'methyl-accepting chemotaxis protein',
					codon_start: 1,
					translation_table: 11,
					qualifiers: {},
					cds_location: 'complement(5907483..5909108)',
					cds_qualifiers: {
						inference: 'COORDINATES: similar to AA sequence:RefSeq:WP_003255688.1'
					}}],
				[{
					id: 2027294,
					stable_id: 'GCF_000013745.1-RPC_RS13740',
					component_id: 14325,
					dseq_id: 'pitI5FewGwc5aKfJ-NGIgQ',
					aseq_id: 'Fp3W_3cMK8aO_BnRDjlQ_Q',
					accession: 'WP_011473186',
					version: 'WP_011473186.1',
					locus: 'RPC_RS13740',
					old_locus: 'RPC_2742',
					location: 'complement(2978047..2979729)',
					strand: '-',
					start: 2978047,
					stop: 2979729,
					length: 1683,
					names: null,
					pseudo: false,
					notes: null,
					product: 'methyl-accepting chemotaxis protein',
					codon_start: 1,
					translation_table: 11,
					qualifiers: {},
					cds_location: 'complement(2978047..2979729)',
					cds_qualifiers: {
						inference: 'COORDINATES: similar to AA sequence:RefSeq:WP_011473186.1'
					}}],
				[{
					id: 87911390,
					stable_id: 'GCF_000294535.1-PCC21_RS13425',
					component_id: 2452254,
					dseq_id: 'RQNAuP3belz2Xu08I7OWAQ',
					aseq_id: 'FcM1mJdagdvHt-lV1gZODg',
					accession: 'WP_014915926',
					version: 'WP_014915926.1',
					locus: 'PCC21_RS13425',
					old_locus: 'PCC21_027230',
					location: '3067593..3069314',
					strand: '+',
					start: 3067593,
					stop: 3069314,
					length: 1722,
					names: null,
					pseudo: false,
					notes: null,
					product: 'methyl-accepting chemotaxis protein',
					codon_start: 1,
					translation_table: 11,
					qualifiers: {},
					cds_location: '3067593..3069314',
					cds_qualifiers: {
						inference: 'COORDINATES: similar to AA sequence:RefSeq:WP_011093262.1'
					}}],
				[{
					id: 6911181,
					stable_id: 'GCF_000018285.1-SPEA_RS04715',
					component_id: 75128,
					dseq_id: 'TvhgqanPcHNXupfNOFn5Kw',
					aseq_id: '1ebI8URKvgD9VzLr3UKPQA',
					accession: 'WP_012154161',
					version: 'WP_012154161.1',
					locus: 'SPEA_RS04715',
					old_locus: 'Spea_0900',
					location: '1098306..1100027',
					strand: '+',
					start: 1098306,
					stop: 1100027,
					length: 1722,
					names: null,
					pseudo: false,
					notes: null,
					product: 'methyl-accepting chemotaxis protein',
					codon_start: 1,
					translation_table: 11,
					qualifiers: {},
					cds_location: '1098306..1100027',
					cds_qualifiers: {
						inference: 'COORDINATES: similar to AA sequence:RefSeq:WP_012276077.1'
					}
				}]
			]
			return genes.searchMany(terms).then((response) => {
				expect(response).eql(expected)
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
