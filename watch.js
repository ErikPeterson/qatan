#!/usr/bin/env node

var watch = require('fs').watch;
var build = require('./build');

watch('./modules', function(event, fn){
	if(!event === 'change') return;
	console.log( fn + ' changed');
	
	try{
		build.js();
	} catch(e){
		console.error(e);
	}
});

watch('./scss', function(event, fn){
	if(!event === 'change') return;
	console.log( fn + ' changed');

	try{
		build.css();
	} catch(e){
		console.error(e);
	}
});

watch('./html', function(event, fn){
	if(!event === 'change') return;
	console.log( fn + ' changed');

	try{
		build.html(fn)
	} catch(e){
		console.error(e);
	}
});