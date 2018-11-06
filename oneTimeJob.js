'use strict'

const fs = require('fs')

const Genomes = require('./src/Genomes')
const Genes = require('./src/Genes')
const MakeFasta = require('./src/MakeFasta')
const genomes = new Genomes()
const genes = new Genes()

async function writeSampleFasta(genomeInfoAll) {
	const readUp = fs.readFileSync('./geneSample.fa').toString().split('\n')
	const inFile = []
	readUp.forEach((line) => {
		if (line[0] === '>')
			inFile.push(line.split('|')[1].split('-')[0])
	})
	const selectedGenomes = genomeInfoAll.filter((genomeInfo) => {
		return inFile.indexOf(genomeInfo.version) === -1
	})
	const writeDown = fs.createWriteStream('./geneSample.fa', {flags: 'a'})
	mainLoop:
	for (let i = 0, N = selectedGenomes.length; i < N; i++){
		const genomeInfo = selectedGenomes[i] 
		console.log(`${genomeInfo.version} - ${i}/${N}`)
		try {
			await genes.byGenomeVersionPerPage(genomeInfo.version, 3)
				.catch((err) => {
					throw err
				})
				.then((genesInfo) => {
					// console.log(genesInfo[0])
					const goodGenes = genesInfo.filter(
					(gene) => {
						return gene.aseq_id !== null
					})
					return genes.addAseqInfo(goodGenes)
				})
				.then((genesPlus) => {
					console.log(`Adding: ${genesPlus[0].stable_id}`)
					const sampleGene = genesPlus[0]
					const mkFasta = new MakeFasta(genomeInfo)
					const fasta = mkFasta.processOne(sampleGene)
					writeDown.write(fasta)
				})
		}
		catch (err) {
			continue mainLoop
		}
	}
}


genomes.getInfoAll()
	.then(writeSampleFasta)
	.catch((err) => {
		throw err
	})