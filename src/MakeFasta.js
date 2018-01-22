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
	constructor(genomeInfo) {
		this.genomeInfo_ = genomeInfo
		this.log = bunyan.createLogger({
			name: 'MakeFasta'
		})
	}

	fasta(geneInfoList) {
		let numEntries = 0
		const fasta = []
		geneInfoList.forEach((geneInfo) => {
			if (geneInfo.ai.sequence) {
				const tag = this.generateTag_(geneInfo)
				const sequence = geneInfo.ai.sequence
				const entry = this.makeFastaEntry_(tag, sequence)
				fasta.push(entry)
				numEntries++
			}
			else {
				this.log.warn('No information on MiST3 for: ' + geneInfo.ai.id)
			}
		})
		this.log.info('Pushing ' + numEntries + ' fasta entries')
		return fasta
	}

	makeFastaEntry_(header, sequence) {
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
}
