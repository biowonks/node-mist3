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
						const sequence = mkFasta.getSequence_(geneInfoPlus)
						const fastaEntry = mkFasta.makeFastaEntry_(geneInfoPlus)
						expect(header).eql(expectedHeader)
						expect(sequence).eql(expectedSequence)
					})
				})
		})
	})
	describe('processOne', function() {
		it('should pass with valid gene info plus from mist3', function() {
			const geneInfoPlus = {"id":1069711,"stable_id":"GCF_000006765.1-PA0685","component_id":9093,"dseq_id":"N_3sBUpuAXgpA0EThG-5Bg","aseq_id":"KRrXKeP00hl5nHqn1jUcfA","accession":"NP_249376","version":"NP_249376.1","locus":"PA0685","old_locus":null,"location":"741925..744336","strand":"+","start":741925,"stop":744336,"length":2412,"names":null,"pseudo":false,"notes":null,"product":"type II secretion system protein","codon_start":1,"translation_table":11,"qualifiers":{},"cds_location":"741925..744336","cds_qualifiers":{},"ai":{"pfam31":[{"name":"Secretin","score":166.1,"bias":0.6,"c_evalue":6e-53,"i_evalue":5e-49,"hmm_from":1,"hmm_to":170,"hmm_cov":"[]","ali_from":566,"ali_to":732,"ali_cov":"..","env_from":566,"env_to":732,"env_cov":"..","acc":0.92},{"name":"Secretin_N","score":46.5,"bias":0.6,"c_evalue":4e-16,"i_evalue":3.3e-12,"hmm_from":2,"hmm_to":80,"hmm_cov":"..","ali_from":263,"ali_to":332,"ali_cov":"..","env_from":262,"env_to":334,"env_cov":"..","acc":0.92},{"name":"Secretin_N","score":43.5,"bias":19,"c_evalue":3.6e-15,"i_evalue":3e-11,"hmm_from":2,"hmm_to":82,"hmm_cov":".]","ali_from":339,"ali_to":482,"ali_cov":"..","env_from":338,"env_to":482,"env_cov":"..","acc":0.94},{"name":"Secretin_N","score":40.9,"bias":0.4,"c_evalue":2.3e-14,"i_evalue":1.9e-10,"hmm_from":1,"hmm_to":81,"hmm_cov":"[.","ali_from":199,"ali_to":259,"ali_cov":"..","env_from":199,"env_to":260,"env_cov":"..","acc":0.97}],"agfam2":[],"ecf1":[],"id":"KRrXKeP00hl5nHqn1jUcfA","length":803,"sequence":"MRQSAFHHARRRWPVLGVALGALLVAACSETPKVPGVPPADEEVGRPLSSVRSGAPLRSADVRERPQAEQARRALSAGRGVARSGGVAPVSATAAELGEQPVSLNFVDTEVEAVVRALSRATGRQFLVDPRVKGKLTLVSEGQVPARTAYRMLTSALRMQGFSVVDVDGVSQVVPEADAKLLGGPVYGADRPAANGMVTRTFRLRYENAVNLIPVLRPIVAQNNPINAYPGNNTVVVTDYAENLDRVAGIIASIDIPSASDTDVVPIQNGIAVDIASTVSELLDSQGSGGAEQGQKTVVLADPRSNSIVIRSPSPERTQLARDLIGKLDSVQSNPGNLHVVYLRNAQATRLAQALRGLITGDSGGEGNEGDQQRARLSGGGMLGGGNSGTGSQGLGSSGNTTGSGSSGLGGSNRSGGAYGAMGSGQGGAGPGAMGEENSAFSAGGVTVQADATTNTLLISAPEPLYRNLREVIDLLDQRRAQVVIESLIVEVSEDDSSEFGIQWQAGNLGGNGVFGGVNFGQSALNTAGKNTIDVLPKGLNIGLVDGTVDIPGIGKILDLKVLARALKSRGGTNVLSTPNLLTLDNESASIMVGQTIPFVSGQYVTDGGGTSNNPFQTIQREDVGLKLNIRPQISEGGTVKLDVYQEVSSVDERASTAAGVVTNKRAIDTSILLDDGQIMVLGGLLQDNVQDNTDGVPGLSSLPGVGSLFRYQKRSRTKTNLMVFLRPYIVRDAAAGRSITLNRYDFIRRAQQRVQPRHDWSVGDMQAPVLPPAQQGIPQAAYDLRPSPRPLRAVPLGEAAPL","segs":[[15,27],[63,92],[160,174],[248,263],[378,435],[483,494],[507,521]],"coils":[],"tmhmm2":null,"t":{"pfam31":[["Secretin",566,732],["Secretin_N",262,334],["Secretin_N",338,482],["Secretin_N",199,260]]},"PFQLMatches":[0]}}
			const expected = '>Ps_aer|GCF_000006765.1-PA0685\nMRQSAFHHARRRWPVLGVALGALLVAACSETPKVPGVPPADEEVGRPLSSVRSGAPLRSADVRERPQAEQARRALSAGRGVARSGGVAPVSATAAELGEQPVSLNFVDTEVEAVVRALSRATGRQFLVDPRVKGKLTLVSEGQVPARTAYRMLTSALRMQGFSVVDVDGVSQVVPEADAKLLGGPVYGADRPAANGMVTRTFRLRYENAVNLIPVLRPIVAQNNPINAYPGNNTVVVTDYAENLDRVAGIIASIDIPSASDTDVVPIQNGIAVDIASTVSELLDSQGSGGAEQGQKTVVLADPRSNSIVIRSPSPERTQLARDLIGKLDSVQSNPGNLHVVYLRNAQATRLAQALRGLITGDSGGEGNEGDQQRARLSGGGMLGGGNSGTGSQGLGSSGNTTGSGSSGLGGSNRSGGAYGAMGSGQGGAGPGAMGEENSAFSAGGVTVQADATTNTLLISAPEPLYRNLREVIDLLDQRRAQVVIESLIVEVSEDDSSEFGIQWQAGNLGGNGVFGGVNFGQSALNTAGKNTIDVLPKGLNIGLVDGTVDIPGIGKILDLKVLARALKSRGGTNVLSTPNLLTLDNESASIMVGQTIPFVSGQYVTDGGGTSNNPFQTIQREDVGLKLNIRPQISEGGTVKLDVYQEVSSVDERASTAAGVVTNKRAIDTSILLDDGQIMVLGGLLQDNVQDNTDGVPGLSSLPGVGSLFRYQKRSRTKTNLMVFLRPYIVRDAAAGRSITLNRYDFIRRAQQRVQPRHDWSVGDMQAPVLPPAQQGIPQAAYDLRPSPRPLRAVPLGEAAPL\n'
			const genomeVersion = 'GCF_000006765.1'
			const genomes = new Genomes()
			return genomes.getGenomeInfoByVersion(genomeVersion).then((genomeInfo) => {
				const mkFasta = new MakeFasta(genomeInfo)
				const fastaEntry = mkFasta.processOne(geneInfoPlus)
				expect(fastaEntry).eql(expected)
			})
		})
		it('should pass with this gene too', function() {
			const geneStableId = 'GCF_000224475.1-HALAR_RS01010'
			const genomeVersion = 'GCF_000224475.1'
			const expectedFastaEntry = '>ha_arc|GCF_000224475.1-HALAR_RS01010\nMTDQEVQQTNTLRQVDVMVRPTTRFPVPLSDGYSVYSALLGVLEDVDADVSAHIHDSPLGSLHSSGLQGVFGDSDRDYHKTLRPNESYQLRLGVVDPADLDIFQALVNALVLDGDTIELSHGTLQVDRFESVNTTHEDIVTEAGSMDNPTIELSFETATCIEEAGEITTMFPHRGAVFSSLLGKWNRSVSDDLELELDRETIERNVIEKPIARTYNTHSVLVNRVKNKDGETRNLFRQGFTGECSYDFKNASDSVQNAVTALGLFAEYSGVGSAVARGCGCVSAEVAGQ\n'
			const genomes = new Genomes()
			const genes = new Genes()
			return genomes.getGenomeInfoByVersion(genomeVersion).then((genomeInfo) => {
				const mkFasta = new MakeFasta(genomeInfo)
				return genes.info(geneStableId)
					.then((geneInfo) => {
						return genes.addAseqInfo([geneInfo])
					})
					.then((geneInfoPlus) => {
						return mkFasta.processOne(geneInfoPlus[0])
					})
					.then((fastaEntry) => {
						expect(fastaEntry).eql(expectedFastaEntry)
					})
			})
		})
	})
	describe('processMany', function() {
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
						return mkFasta.processMany(geneInfoList)
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
						return mkFasta.processMany(geneInfoList)
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
						return mkFasta.processMany(geneInfoList, {skipNull: true})
					})
					.then((fastaEntries) => {
						expect(fastaEntries.length).eql(0)
					})
			})
		})
	})
})
