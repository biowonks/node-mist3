/* eslint-disable comma-spacing */
/* eslint-disable quote-props */
/* eslint-disable key-spacing */
/* eslint-disable quotes */
/* eslint-disable comma-spacing */
/* eslint-disable no-magic-numbers */
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
		describe('searchMany and addAseqInfo', function() {
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
					{"id":13282865,"stable_id":"GCF_000145255.1-GALF_RS05040","component_id":164319,"dseq_id":"zQfabUSF3UO3sUrJH83KRw","aseq_id":"R0eYWHRrArOEBq6-QrE7uA","accession":"WP_013292982","version":"WP_013292982.1","locus":"GALF_RS05040","old_locus":"Galf_1012","location":"1067262..1068884","strand":"+","start":1067262,"stop":1068884,"length":1623,"names":null,"pseudo":false,"notes":null,"product":"methyl-accepting chemotaxis protein","codon_start":1,"translation_table":11,"qualifiers":{},"cds_location":"1067262..1068884","cds_qualifiers":{"inference":"COORDINATES: similar to AA sequence:RefSeq:WP_013292983.1"},"ai":{"pfam31":[{"name":"MCPsignal","score":131.6,"bias":18.1,"c_evalue":5.5e-42,"i_evalue":2.3e-38,"hmm_from":31,"hmm_to":171,"hmm_cov":"..","ali_from":366,"ali_to":506,"ali_cov":"..","env_from":365,"env_to":507,"env_cov":"..","acc":0.97},{"name":"4HB_MCP_1","score":124,"bias":3.1,"c_evalue":1e-39,"i_evalue":4.3e-36,"hmm_from":2,"hmm_to":181,"hmm_cov":".]","ali_from":5,"ali_to":183,"ali_cov":"..","env_from":4,"env_to":183,"env_cov":"..","acc":0.99},{"name":"TarH","score":114.6,"bias":2.1,"c_evalue":1.1e-36,"i_evalue":4.5e-33,"hmm_from":1,"hmm_to":174,"hmm_cov":"[.","ali_from":1,"ali_to":169,"ali_cov":"[.","env_from":1,"env_to":172,"env_cov":"[.","acc":0.96}],"agfam2":[{"name":"4HB_MCP","score":96.7,"bias":7.4,"c_evalue":7.5e-32,"i_evalue":4.3e-30,"hmm_from":2,"hmm_to":168,"hmm_cov":".]","ali_from":34,"ali_to":187,"ali_cov":"..","env_from":33,"env_to":187,"env_cov":"..","acc":0.98}],"ecf1":[],"id":"R0eYWHRrArOEBq6-QrE7uA","length":540,"sequence":"MLNDIKISSRLVFLLACLLMLSVVIGGVGLYASSHANNALKSVYDDRLLPIAQINDIARKNLRNRIAVANGVIQPEHMAEYIKEIEENRIAIAKQWSAYSATSMTDEEKLLASKFNEAREAFVNEGLKPAVAAMQANNVELIKQIQVQHIRTLYVPMKDALDALILLQEHEAEKLYKETDSTYKTVRMLSIFLIVLGALSGGILGSSIIRGVNRSVGELQGVMVKMSQNGDLTTRARVYGRDEVGVAAVAFNTLIDGFASIISQVNASARTVSGSVENLSASSVRISQSSRSQTESATTTAAAVEEITASISSVAANTDDVRRLAEISLTQTRQGNQSVTELIGEIERIQDAVKLIADSVKEFVESTRSIAGMTQQVKDIADQTNLLALNAAIEAARAGEQGRGFAVVADEVRKLAEKSAQSANEIDRVTNSLNQKSCDVESTVQTGLRSLQVTQEHVEHVSVVLTEARESVEQSSQGVSDIASSVNEQSQASSEIARNVEKIAQMSEENHTAVELNTQEILRLAQLAKTLQEAVSRFRV","segs":[[193,209],[280,313],[385,406]],"coils":[],"tmhmm2":null,"stp":{"ranks":["chemotaxis","mcp"],"counts":{"4HB_MCP":1,"MCPsignal":1},"inputs":["4HB_MCP"],"outputs":[],"version":1}}},
					{"id":13282866,"stable_id":"GCF_000145255.1-GALF_RS05045","component_id":164319,"dseq_id":"qwhR8bGlSFpuWWugqj0uXA","aseq_id":"2aa9s6Sz2LXYGggmkq_vAw","accession":"WP_013292983","version":"WP_013292983.1","locus":"GALF_RS05045","old_locus":"Galf_1013","location":"1068967..1070619","strand":"+","start":1068967,"stop":1070619,"length":1653,"names":null,"pseudo":false,"notes":null,"product":"methyl-accepting chemotaxis protein","codon_start":1,"translation_table":11,"qualifiers":{},"cds_location":"1068967..1070619","cds_qualifiers":{"inference":"COORDINATES: similar to AA sequence:RefSeq:WP_013292983.1"},"ai":{"pfam31":[{"name":"MCPsignal","score":127.6,"bias":18,"c_evalue":7.2e-41,"i_evalue":4e-37,"hmm_from":31,"hmm_to":171,"hmm_cov":"..","ali_from":376,"ali_to":516,"ali_cov":"..","env_from":373,"env_to":517,"env_cov":"..","acc":0.97},{"name":"TarH","score":76.4,"bias":1.4,"c_evalue":4.3e-25,"i_evalue":2.4e-21,"hmm_from":1,"hmm_to":165,"hmm_cov":"[.","ali_from":1,"ali_to":170,"ali_cov":"[.","env_from":1,"env_to":182,"env_cov":"[.","acc":0.96},{"name":"4HB_MCP_1","score":54.9,"bias":0.1,"c_evalue":1.2e-18,"i_evalue":7e-15,"hmm_from":1,"hmm_to":164,"hmm_cov":"[.","ali_from":4,"ali_to":176,"ali_cov":"..","env_from":4,"env_to":191,"env_cov":"..","acc":0.92}],"agfam2":[{"name":"4HB_MCP","score":47.8,"bias":3.1,"c_evalue":6.7e-17,"i_evalue":3.9e-15,"hmm_from":1,"hmm_to":166,"hmm_cov":"[.","ali_from":33,"ali_to":195,"ali_cov":"..","env_from":33,"env_to":196,"env_cov":"..","acc":0.96}],"ecf1":[],"id":"2aa9s6Sz2LXYGggmkq_vAw","length":550,"sequence":"MLNNMTIKARLTMLVSVIMVISVVVAAFAYIGMSNLQTATEDIAVRRIHLIRSVNKLMYAMADNRAHLMRAMQHDPANPASKLHDHPVSRHLDAITENNTKIEEYFSDMERNTHSEEGKRALEELKAARAGVANEGLQPGVQAVKDGQYNEAGVILSKKVHPLLDAALVKGHAIADRENHAANADFQAAMSAAHTYEMLLIGGVLFMLLTAGGLGYSIISGVSRSTGNMRDQMSRTASDGDLSRRVTVYGTDEVAQAALAYNGLIDGFSMIIRQVGSSAGTVSSTAANLSAASLQISQGSQAQTEAAASTAAAVEQITVSISSVASNTDDVRKLSEKSLQQTQLGNQNITGMISEIERVQNAVKLIAGSVSEFVDSTRAIAGMTQQVKDIADQTNLLALNAAIEAARAGEQGRGFAVVADEVRKLAEKSAQSANEIDRVTNSLNQKSTQVEATVQSGLRSLLATQEQVERVSSVLTEAGVLVEQSSHGVSDIAASVNEQSIASSEIARNVERIAQMSEENYAAVESNTHEIVRLEQLARELQSAVNRFKV","segs":[[15,25],[275,294],[300,313],[395,416]],"coils":[[524,544]],"tmhmm2":null,"stp":{"ranks":["chemotaxis","mcp"],"counts":{"4HB_MCP":1,"MCPsignal":1},"inputs":["4HB_MCP"],"outputs":[],"version":1}}},
					{"id":419052180,"stable_id":"GCF_000510325.1-X970_RS26830","component_id":11574308,"dseq_id":"minQhT-4bVsGyjpQw0yF6A","aseq_id":"TSEy2ycJLt33L6n9j5mEQg","accession":"WP_013970514","version":"WP_013970514.1","locus":"X970_RS26830","old_locus":"X970_27400","location":"complement(5907483..5909108)","strand":"-","start":5907483,"stop":5909108,"length":1626,"names":null,"pseudo":false,"notes":null,"product":"methyl-accepting chemotaxis protein","codon_start":1,"translation_table":11,"qualifiers":{},"cds_location":"complement(5907483..5909108)","cds_qualifiers":{"inference":"COORDINATES: similar to AA sequence:RefSeq:WP_003255688.1"},"ai":{"pfam31":[{"name":"MCPsignal","score":151.2,"bias":18.3,"c_evalue":5.2e-48,"i_evalue":2.2e-44,"hmm_from":1,"hmm_to":171,"hmm_cov":"[.","ali_from":323,"ali_to":507,"ali_cov":"..","env_from":323,"env_to":508,"env_cov":"..","acc":0.96},{"name":"4HB_MCP_1","score":89,"bias":5.1,"c_evalue":5.9e-29,"i_evalue":2.5e-25,"hmm_from":1,"hmm_to":181,"hmm_cov":"[]","ali_from":5,"ali_to":185,"ali_cov":"..","env_from":5,"env_to":185,"env_cov":"..","acc":0.98},{"name":"TarH","score":31.4,"bias":8.5,"c_evalue":3.5e-11,"i_evalue":1.5e-7,"hmm_from":2,"hmm_to":174,"hmm_cov":"..","ali_from":3,"ali_to":171,"ali_cov":"..","env_from":2,"env_to":174,"env_cov":"..","acc":0.94},{"name":"HAMP","score":29.4,"bias":0.4,"c_evalue":1.7e-10,"i_evalue":7.3e-7,"hmm_from":1,"hmm_to":49,"hmm_cov":"[]","ali_from":212,"ali_to":261,"ali_cov":"..","env_from":212,"env_to":261,"env_cov":"..","acc":0.97}],"agfam2":[{"name":"4HB_MCP","score":91.6,"bias":19.3,"c_evalue":2.6e-30,"i_evalue":1.5e-28,"hmm_from":1,"hmm_to":167,"hmm_cov":"[.","ali_from":34,"ali_to":188,"ali_cov":"..","env_from":34,"env_to":188,"env_cov":"..","acc":0.99}],"ecf1":[],"id":"TSEy2ycJLt33L6n9j5mEQg","length":541,"sequence":"MSLRNINIAPRALLGFALIGLLMLGLGIFSLMQMGNIRQAGLVIEQISVPAIKTLDEISALNLRLRSLSYRLLVNRDPQNQQEILNLMDQRNQQIDRAREAYVPLITAADEQAAYDQYVQLLNQYRQLEAQMRSLNQAGRLDELRDVLNRDLQANSEQINKIMETLVGINTEQTRDTNAKAASQYDAAFSLVIGLLVAATVLTFVCALLLTRSIVKPIDEALRCAEQIADGDLTHVIHAEGTDEAARLLRAMARMQDKLRDTLQLIAGSATQLASAAEELNAVTDESARGLQQQNNEIEQAATAVTEMTSAVEEVARNAVSTSEASSEASRSAGDGRDLVMETVGAIERMSGDVQATAKLVTHLAEQSRDIGKVLDVIRGLADQTNLLALNAAIEAARAGEAGRGFAVVADEVRALAHRTQQSTSEIERMIGSIQGGTEEAVESMRTSTERAESTLNIARGAGMALDTIAGAVAQINERNLVIASAAEEQAQVAREVDRNLVNINDLSVQSATGAHQTSAASAELSRLAVDLNGLVARFRT","segs":[[12,32],[61,76],[245,255],[319,333],[386,410],[482,497]],"coils":[[111,138],[291,311]],"tmhmm2":null,"stp":{"ranks":["chemotaxis","mcp"],"counts":{"HAMP":1,"4HB_MCP":1,"MCPsignal":1},"inputs":["4HB_MCP"],"outputs":[],"version":1}}},
					{"id":2027294,"stable_id":"GCF_000013745.1-RPC_RS13740","component_id":14325,"dseq_id":"pitI5FewGwc5aKfJ-NGIgQ","aseq_id":"Fp3W_3cMK8aO_BnRDjlQ_Q","accession":"WP_011473186","version":"WP_011473186.1","locus":"RPC_RS13740","old_locus":"RPC_2742","location":"complement(2978047..2979729)","strand":"-","start":2978047,"stop":2979729,"length":1683,"names":null,"pseudo":false,"notes":null,"product":"methyl-accepting chemotaxis protein","codon_start":1,"translation_table":11,"qualifiers":{},"cds_location":"complement(2978047..2979729)","cds_qualifiers":{"inference":"COORDINATES: similar to AA sequence:RefSeq:WP_011473186.1"},"ai":{"pfam31":[{"name":"MCPsignal","score":112,"bias":26.3,"c_evalue":4.2e-36,"i_evalue":2.4e-32,"hmm_from":2,"hmm_to":167,"hmm_cov":"..","ali_from":356,"ali_to":524,"ali_cov":"..","env_from":355,"env_to":529,"env_cov":"..","acc":0.89},{"name":"4HB_MCP_1","score":88.8,"bias":0.2,"c_evalue":5.1e-29,"i_evalue":2.9e-25,"hmm_from":4,"hmm_to":181,"hmm_cov":".]","ali_from":5,"ali_to":182,"ali_cov":"..","env_from":1,"env_to":182,"env_cov":"[.","acc":0.93},{"name":"TarH","score":33,"bias":2.7,"c_evalue":8.9e-12,"i_evalue":4.9e-8,"hmm_from":4,"hmm_to":164,"hmm_cov":"..","ali_from":2,"ali_to":158,"ali_cov":"..","env_from":1,"env_to":169,"env_cov":"[.","acc":0.89}],"agfam2":[{"name":"4HB_MCP","score":98.9,"bias":9.5,"c_evalue":1.5e-32,"i_evalue":8.7e-31,"hmm_from":7,"hmm_to":167,"hmm_cov":"..","ali_from":37,"ali_to":185,"ali_cov":"..","env_from":31,"env_to":185,"env_cov":"..","acc":0.98}],"ecf1":[],"id":"Fp3W_3cMK8aO_BnRDjlQ_Q","length":560,"sequence":"MRISLKTSLIAIVSLLLLVLVGQAWTSLSKIQAVNLKTEDIASNWLPSVKQLGELKYATVRYRVASLRVLLASDADYRRELVANQAMRAGSVAELAKRYEQLISSPDELKVWNHVKEKWAAYLKLQLQMSELALSGKGGDLLKADDAAARPMFDEVLKLLDADVELNDKGAADATADARNSYNSAWLTTIVVGALAVVIGIAAVLFVIFRVAAGLTGLNGALAKMAGGQLDIDIPGAGRADEIGDMAKNVVTIRQNSENAARADAEAKAERDRQAAEQRKQEMYRMADDFEGAVGEIIETVSSASTELEASATTLAATAERAQSLATVVAAASEEASTNVQSVASATEEMSSSITEISRQVQDSARIAGEAVDQARHTNDRVSELAMAASRIGDVVELINNIAGQTNLLALNATIEAARAGEAGRGFAVVASEVKALAEQTAKATGEIGQQITGIQSATQQSVGAIREIGAIIGKMSEISSTIASAVEEQGAATQEISRNVQQAAMGTHEVSANITNVQHGAAETGSASSQVLSAAKSLSRDSNRLKTEVGKFLSTVRAA","segs":[[8,21],[132,149],[190,209],[212,223],[260,282],[299,320],[326,338],[344,358],[416,431]],"coils":[[262,286]],"tmhmm2":null,"stp":{"ranks":["chemotaxis","mcp"],"counts":{"4HB_MCP":1,"MCPsignal":1},"inputs":["4HB_MCP"],"outputs":[],"version":1}}},
					{"id":87911390,"stable_id":"GCF_000294535.1-PCC21_RS13425","component_id":2452254,"dseq_id":"RQNAuP3belz2Xu08I7OWAQ","aseq_id":"FcM1mJdagdvHt-lV1gZODg","accession":"WP_014915926","version":"WP_014915926.1","locus":"PCC21_RS13425","old_locus":"PCC21_027230","location":"3067593..3069314","strand":"+","start":3067593,"stop":3069314,"length":1722,"names":null,"pseudo":false,"notes":null,"product":"methyl-accepting chemotaxis protein","codon_start":1,"translation_table":11,"qualifiers":{},"cds_location":"3067593..3069314","cds_qualifiers":{"inference":"COORDINATES: similar to AA sequence:RefSeq:WP_011093262.1"},"ai":{"pfam31":[{"name":"MCPsignal","score":190.9,"bias":21.9,"c_evalue":2.6e-60,"i_evalue":1.4e-56,"hmm_from":1,"hmm_to":172,"hmm_cov":"[]","ali_from":342,"ali_to":499,"ali_cov":"..","env_from":342,"env_to":499,"env_cov":"..","acc":0.99},{"name":"TarH","score":115.8,"bias":4.2,"c_evalue":3.3e-37,"i_evalue":1.9e-33,"hmm_from":1,"hmm_to":168,"hmm_cov":"[.","ali_from":17,"ali_to":184,"ali_cov":"..","env_from":17,"env_to":193,"env_cov":"..","acc":0.97},{"name":"HAMP","score":48.3,"bias":0.1,"c_evalue":1.7e-16,"i_evalue":9.6e-13,"hmm_from":3,"hmm_to":48,"hmm_cov":"..","ali_from":233,"ali_to":279,"ali_cov":"..","env_from":230,"env_to":280,"env_cov":"..","acc":0.94}],"agfam2":[],"ecf1":[],"id":"FcM1mJdagdvHt-lV1gZODg","length":573,"sequence":"MDMKITSRSEQHAEAGMLSNLRLVPLFIIILGGIMLLFAASIGTSSYFLQSSNQSLDDVTQEIDTRMGISNSSNHLRTARLLLIQAAAAARIGDSQVFNDNLKQAEQRLEQSKKAFLVYEQRPVKTPQDMALDGDLRKSYDAYVNQGLMLMLTAAKEGLFEEVITLESEETRVLDLAYNKFLLEAVAYRTQRAKELNETAHKNALLGYSLMGGSFALATILTLLTFFLLRSILIKPINQLVLRIQRIAQGDLTQISDRYGRNEIGTLASNVQQMQSSLVTTVTTVRESADSIYQGSTEISSGNTDLSSRTEQQAAALEQTAASMEQLTATVKQNSENAHHASQLAANASGKAKQGGEIVANVVNTMNSISGSSKKISEITSVINSIAFQTNILALNAAVEAARAGEQGRGFAVVASEVRSLAQRSAQAAKEIETLISESVNLVNSGSVLVDNAGQTMKEIVDAVTNVTDIMGEIASASDEQSRGITQVGQAISEMDSVTQQNASLVQEASAAAASLEEQAALLTRAVATFKLSSHLSNSHSAPVRPNALAAKDRSSLALPRQANTENGNWETF","segs":[[26,38],[76,91],[214,234],[310,322],[368,381],[393,412],[437,450],[503,523]],"coils":[[95,122],[307,327],[418,438],[506,526]],"tmhmm2":null,"stp":{"ranks":["chemotaxis","mcp"],"counts":{"HAMP":1,"MCPsignal":1},"inputs":[],"outputs":[],"version":1}}},
					{"id":6911181,"stable_id":"GCF_000018285.1-SPEA_RS04715","component_id":75128,"dseq_id":"TvhgqanPcHNXupfNOFn5Kw","aseq_id":"1ebI8URKvgD9VzLr3UKPQA","accession":"WP_012154161","version":"WP_012154161.1","locus":"SPEA_RS04715","old_locus":"Spea_0900","location":"1098306..1100027","strand":"+","start":1098306,"stop":1100027,"length":1722,"names":null,"pseudo":false,"notes":null,"product":"methyl-accepting chemotaxis protein","codon_start":1,"translation_table":11,"qualifiers":{},"cds_location":"1098306..1100027","cds_qualifiers":{"inference":"COORDINATES: similar to AA sequence:RefSeq:WP_012276077.1"},"ai":{"pfam31":[{"name":"MCPsignal","score":156.5,"bias":17.7,"c_evalue":9.5e-50,"i_evalue":5.3e-46,"hmm_from":15,"hmm_to":171,"hmm_cov":"..","ali_from":383,"ali_to":539,"ali_cov":"..","env_from":372,"env_to":540,"env_cov":"..","acc":0.97},{"name":"TarH","score":41.9,"bias":1.8,"c_evalue":1.6e-14,"i_evalue":8.8e-11,"hmm_from":6,"hmm_to":173,"hmm_cov":"..","ali_from":29,"ali_to":202,"ali_cov":"..","env_from":27,"env_to":206,"env_cov":"..","acc":0.93},{"name":"4HB_MCP_1","score":35.4,"bias":0.1,"c_evalue":1.3e-12,"i_evalue":7e-9,"hmm_from":15,"hmm_to":176,"hmm_cov":"..","ali_from":36,"ali_to":212,"ali_cov":"..","env_from":32,"env_to":217,"env_cov":"..","acc":0.89}],"agfam2":[],"ecf1":[],"id":"1ebI8URKvgD9VzLr3UKPQA","length":573,"sequence":"MSVLTEQLGRDEVRQPHQSQSGFTSLFKSVRFQLKLIVFLTVISFLFLGYKGISGMQDAGESIGKLHAQGMQHSIRAGKVLNELASARSELLLAFQHDPSSQFAEMHNHPLTQHITQAQAAIAQLHNIIDNQILGAKLDNEERLQVNRLKAQLDNVVAQGFNPTIDALQRGEYEAANRVLLTQINPLFKNISAEAQSFLEMQVVEGEQSFSQFNQDMQVYIGLVAVFSIVSMLVITVSSTLIVRRMGKAMTELEETANDIANGDLTKRIVIGGDDEFTHIADYVNRIAARFQHAVQNTHESTSRLASAAEENSVVSTQTQRNVVEQQQQTQQIAAAIHQFTATVREVAQSAEAAASSSLEANSAAHHGQAVVDESIAVIETLSSEMDGATEAMKLLSKSSDEIGSVVDVIQGISEQTNLLALNAAIEAARAGEQGRGFAVVADEVRSLAKRTQDSTEEIQQMIQRLQQGARDSMLMMDRGTEQAKLSVDKSQQAGAALLQIMASIEQINALNTQIATASEEQSLVTEEINRNIINISDISDQTAAGAEQTQAATHELAQLAESMQQEIAYYRV","segs":[[81,94],[111,126],[317,343],[348,365],[418,439],[529,554]],"coils":[[501,521]],"tmhmm2":null,"stp":{"ranks":["chemotaxis","mcp"],"counts":{"4HB_MCP":1,"MCPsignal":1},"inputs":["4HB_MCP"],"outputs":[],"version":1}}}
				]
				return genes.searchMany(terms)
					.then((geneInfo) => {
						const geneList = []
						geneInfo.forEach((gene) => {
							if (gene.length === 1)
								geneList.push(gene[0])
							else
								geneList.push({})
						})
						return genes.addAseqInfo(geneList)
					})
					.then((response) => {
						expect(response).eql(expected)
					})
			})
		})
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
