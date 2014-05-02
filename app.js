'use strict';

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  // log: 'trace',
  apiVersion: '1.1'
});

var fsaeParser = require('./lib/fsae-parser');
var fseParser = require('./lib/fse-parser');
var eventParser = require('./lib/event-parser');



fsaeParser.parseRules();
fseParser.parseRules();
eventParser.parseRules();


// client.ping({
//   requestTimeout: 1000,
//   // undocumented params are appended to the query string
//   hello: "elasticsearch!"
// }, function (error) {
//   if (error) {
//     console.error('elasticsearch cluster is down!');
//     exit(1);
//   } else {
//     console.log('All is well');
//   }
// });


var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());


app.use(express.static(__dirname + '/web/dist'));


app.get('/search/:query', function(req, res){
	console.log(req.params.query);
	client.search({
		index:'fsae,event,fse',
		type:'paragraphs',
		body: {
			query :{
				bool:{
					should:[{
						query_string:{
							default_field:'paragraphs.text',
							query:req.params.query
						}
					}]
				}
			}
		}
	}).then(function(resp){
		res.json(resp.hits.hits);
	}, function(err){
		console.trace(err.message);
	});
});


app.get('/fse/:query', function(req, res){
	console.log(req.params.query);
	var query = decodeURIComponent(req.params.query)
	console.log(query);
	client.search({
		index:'fse',
		type:'paragraphs',
		body: {
			query :{
				bool:{
					should:[{
						query_string:{
							default_field:'paragraphs.text',
							'query':query
						}
					}]
				}
			}
		}
	}).then(function(resp){
		res.json(resp.hits.hits);
	}, function(err){
		console.trace(err.message);
	});
});

app.get('/fsae/:query', function(req, res){
	console.log(req.params.query);
	client.search({
		index:'fsae',
		type:'paragraphs',
		body: {
			query :{
				bool:{
					should:[{
						query_string:{
							default_field:'paragraphs.text',
							query:req.params.query
						}
					}]
				}
			}
		}
	}).then(function(resp){
		res.json(resp.hits.hits);
	}, function(err){
		console.trace(err.message);
	});
});

app.get('/event/:query', function(req, res){
	console.log(req.params.query);
	client.search({
		index:'event',
		type:'paragraphs',
		body: {
			query :{
				bool:{
					should:[{
						query_string:{
							default_field:'paragraphs.text',
							query:req.params.query
						}
					}]
				}
			}
		}
	}).then(function(resp){
		res.json(resp.hits.hits);
	}, function(err){
		console.trace(err.message);
	});
});



app.listen('8080', function(){
	console.log('listening on 8080');
})
