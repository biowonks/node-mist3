'use strict'

const bunyan = require('bunyan')

const fastaTagDefaults = {
	numOfLettersForGenus: 2,
	numOfLettersForSpecies: 3,
	orgIdSeparator: '_',
	featureSeparator: '|'
}

module.exports =
class MakeFasta {
	constructor(genomeInfo, logLevel = 'info') {
		this.genomeInfo_ = genomeInfo
		this.log = bunyan.createLogger({
			name: 'MakeFasta',
			level: logLevel
		})
	}

	processOne(geneInfo) {
		if (!geneInfo.ai) {
			this.log.error(`Gene ${geneInfo.stable_id} has no protein information or it is in wrong format.`)
			throw Error(`Gene ${geneInfo.stable_id} has no protein information or it is in wrong format.`)
		}
		return this.makeFastaEntry_(geneInfo)
	}

	processMany(geneInfoList, options = {skipNull: false}) {
		let numEntries = 0
		const fasta = []
		geneInfoList.forEach((geneInfo) => {
			if (geneInfo.ai) {
				const entry = this.makeFastaEntry_(geneInfo)
				fasta.push(entry)
				numEntries++
			}
			else if (options.skipNull) {
				this.log.warn(`Gene ${geneInfo.stable_id} has no protein information or it is in wrong format. Skipping`)
			}
			else {
				this.log.error(`Gene ${geneInfo.stable_id} has no protein information or it is in wrong format.`)
				throw Error(`Gene ${geneInfo.stable_id} has no protein information or it is in wrong format.`)
			}
		})
		this.log.info('Pushing ' + numEntries + ' fasta entries')
		return fasta
	}

	makeFastaEntry_(gene) {
		const header = this.generateTag_(gene)
		const sequence = this.getSequence_(gene)
		return '>' + header + '\n' + sequence + '\n'
	}

	generateTag_(geneInfo) {
		const genus = this.genomeInfo_.genus
		const species = this.genomeInfo_.species.split(' ')[1]

		let orgID = genus.substring(0, fastaTagDefaults.numOfLettersForGenus)
		orgID += fastaTagDefaults.orgIdSeparator
		orgID += species.substring(0, fastaTagDefaults.numOfLettersForSpecies)

		return orgID + fastaTagDefaults.featureSeparator + geneInfo.stable_id
	}

	getSequence_(gene) {
		return gene.ai.sequence
	}
}
