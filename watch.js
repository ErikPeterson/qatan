var watch = require('fs').watch;
var build = require('./build');

watch('./modules', function(event, fn){
	if(!event === 'change') return;
	console.log( fn + ' changed, building...');
	
	try{
		build();
	} catch(e){
		console.error(e);
	}
});
