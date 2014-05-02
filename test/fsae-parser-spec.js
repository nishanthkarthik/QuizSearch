'use strict';

var parser = require('../lib/fsae-parser');

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

describe('#readBlocks()', function(){
	it('should return false and not increment count of .getArticles() if there is no text', function(){
		expect(parser.readBlocks('',  /\s{13}ARTICLE/, 'ARTICLE').length).toBe(0);
	});
});

describe('Read articles', function(){
	it('should return 69 articles', function(){
		var articles = parser.readBlocks(parser._data, /\s{13}ARTICLE/, 'ARTICLE');
		expect(articles).not.toBeNull('No result given');
		expect(articles.length).toBe(66);
	});
});

describe('read parts', function(){
	it('should return 7 matches', function(){
		var parts = parser.readBlocks(parser._data, /\s{30}PART/, 'PART');
		expect(parts).not.toBeNull();
		expect(parts.length).toBe(7);
	});

	it('should return 7 matches when calling implementation', function(){
		var parts = parser.readParts(parser._data);
		expect(parts).not.toBeNull();
		expect(parts.length).toBe(7);
	});
});


describe('read paragraphs', function(){
	it('should return 1432 matches', function(){
		var pars = parser.readBlocks(parser._data, /^\s{13}[A-Z]{1,2}[0-9]{1,2}\./m, 'Xn.');
		expect(pars).not.toBeNull();
		expect(pars.length).toBe(1433);
	});
});

describe('#parseRules()', function(){
	it('should return 1433 matches', function(){
		parser.parseRules();
		expect(parser.paragraphs).toBeDefined();
		expect(parser.paragraphs.length).toBe(1433);
	});
});

// ^\s{13}[A-Z]{1,2}[0-9]{1,2}\.

