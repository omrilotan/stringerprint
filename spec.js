const { assert, expect } = require('chai');
const stringerprint = require('.');

const sources = ['a', 'A', '1', 'wij', 'wiJ', 'WIJ', '*', '^', '😀', '😃'];

describe('stringerprint', () => {
	it('should create consistent hashes for same string', () => {
		['a', 'r4g', 'hello'].forEach(
			string => expect(stringerprint(string)).to.equal(stringerprint(string)),
		);
	});
	it('should create unique hashes for different strings', () => {
		const keys = new Set(sources.map(stringerprint));
		expect(sources.length).to.equal(keys.size);
	});
	it('should always produce a 32 char string', () => {
		assert(
			sources.map(
				stringerprint
			).map(
				value => value.length,
			).every(
				number => number === 32,
			),
		);
	});
	it('should parse buffers as strings', () => {
		const source = 'string';
		const buffer = Buffer.from(source);
		expect(stringerprint(source)).to.equal(stringerprint(buffer));
	})
});
