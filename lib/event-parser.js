'use strict';

var fs = require('fs');

module.exports = new function(){
	this._data = fs.readFileSync('data/event.txt', {encoding: 'utf8'});
	if(Buffer.isBuffer(this._data)){
		this._data = this._data.toString('utf8');
	}
	if(typeof(this._data) !== 'string'){
		throw 'data is not string, but ' + typeof(this._data);
	}

	this.readBlocks = function(data, pattern, string){
		if(data != null){
			var found = [];
			var index = data.search(pattern);
			var sub = data;
			var i = 0;
			while(index !== -1){
				// console.log('INDEX: ' + index + '\n');
				var string = sub.substring(index, index+1);
				sub = sub.substring(index+1);
				// console.log(sub.substring(0, 10));
				var next = sub.search(pattern);
				string += sub.substring(0, (next === -1 ? sub.length : next));
				found.push(string.trim());
				index = next === -1 ? -1 : next;
				// console.log(string.trim().substring(0, 10));
				// i++;
			}
			return found;

		}
		return [];
	};

	this.readParts = function(data){
		return this.readBlocks(data, /^[0-9]{1,2}\s{1,4}([^\s]+\s){1,5}\s*$/m, '');
	}


	this.readParagraphs = function(data, part, article){
		return this.readBlocks(data, /^[0-9]{1,2}\.[0-9]+.*/m, 'Xn.');
	}

	this.parseRules = function(){
		var parts = this.readParts(this._data);
		var paragraphs = [];
		for(var i = 0; i < parts.length; i++){
			var part = parts[i].substring(6, 8).trim();
			var partTitle = parts[i].match(/^.*$/m)[0].trim();
			
			var pars = this.readParagraphs(parts[i]);
			for (var k = 0; k < pars.length; k++){
				paragraphs.push({
					'part':partTitle,
					text:pars[k]
				});
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
