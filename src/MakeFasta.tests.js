'use strict'

const expect = require('chai').expect
const Genes = require('./Genes')
const Genomes = require('./Genomes')
const MakeFasta = require('./MakeFasta')

describe('MakeFasta', function() {
	describe('from gene info', function() {
		it('should pass', function(done) {
			this.timeout(10000)
			const expectedSequence = 'MITIIDYGSGNLKSIRNGFHHVGAEVLVTRDKEELKKADVMILPGVGAFGTAMENLKKYEDIIHQHIKDDKPFLGVCLGLQVLFSESEESPMIRGLDVFSGKVVRFPDTLLNDGLKIPHMGWNNLNIKQNSPLLEGIGSDYMYFVHSYYVRPDNEEVVMATVDYGVEVPAVVAQDNVYATQFHPEKSGEIGLEILKNFLRNVL'
			const expectedHeader = 'Me_for|GCF_000302455.1-A994_RS01985'
			const genomes = new Genomes()
			const genes = new Genes()
			const genomeVersion = 'GCF_000302455.1'
			const geneVersion = 'GCF_000302455.1-A994_RS01985'
			genomes.getGenomeInfoByVersion(genomeVersion).then((genomeInfo) => {
				const mk = new MakeFasta(genomeInfo)
				genes.info(geneVersion)
					.then((geneInfo) => {
						return genes.getAseqInfo([geneInfo])
					})
					.then((geneInfoPlusList) => {
						geneInfoPlusList.forEach((geneInfoPlus) => {
							const header = mk.generateTag_(geneInfoPlus)
							const sequence = geneInfoPlus.ai.sequence
							const fastaEntry = mk.makeFastaEntry_(header, sequence)
							expect(header).eql(expectedHeader)
							expect(sequence).eql(expectedSequence)
						})
						done()
					})
					.catch((err) => {
						console.log(err)
					})
			})
		})
	})
})
