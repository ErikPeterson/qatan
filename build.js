var open = require('fs').open;
var browserify = require('browserify');


var build = function(){

	var b = browserify();
	var out = require('fs').createWriteStream('./js/app.js',{flags: 'w+'});

	b.add('./modules/qatan.js');
	b.bundle().pipe(out);

	console.log('Build complete');

};

module.exports = build;