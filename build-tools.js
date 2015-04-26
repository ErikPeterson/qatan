var browserify = require('browserify');
var sass = require('node-sass');
var mkdirp = require('mkdirp');
var exec = require('child_process').exec;

var ai = function(){
	console.log('Processing AI files');
	exec('./process_dictionaries.sh', {cwd: __dirname}, function(err, stdout, stderr){
		if(err) return console.error(err);
		if(stderr) return console.log(stderr);

		console.log('Done Processing AI files');
	});
};

var js = function(){
	console.log('Compiling JS');
	mkdirp('./build/js', function(err){
		if(err) return console.error(err);

		var b = browserify('./modules/qatan.js');
		var out = require('fs').createWriteStream(__dirname + '/build/js/app.js',{flags: 'w+'});

		b.transform('brfs');
		b.bundle().pipe(out);

		console.log('JS build complete');
	});
};

var css = function(){
	mkdirp('./build/css', function(err){
		if(err) return console.error(err);
		console.log('Compiling SASS');

		sass.render({
			file: __dirname + '/scss/app.scss',
			outputStyle: 'compressed',
			success: function(obj){
				require('fs').writeFile('./build/css/app.css', obj.css, function(err){
					if(err) return console.error(err);

					console.log('SASS compilation complete');
				});
			},
			error: function(err){
				console.error(err);
			}
		});

	});
};

var html = function(fn){
	console.log('Copying HTML');
	var fs = require('fs');
	
	mkdirp('./build', function(err){
		if(err) return console.error(err);

		fs.createReadStream('./html/' + fn).pipe(fs.createWriteStream('./build/' + fn));

		console.log('HTML copy complete')
	});
};

module.exports = {
	js: js,
	css: css,
	html: html,
	ai: ai
};