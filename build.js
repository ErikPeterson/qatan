var open = require('fs').open;
var browserify = require('browserify');

var build = function(){

	var b = browserify('./modules/qatan.js');
	var out = require('fs').createWriteStream('./js/app.js',{flags: 'w+'});

	b.transform('brfs');
	b.bundle().pipe(out);

	console.log('Build complete');

};

module.exports = build;