'use strict'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const expect = chai.expect
const should = chai.should()
const Genes = require('./Genes')
const Genomes = require('./Genomes')
const MakeFasta = require('./MakeFasta')

describe('MakeFasta', function() {
	this.timeout(100000)
	it('should pass testing individual elements', function() {
		const expectedSequence = 'MITIIDYGSGNLKSIRNGFHHVGAEVLVTRDKEELKKADVMILPGVGAFGTAMENLKKYEDIIHQHIKDDKPFLGVCLGLQVLFSESEESPMIRGLDVFSGKVVRFPDTLLNDGLKIPHMGWNNLNIKQNSPLLEGIGSDYMYFVHSYYVRPDNEEVVMATVDYGVEVPAVVAQDNVYATQFHPEKSGEIGLEILKNFLRNVL'
		const expectedHeader = 'Me_for|GCF_000302455.1-A994_RS01985'
		const genomes = new Genomes()
		const genes = new Genes()
		const genomeVersion = 'GCF_000302455.1'
		const geneVersion = 'GCF_000302455.1-A994_RS01985'
		return genomes.getGenomeInfoByVersion(genomeVersion).then((genomeInfo) => {
			const mkFasta = new MakeFasta(genomeInfo)
			return genes.info(geneVersion)
				.then((geneInfo) => {
					return genes.addAseqInfo([geneInfo])
				})
				.then((geneInfoPlusList) => {
					geneInfoPlusList.forEach((geneInfoPlus) => {
						const header = mkFasta.generateTag_(geneInfoPlus)
						const sequence = geneInfoPlus.ai.sequence
						const fastaEntry = mkFasta.makeFastaEntry_(header, sequence)
						expect(header).eql(expectedHeader)
						expect(sequence).eql(expectedSequence)
					})
				})
		})
	})
	describe('process', function() {
		it('should pass', function() {
			this.timeout(10000)
			const expectedFastaEntry = '>Me_for|GCF_000302455.1-A994_RS01985\nMITIIDYGSGNLKSIRNGFHHVGAEVLVTRDKEELKKADVMILPGVGAFGTAMENLKKYEDIIHQHIKDDKPFLGVCLGLQVLFSESEESPMIRGLDVFSGKVVRFPDTLLNDGLKIPHMGWNNLNIKQNSPLLEGIGSDYMYFVHSYYVRPDNEEVVMATVDYGVEVPAVVAQDNVYATQFHPEKSGEIGLEILKNFLRNVL\n'
			const genomes = new Genomes()
			const genes = new Genes()
			const genomeVersion = 'GCF_000302455.1'
			const geneVersion = 'GCF_000302455.1-A994_RS01985'
			return genomes.getGenomeInfoByVersion(genomeVersion).then((genomeInfo) => {
				const mkFasta = new MakeFasta(genomeInfo)
				return genes.info(geneVersion)
					.then((geneInfo) => {
						return genes.addAseqInfo([geneInfo])
					})
					.then((geneInfoList) => {
						return mkFasta.process(geneInfoList)
					})
					.then((fastaEntries) => {
						expect(fastaEntries[0]).eql(expectedFastaEntry)
					})
			})
		})
		it('should be rejected', function() {
			this.timeout(10000)
			const genomes = new Genomes()
			const genes = new Genes()
			const genomeVersion = 'GCF_000006765.1'
			const geneVersion = 'GCF_000006765.1-PA1112.1'
			return genomes.getGenomeInfoByVersion(genomeVersion).then((genomeInfo) => {
				const mkFasta = new MakeFasta(genomeInfo)
				return genes.info(geneVersion)
					.then((geneInfo) => {
						return genes.addAseqInfo([geneInfo], {keepGoing: true})
					})
					.then((geneInfoList) => {
						return mkFasta.process(geneInfoList)
					}).should.be.rejectedWith('has no protein information or it is in wrong format.')
			})
		})
		it('should pass but skip null sequence', function() {
			this.timeout(10000)
			const genomes = new Genomes()
			const genes = new Genes()
			const genomeVersion = 'GCF_000006765.1'
			const geneVersion = 'GCF_000006765.1-PA1112.1'
			return genomes.getGenomeInfoByVersion(genomeVersion).then((genomeInfo) => {
				const mkFasta = new MakeFasta(genomeInfo)
				return genes.info(geneVersion)
					.then((geneInfo) => {
						return genes.addAseqInfo([geneInfo], {keepGoing: true})
					})
					.then((geneInfoList) => {
						return mkFasta.process(geneInfoList, {skipNull: true})
					})
					.then((fastaEntries) => {
						expect(fastaEntries.length).eql(0)
					})
			})
		})
	})
})
