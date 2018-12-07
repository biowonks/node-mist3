/* eslint-disable no-magic-numbers */
'use strict'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const expect = chai.expect
const should = chai.should()

const Taxonomy = require('./Taxonomy')

describe('Taxonomy', function() {
	describe('getParents', function() {
		it('should work with one', function() {
			const taxid = 562
			const expected = [
				{
					id: 131567,
					parent_taxonomy_id: 1,
					name: 'cellular organisms',
					rank: 'no rank'
				},
				{
					id: 2,
					parent_taxonomy_id: 131567,
					name: 'Bacteria',
					rank: 'superkingdom'
				},
				{
					id: 1224,
					parent_taxonomy_id: 2,
					name: 'Proteobacteria',
					rank: 'phylum'
				},
				{
					id: 1236,
					parent_taxonomy_id: 1224,
					name: 'Gammaproteobacteria',
					rank: 'class'
				},
				{
					id: 91347,
					parent_taxonomy_id: 1236,
					name: 'Enterobacterales',
					rank: 'order'
				},
				{
					id: 543,
					parent_taxonomy_id: 91347,
					name: 'Enterobacteriaceae',
					rank: 'family'
				},
				{
					id: 561,
					parent_taxonomy_id: 543,
					name: 'Escherichia',
					rank: 'genus'
				},
				{
					id: 562,
					parent_taxonomy_id: 561,
					name: 'Escherichia coli',
					rank: 'species'
				}
			]
			const taxonomy = new Taxonomy()
			return taxonomy.getParents(taxid).then((results) => {
				expect(results).eql(expected)
			})
		})
		it('should reject with invalid taxid', function() {
			this.timeout(60000)
			const taxid = 11676
			const taxonomy = new Taxonomy()
			return taxonomy.getParents(taxid).should.be.rejected
		})
		it('should reject with empty taxid', function() {
			this.timeout(60000)
			const taxid = ''
			const taxonomy = new Taxonomy()
			return taxonomy.getParents(taxid).should.be.rejected
		})
	})
	describe('getParentsMany', function() {
		it('should work with valid list of ids', function () {
			const taxids = [
				2285,
				2287,
				2289,
				2293,
				235,
				235279,
				2374,
				24
			]
			const expected = [
				[
					{
						id: 131567,
						name: 'cellular organisms',
						parent_taxonomy_id: 1,
						rank: 'no rank'
					},
					{
						id: 2157,
						name: 'Archaea',
						parent_taxonomy_id: 131567,
						rank: 'superkingdom'
					},
					{
						id: 1783275,
						name: 'TACK group',
						parent_taxonomy_id: 2157,
						rank: 'no rank'
					},
					{
						id: 28889,
						name: 'Crenarchaeota',
						parent_taxonomy_id: 1783275,
						rank: 'phylum'
					},
					{
						id: 183924,
						name: 'Thermoprotei',
						parent_taxonomy_id: 28889,
						rank: 'class'
					},
					{
						id: 2281,
						name: 'Sulfolobales',
						parent_taxonomy_id: 183924,
						rank: 'order'
					},
					{
						id: 118883,
						name: 'Sulfolobaceae',
						parent_taxonomy_id: 2281,
						rank: 'family'
					},
					{
						id: 2284,
						name: 'Sulfolobus',
						parent_taxonomy_id: 118883,
						rank: 'genus'
					},
					{
						id: 2285,
						name: 'Sulfolobus acidocaldarius',
						parent_taxonomy_id: 2284,
						rank: 'species'
					}
				],
				[
					{
						id: 131567,
						name: 'cellular organisms',
						parent_taxonomy_id: 1,
						rank: 'no rank'
					},
					{
						id: 2157,
						name: 'Archaea',
						parent_taxonomy_id: 131567,
						rank: 'superkingdom'
					},
					{
						id: 1783275,
						name: 'TACK group',
						parent_taxonomy_id: 2157,
						rank: 'no rank'
					},
					{
						id: 28889,
						name: 'Crenarchaeota',
						parent_taxonomy_id: 1783275,
						rank: 'phylum'
					},
					{
						id: 183924,
						name: 'Thermoprotei',
						parent_taxonomy_id: 28889,
						rank: 'class'
					},
					{
						id: 2281,
						name: 'Sulfolobales',
						parent_taxonomy_id: 183924,
						rank: 'order'
					},
					{
						id: 118883,
						name: 'Sulfolobaceae',
						parent_taxonomy_id: 2281,
						rank: 'family'
					},
					{
						id: 2284,
						name: 'Sulfolobus',
						parent_taxonomy_id: 118883,
						rank: 'genus'
					},
					{
						id: 2287,
						name: 'Sulfolobus solfataricus',
						parent_taxonomy_id: 2284,
						rank: 'species'
					}
				],
				[
					{
						id: 131567,
						name: 'cellular organisms',
						parent_taxonomy_id: 1,
						rank: 'no rank'
					},
					{
						id: 2,
						name: 'Bacteria',
						parent_taxonomy_id: 131567,
						rank: 'superkingdom'
					},
					{
						id: 1224,
						name: 'Proteobacteria',
						parent_taxonomy_id: 2,
						rank: 'phylum'
					},
					{
						id: 68525,
						name: 'delta/epsilon subdivisions',
						parent_taxonomy_id: 1224,
						rank: 'subphylum'
					},
					{
						id: 28221,
						name: 'Deltaproteobacteria',
						parent_taxonomy_id: 68525,
						rank: 'class'
					},
					{
						id: 213118,
						name: 'Desulfobacterales',
						parent_taxonomy_id: 28221,
						rank: 'order'
					},
					{
						id: 213119,
						name: 'Desulfobacteraceae',
						parent_taxonomy_id: 213118,
						rank: 'family'
					},
					{
						id: 2289,
						name: 'Desulfobacter',
						parent_taxonomy_id: 213119,
						rank: 'genus'
					}
				],
				[
					{
						id: 131567,
						name: 'cellular organisms',
						parent_taxonomy_id: 1,
						rank: 'no rank'
					},
					{
						id: 2,
						name: 'Bacteria',
						parent_taxonomy_id: 131567,
						rank: 'superkingdom'
					},
					{
						id: 1224,
						name: 'Proteobacteria',
						parent_taxonomy_id: 2,
						rank: 'phylum'
					},
					{
						id: 68525,
						name: 'delta/epsilon subdivisions',
						parent_taxonomy_id: 1224,
						rank: 'subphylum'
					},
					{
						id: 28221,
						name: 'Deltaproteobacteria',
						parent_taxonomy_id: 68525,
						rank: 'class'
					},
					{
						id: 213118,
						name: 'Desulfobacterales',
						parent_taxonomy_id: 28221,
						rank: 'order'
					},
					{
						id: 213119,
						name: 'Desulfobacteraceae',
						parent_taxonomy_id: 213118,
						rank: 'family'
					},
					{
						id: 2289,
						name: 'Desulfobacter',
						parent_taxonomy_id: 213119,
						rank: 'genus'
					},
					{
						id: 2293,
						name: 'Desulfobacter postgatei',
						parent_taxonomy_id: 2289,
						rank: 'species'
					}
				],
				[
					{
						id: 131567,
						name: 'cellular organisms',
						parent_taxonomy_id: 1,
						rank: 'no rank'
					},
					{
						id: 2,
						name: 'Bacteria',
						parent_taxonomy_id: 131567,
						rank: 'superkingdom'
					},
					{
						id: 1224,
						name: 'Proteobacteria',
						parent_taxonomy_id: 2,
						rank: 'phylum'
					},
					{
						id: 28211,
						name: 'Alphaproteobacteria',
						parent_taxonomy_id: 1224,
						rank: 'class'
					},
					{
						id: 356,
						name: 'Rhizobiales',
						parent_taxonomy_id: 28211,
						rank: 'order'
					},
					{
						id: 118882,
						name: 'Brucellaceae',
						parent_taxonomy_id: 356,
						rank: 'family'
					},
					{
						id: 234,
						name: 'Brucella',
						parent_taxonomy_id: 118882,
						rank: 'genus'
					},
					{
						id: 235,
						name: 'Brucella abortus',
						parent_taxonomy_id: 234,
						rank: 'species'
					}
				],
				[
					{
						id: 131567,
						name: 'cellular organisms',
						parent_taxonomy_id: 1,
						rank: 'no rank'
					},
					{
						id: 2,
						name: 'Bacteria',
						parent_taxonomy_id: 131567,
						rank: 'superkingdom'
					},
					{
						id: 1224,
						name: 'Proteobacteria',
						parent_taxonomy_id: 2,
						rank: 'phylum'
					},
					{
						id: 68525,
						name: 'delta/epsilon subdivisions',
						parent_taxonomy_id: 1224,
						rank: 'subphylum'
					},
					{
						id: 29547,
						name: 'Epsilonproteobacteria',
						parent_taxonomy_id: 68525,
						rank: 'class'
					},
					{
						id: 213849,
						name: 'Campylobacterales',
						parent_taxonomy_id: 29547,
						rank: 'order'
					},
					{
						id: 72293,
						name: 'Helicobacteraceae',
						parent_taxonomy_id: 213849,
						rank: 'family'
					},
					{
						id: 209,
						name: 'Helicobacter',
						parent_taxonomy_id: 72293,
						rank: 'genus'
					},
					{
						id: 32025,
						name: 'Helicobacter hepaticus',
						parent_taxonomy_id: 209,
						rank: 'species'
					},
					{
						id: 235279,
						name: 'Helicobacter hepaticus ATCC 51449',
						parent_taxonomy_id: 32025,
						rank: 'no rank'
					}
				],
				[
					{
						id: 131567,
						name: 'cellular organisms',
						parent_taxonomy_id: 1,
						rank: 'no rank'
					},
					{
						id: 2,
						name: 'Bacteria',
						parent_taxonomy_id: 131567,
						rank: 'superkingdom'
					},
					{
						id: 1783272,
						name: 'Terrabacteria group',
						parent_taxonomy_id: 2,
						rank: 'no rank'
					},
					{
						id: 1239,
						name: 'Firmicutes',
						parent_taxonomy_id: 1783272,
						rank: 'phylum'
					},
					{
						id: 909932,
						name: 'Negativicutes',
						parent_taxonomy_id: 1239,
						rank: 'class'
					},
					{
						id: 909929,
						name: 'Selenomonadales',
						parent_taxonomy_id: 909932,
						rank: 'order'
					},
					{
						id: 1843490,
						name: 'Sporomusaceae',
						parent_taxonomy_id: 909929,
						rank: 'family'
					},
					{
						id: 2373,
						name: 'Acetonema',
						parent_taxonomy_id: 1843490,
						rank: 'genus'
					},
					{
						id: 2374,
						name: 'Acetonema longum',
						parent_taxonomy_id: 2373,
						rank: 'species'
					}
				],
				[
					{
						id: 131567,
						name: 'cellular organisms',
						parent_taxonomy_id: 1,
						rank: 'no rank'
					},
					{
						id: 2,
						name: 'Bacteria',
						parent_taxonomy_id: 131567,
						rank: 'superkingdom'
					},
					{
						id: 1224,
						name: 'Proteobacteria',
						parent_taxonomy_id: 2,
						rank: 'phylum'
					},
					{
						id: 1236,
						name: 'Gammaproteobacteria',
						parent_taxonomy_id: 1224,
						rank: 'class'
					},
					{
						id: 135622,
						name: 'Alteromonadales',
						parent_taxonomy_id: 1236,
						rank: 'order'
					},
					{
						id: 267890,
						name: 'Shewanellaceae',
						parent_taxonomy_id: 135622,
						rank: 'family'
					},
					{
						id: 22,
						name: 'Shewanella',
						parent_taxonomy_id: 267890,
						rank: 'genus'
					},
					{
						id: 24,
						name: 'Shewanella putrefaciens',
						parent_taxonomy_id: 22,
						rank: 'species'
					}
				]
			]
			const taxonomy = new Taxonomy()
			return taxonomy.getParentsMany(taxids).then((results) => {
				expect(results).eql(expected)
			})
		})
		it('should work with valid list of ids', function () {
			this.timeout(60000)
			const taxids = [
				2285,
				2287,
				2289,
				2293,
				235,
				235279,
				2374,
				24,
				11676
			]
			const expected = [
				[
					{
						id: 131567,
						name: 'cellular organisms',
						parent_taxonomy_id: 1,
						rank: 'no rank'
					},
					{
						id: 2157,
						name: 'Archaea',
						parent_taxonomy_id: 131567,
						rank: 'superkingdom'
					},
					{
						id: 1783275,
						name: 'TACK group',
						parent_taxonomy_id: 2157,
						rank: 'no rank'
					},
					{
						id: 28889,
						name: 'Crenarchaeota',
						parent_taxonomy_id: 1783275,
						rank: 'phylum'
					},
					{
						id: 183924,
						name: 'Thermoprotei',
						parent_taxonomy_id: 28889,
						rank: 'class'
					},
					{
						id: 2281,
						name: 'Sulfolobales',
						parent_taxonomy_id: 183924,
						rank: 'order'
					},
					{
						id: 118883,
						name: 'Sulfolobaceae',
						parent_taxonomy_id: 2281,
						rank: 'family'
					},
					{
						id: 2284,
						name: 'Sulfolobus',
						parent_taxonomy_id: 118883,
						rank: 'genus'
					},
					{
						id: 2285,
						name: 'Sulfolobus acidocaldarius',
						parent_taxonomy_id: 2284,
						rank: 'species'
					}
				],
				[
					{
						id: 131567,
						name: 'cellular organisms',
						parent_taxonomy_id: 1,
						rank: 'no rank'
					},
					{
						id: 2157,
						name: 'Archaea',
						parent_taxonomy_id: 131567,
						rank: 'superkingdom'
					},
					{
						id: 1783275,
						name: 'TACK group',
						parent_taxonomy_id: 2157,
						rank: 'no rank'
					},
					{
						id: 28889,
						name: 'Crenarchaeota',
						parent_taxonomy_id: 1783275,
						rank: 'phylum'
					},
					{
						id: 183924,
						name: 'Thermoprotei',
						parent_taxonomy_id: 28889,
						rank: 'class'
					},
					{
						id: 2281,
						name: 'Sulfolobales',
						parent_taxonomy_id: 183924,
						rank: 'order'
					},
					{
						id: 118883,
						name: 'Sulfolobaceae',
						parent_taxonomy_id: 2281,
						rank: 'family'
					},
					{
						id: 2284,
						name: 'Sulfolobus',
						parent_taxonomy_id: 118883,
						rank: 'genus'
					},
					{
						id: 2287,
						name: 'Sulfolobus solfataricus',
						parent_taxonomy_id: 2284,
						rank: 'species'
					}
				],
				[
					{
						id: 131567,
						name: 'cellular organisms',
						parent_taxonomy_id: 1,
						rank: 'no rank'
					},
					{
						id: 2,
						name: 'Bacteria',
						parent_taxonomy_id: 131567,
						rank: 'superkingdom'
					},
					{
						id: 1224,
						name: 'Proteobacteria',
						parent_taxonomy_id: 2,
						rank: 'phylum'
					},
					{
						id: 68525,
						name: 'delta/epsilon subdivisions',
						parent_taxonomy_id: 1224,
						rank: 'subphylum'
					},
					{
						id: 28221,
						name: 'Deltaproteobacteria',
						parent_taxonomy_id: 68525,
						rank: 'class'
					},
					{
						id: 213118,
						name: 'Desulfobacterales',
						parent_taxonomy_id: 28221,
						rank: 'order'
					},
					{
						id: 213119,
						name: 'Desulfobacteraceae',
						parent_taxonomy_id: 213118,
						rank: 'family'
					},
					{
						id: 2289,
						name: 'Desulfobacter',
						parent_taxonomy_id: 213119,
						rank: 'genus'
					}
				],
				[
					{
						id: 131567,
						name: 'cellular organisms',
						parent_taxonomy_id: 1,
						rank: 'no rank'
					},
					{
						id: 2,
						name: 'Bacteria',
						parent_taxonomy_id: 131567,
						rank: 'superkingdom'
					},
					{
						id: 1224,
						name: 'Proteobacteria',
						parent_taxonomy_id: 2,
						rank: 'phylum'
					},
					{
						id: 68525,
						name: 'delta/epsilon subdivisions',
						parent_taxonomy_id: 1224,
						rank: 'subphylum'
					},
					{
						id: 28221,
						name: 'Deltaproteobacteria',
						parent_taxonomy_id: 68525,
						rank: 'class'
					},
					{
						id: 213118,
						name: 'Desulfobacterales',
						parent_taxonomy_id: 28221,
						rank: 'order'
					},
					{
						id: 213119,
						name: 'Desulfobacteraceae',
						parent_taxonomy_id: 213118,
						rank: 'family'
					},
					{
						id: 2289,
						name: 'Desulfobacter',
						parent_taxonomy_id: 213119,
						rank: 'genus'
					},
					{
						id: 2293,
						name: 'Desulfobacter postgatei',
						parent_taxonomy_id: 2289,
						rank: 'species'
					}
				],
				[
					{
						id: 131567,
						name: 'cellular organisms',
						parent_taxonomy_id: 1,
						rank: 'no rank'
					},
					{
						id: 2,
						name: 'Bacteria',
						parent_taxonomy_id: 131567,
						rank: 'superkingdom'
					},
					{
						id: 1224,
						name: 'Proteobacteria',
						parent_taxonomy_id: 2,
						rank: 'phylum'
					},
					{
						id: 28211,
						name: 'Alphaproteobacteria',
						parent_taxonomy_id: 1224,
						rank: 'class'
					},
					{
						id: 356,
						name: 'Rhizobiales',
						parent_taxonomy_id: 28211,
						rank: 'order'
					},
					{
						id: 118882,
						name: 'Brucellaceae',
						parent_taxonomy_id: 356,
						rank: 'family'
					},
					{
						id: 234,
						name: 'Brucella',
						parent_taxonomy_id: 118882,
						rank: 'genus'
					},
					{
						id: 235,
						name: 'Brucella abortus',
						parent_taxonomy_id: 234,
						rank: 'species'
					}
				],
				[
					{
						id: 131567,
						name: 'cellular organisms',
						parent_taxonomy_id: 1,
						rank: 'no rank'
					},
					{
						id: 2,
						name: 'Bacteria',
						parent_taxonomy_id: 131567,
						rank: 'superkingdom'
					},
					{
						id: 1224,
						name: 'Proteobacteria',
						parent_taxonomy_id: 2,
						rank: 'phylum'
					},
					{
						id: 68525,
						name: 'delta/epsilon subdivisions',
						parent_taxonomy_id: 1224,
						rank: 'subphylum'
					},
					{
						id: 29547,
						name: 'Epsilonproteobacteria',
						parent_taxonomy_id: 68525,
						rank: 'class'
					},
					{
						id: 213849,
						name: 'Campylobacterales',
						parent_taxonomy_id: 29547,
						rank: 'order'
					},
					{
						id: 72293,
						name: 'Helicobacteraceae',
						parent_taxonomy_id: 213849,
						rank: 'family'
					},
					{
						id: 209,
						name: 'Helicobacter',
						parent_taxonomy_id: 72293,
						rank: 'genus'
					},
					{
						id: 32025,
						name: 'Helicobacter hepaticus',
						parent_taxonomy_id: 209,
						rank: 'species'
					},
					{
						id: 235279,
						name: 'Helicobacter hepaticus ATCC 51449',
						parent_taxonomy_id: 32025,
						rank: 'no rank'
					}
				],
				[
					{
						id: 131567,
						name: 'cellular organisms',
						parent_taxonomy_id: 1,
						rank: 'no rank'
					},
					{
						id: 2,
						name: 'Bacteria',
						parent_taxonomy_id: 131567,
						rank: 'superkingdom'
					},
					{
						id: 1783272,
						name: 'Terrabacteria group',
						parent_taxonomy_id: 2,
						rank: 'no rank'
					},
					{
						id: 1239,
						name: 'Firmicutes',
						parent_taxonomy_id: 1783272,
						rank: 'phylum'
					},
					{
						id: 909932,
						name: 'Negativicutes',
						parent_taxonomy_id: 1239,
						rank: 'class'
					},
					{
						id: 909929,
						name: 'Selenomonadales',
						parent_taxonomy_id: 909932,
						rank: 'order'
					},
					{
						id: 1843490,
						name: 'Sporomusaceae',
						parent_taxonomy_id: 909929,
						rank: 'family'
					},
					{
						id: 2373,
						name: 'Acetonema',
						parent_taxonomy_id: 1843490,
						rank: 'genus'
					},
					{
						id: 2374,
						name: 'Acetonema longum',
						parent_taxonomy_id: 2373,
						rank: 'species'
					}
				],
				[
					{
						id: 131567,
						name: 'cellular organisms',
						parent_taxonomy_id: 1,
						rank: 'no rank'
					},
					{
						id: 2,
						name: 'Bacteria',
						parent_taxonomy_id: 131567,
						rank: 'superkingdom'
					},
					{
						id: 1224,
						name: 'Proteobacteria',
						parent_taxonomy_id: 2,
						rank: 'phylum'
					},
					{
						id: 1236,
						name: 'Gammaproteobacteria',
						parent_taxonomy_id: 1224,
						rank: 'class'
					},
					{
						id: 135622,
						name: 'Alteromonadales',
						parent_taxonomy_id: 1236,
						rank: 'order'
					},
					{
						id: 267890,
						name: 'Shewanellaceae',
						parent_taxonomy_id: 135622,
						rank: 'family'
					},
					{
						id: 22,
						name: 'Shewanella',
						parent_taxonomy_id: 267890,
						rank: 'genus'
					},
					{
						id: 24,
						name: 'Shewanella putrefaciens',
						parent_taxonomy_id: 22,
						rank: 'species'
					}
				],
				[]
			]
			const taxonomy = new Taxonomy()
			return taxonomy.getParentsMany(taxids).then((results) => {
				expect(results).eql(expected)
			})
		})
	})
})