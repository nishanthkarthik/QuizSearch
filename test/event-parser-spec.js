'use strict';

var parser = require('../lib/event-parser');

// describe('#getArticles()', function(){
// 	it('should return 0 before any articles are read', function(){
// 		expect(parser.getArticles()).toBe(0);
// 	});

// 	it('should not allow calling it to increment the count of articles', function(){
// 		expect(parser.getArticles()).toBe(0);
// 		expect(parser.getArticles()).toBe(0);
// 		expect(parser.getArticles()).toBe(0);
// 	});
// });


describe('read parts', function(){
	it('should return 12 matches', function(){
		var parts = parser.readBlocks(parser._data, /^[0-9]{1,2}\s{1,4}([^\s]+\s){1,5}\s*$/m, '');
		expect(parts).not.toBeNull();
		expect(parts.length).toBe(7);
	});

	it('should return 12 matches when calling implementation', function(){
		var parts = parser.readParts(parser._data);
		expect(parts).not.toBeNull();
		expect(parts.length).toBe(7);
	});
});


describe('read paragraphs', function(){
	it('should return 66 matches', function(){
		var pars = parser.readBlocks(parser._data, /^[0-9]{1,2}\.[0-9]+.*/m, 'Xn.');
		expect(pars).not.toBeNull();
		expect(pars.length).toBe(66);
	});
});

describe('#parseRules()', function(){
	it('should return 66 matches', function(){
		parser.parseRules();
		expect(parser.paragraphs).toBeDefined();
		expect(parser.paragraphs.length).toBe(66);
	});
});

// ^\s{13}[A-Z]{1,2}[0-9]{1,2}\.

