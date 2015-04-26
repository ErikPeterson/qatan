#!/usr/bin/env node

var watch = require('fs').watch;
var buildTools = require('./build-tools');

watch('./modules/',{recursive: true}, function(event, fn){
	if(!event === 'change') return;
	console.log( fn + ' changed');
	
	try{
		buildTools.js();
	} catch(e){
		console.error(e);
	}
});

watch('./scss/',{recursive: true}, function(event, fn){
	if(!event === 'change') return;
	console.log( fn + ' changed');

	try{
		buildTools.css();
	} catch(e){
		console.error(e);
	}
});

watch('./html/', function(event, fn){
	if(!event === 'change') return;
	console.log( fn + ' changed');

	try{
		buildTools.html(fn);
	} catch(e){
		console.error(e);
	}
});

watch('./assets/numberfiles/', function(event, fn){
	if(!event === 'change') return;
	console.log( fn + ' changed');

	try{
		buildTools.ai(fn);
	} catch(e){
		console.error(e);
	}
});