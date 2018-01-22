'use strict'

const bunyan = require('bunyan')
const Transform = require('stream').Transform

const fastaTagDefaults = {
	numOfLettersForGenus: 2,
	numOfLettersForSpecies: 3,
	orgIdSeparator: '_',
	featureSeparator: '|'
}


module.exports =
class MakeFasta extends Transform {
	constructor(genomeInfo) {
		super({objectMode: true})
		this.genomeInfo_ = genomeInfo
		this.log = bunyan.createLogger({
			name: 'MakeFasta'
		})
	}

	_transform(chunk, enc, next) {
		let numEntries = 0
		chunk.forEach((item) => {
			if (item.ai.sequence) {
				const tag = this.generateTag_(item)
				const sequence = item.ai.sequence
				const entry = this.makeFastaEntry_(tag, sequence)
				this.push(entry)
				numEntries++
			}
			else {
				this.log.warn('No information on MiST3 for: ' + item.ai.id)
			}
		})
		this.log.info('Pushing ' + numEntries + ' fasta entries')
		next()
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
