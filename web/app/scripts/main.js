console.log('\'Allo \'Allo!');

var $search
var value;
var $fse, $fsae, $event;

var host = 'http://localhost:8080';

function search(){

	$.getJSON(host + '/fsae/' + value)
			.done(function(data){
				console.log(data);
				$fsae.append(createHTML(data));
			})
			.fail(function(jxqhr, err, something){
				console.log(arguments);
			});

	$.getJSON(host + '/fse/' + value)
			.done(function(data){
				console.log(data);
				$fse.append(createHTML(data));
			})
			.fail(function(jxqhr, err, something){
				console.log(arguments);
			});

	$.getJSON(host + '/event/' + value)
			.done(function(data){
				console.log(data);
				$event.append(createHTML(data));
			})
			.fail(function(jxqhr, err, something){
				console.log(arguments);
			});
}

function createHTML(data){
	var $cont = $('<div/>');
	
	for(var i = 0; i < data.length; i++){
		$cont.append(
             $('<div/>',{
				class:'result',
				html:'<strong>' + data[i]._source.part + '</strong><br/>'
					+ data[i]._source.text
			})	
		);
	}
	return $cont;
}


$(function readyFunction () {
	$search = $('#search');

	$fse = $('#fse');
	$fsae = $('#fsae');
	$event = $('#event');

	$search.keydown(function(){
		value = encodeURIComponent($(this).val());

		$('.resultset').empty();
		search();

	})
});
