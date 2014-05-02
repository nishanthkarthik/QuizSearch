'use strict';

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
  apiVersion: '1.1'
});

var fsaeParser = require('./lib/fsae-parser');
var fseParser = require('./lib/fse-parser');
var eventParser = require('./lib/event-parser');



fsaeParser.parseRules();
fseParser.parseRules();
eventParser.parseRules();


client.ping({
  requestTimeout: 1000,
  // undocumented params are appended to the query string
  hello: "elasticsearch!"
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

var inserted = 0;

// for(var i = 0; i < fsaeParser.paragraphs.length; i++){
// 	client.create({
// 		index:'fsae',
// 		type:'paragraphs',
// 		body:fsaeParser.paragraphs[i]
// 	}, function(error, response){
// 		if(error){
// 			console.log('An error occurred inserting ' 
// 			            + fsaeParser.paragraphs[i] 
// 			            + '. Error: ' + error);
// 		}else{
// 			console.log(++inserted + ' documents inserted');
// 		}
// 	});
// }

// for(var i = 0; i < fseParser.paragraphs.length; i++){
// 	client.create({
// 		index:'fse',
// 		type:'paragraphs',
// 		body:fseParser.paragraphs[i]
// 	}, function(error, response){
// 		if(error){
// 			console.log('An error occurred inserting ' 
// 			            + fseParser.paragraphs[i] 
// 			            + '. Error: ' + error);
// 		}else{
// 			console.log(++inserted + ' documents inserted');
// 		}
// 	});
// }

for(var i = 0; i < eventParser.paragraphs.length; i++){
	client.create({
		index:'event',
		type:'paragraphs',
		body:eventParser.paragraphs[i]
	}, function(error, response){
		if(error){
			console.log('An error occurred inserting ' 
			            + eventParser.paragraphs[i] 
			            + '. Error: ' + error);
		}else{
			console.log(++inserted + ' documents inserted');
		}
	});
}
