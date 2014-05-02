'use strict';

var fs = require('fs');

module.exports = new function(){
	this._data = fs.readFileSync('data/fsae.txt', {encoding: 'utf8'});
	if(Buffer.isBuffer(this._data)){
		this._data = this._data.toString('utf8');
	}
	if(typeof(this._data) !== 'string'){
		throw 'data is not string, but ' + typeof(this._data);
	}

	this.readBlocks = function(data, pattern, string){
		if(data != null){
			var found = data.split(pattern);
			if(found != null && data.substring(0, found[0].length).search(pattern) === -1){
				found.shift();
			}
			if(found != null && found.length > 0){
				for(var i = 0; i < found.length; i++){
					found[i] = string + ' ' + found[i];
				}
				// console.log(found[0]);
				// console.log(found[found.length -1 ]);
				return found;
			}
		}
		return [];
	};

	this.readParts = function(data){
		return this.readBlocks(data, /\s{30}PART/, 'PART');
	}

	this.readArticles = function(data){
		return this.readBlocks(data, /\s{13}ARTICLE/, 'ARTICLE');
	}

	this.readParagraphs = function(data, part, article){
		return this.readBlocks(data, /^\s{13}[A-Z]{1,2}[0-9]{1,2}\./m, part+article+'.');
	}

	this.parseRules = function(){
		var parts = this.readParts(this._data);
		var paragraphs = [];
		for(var i = 0; i < parts.length; i++){
			var articles = this.readArticles(parts[i]);
			var part = parts[i].substring(6, 8).trim();
			var partTitle = parts[i].match(/PART.*/)[0];
			for (var j = 0; j < articles.length; j++){
				var article = articles[j].substring(8, 11).trim().replace(':', '');;
				var articleTitle = articles[j].match(/ARTICLE.*/)[0]
				
				var pars = this.readParagraphs(articles[j], part, article);
				for (var k = 0; k < pars.length; k++){
					paragraphs.push({
						'part':partTitle,
						'article':articleTitle,
						text:pars[k]
					});
				}
			}
		}
		this.paragraphs = paragraphs;
	};

	this.getArticles = function(){
		// return this._articles.length;
	}
};


// /ain/g
                           // A R T I C L E
