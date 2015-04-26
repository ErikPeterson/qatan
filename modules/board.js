var Land  = require('./land');
var utils = require('./utils');
var BoardNumber = require('./board-number');


var Board = function(ctx, language){
	this.language = language;
	this.numbers = [];
	this.events = {};
	this.ctx = ctx;
	this.height = this.ctx.canvas.height;
	this.width = this.ctx.canvas.width;
	this.center = this.height/2;
	this.tileHeight = this.height / 5;
	this.buildLands();
};

Board.prototype.buildLands = function(){
	var types = utils.shuffle(['oilfield','oilfield','oilfield', //coal:oil
				 'poppy','poppy','poppy','poppy', //wool:opium
				 'grove','grove','grove','grove', //wheat:olives
				 'city','city','city', 'city', //wood:guns
				 'oasis','oasis','oasis', //brick:water
				 'dunes' //desert
				 ]);

	var tokens = utils.shuffle([8,8,6,6,10,10,9,9,5,5,4,4,3,3,2,11,11,12]);


	this.lands = types.map(function(type, i ){ return type !== 'dunes' ? new Land(type, i, tokens.pop()) : new Land(type, i, 7)});

	this.drawBackground();
};

Board.prototype.buildNumbers = function(){
	this.lands.forEach(this.buildNumber.bind(this));
	this.trigger('ready');
};

Board.prototype.buildNumber = function(land){
	if(land.number === 7) return;
	this.numbers.push(new BoardNumber(land.center, land.number, this.tileHeight, this.language));
};

Board.prototype.drawBackground = function(){
	var r = this.tileHeight * 2,
		self = this,
		a = this.tileHeight / 2,
		x,
		y;
	
	this.positions = [];

	function drawHex(ctx, color, x, y, a){
		var r = a / Math.cos(utils.pi / 6);
		ctx.beginPath();
		ctx.moveTo(x + r * Math.cos(0), y + r * Math.sin(0));
		for(var i = 1; i < 6; i++) ctx.lineTo(x + r * Math.cos(i * 2 * utils.pi / 6), y + r * Math.sin(i * 2 * utils.pi / 6));

		ctx.closePath();
		ctx.lineWidth = 1;
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.fill();
		ctx.stroke();
	}

	for(var i = 1; i <= 6; i++) {
		x = this.center + r * Math.cos((i + 0.5) * 2 * utils.pi / 6);
		y = this.center + r * Math.sin((i + 0.5) * 2 * utils.pi /6);
		this.positions.push({x: x, y: y});
		this.lands[i-1].center = {x: x, y: y};
		drawHex(this.ctx, this.lands[i-1].color, x, y, a);
	}
	r = Math.cos(utils.pi / 6) * r;
	for(i = 1; i <= 6; i++) {
		x = this.center + r * Math.cos((i) * 2 * utils.pi / 6);
		y = this.center + r * Math.sin((i) * 2 * utils.pi /6);
		this.positions.push({x: x, y: y});
		this.lands[i + 5].center = {x: x, y: y};
		drawHex(this.ctx, this.lands[i + 5].color, x, y, a);
	}
	r = this.tileHeight;
	for(i = 1; i <= 6; i++) {
		x = this.center + r * Math.cos((i + 0.5) * 2 * utils.pi / 6);
		y = this.center + r * Math.sin((i + 0.5) * 2 * utils.pi /6);
		this.positions.push({x: x, y: y});
		this.lands[i + 11].center = {x: x, y: y};
		drawHex(this.ctx, this.lands[ i + 11].color, x, y, a);
		
	}

	this.positions.push({x: this.center, y: this.center});
	this.lands[this.lands.length - 1].center = {x: this.center, y: this.center};
	drawHex(this.ctx, this.lands[this.lands.length - 1].color, this.center, this.center, a);

	var img = new Image();
	img.src = this.ctx.canvas.toDataURL();

	this.ctx.clearRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);
	
	img.onload = function(){
		self.background = img;
		self.buildNumbers();
	};
};

Board.prototype.render = function(){
	var self = this;
	this.paintBackground();
	this.numbers.forEach(function(n){n.draw(self.ctx)});
};

Board.prototype.paintBackground = function(){
	this.ctx.drawImage(this.background, 0, 0);
};

Board.prototype.on = function(event, fn){
	this.events[event] = this.events[event] || [];
	this.events[event].push(fn.bind(arguments[2]));
};

Board.prototype.off = function(event, fn){
	var index = this.events[event].indexOf(fn);

	this.events[event].splice(index, 1);
};

Board.prototype.trigger = function(event){
	this.events[event].forEach(function(fn){
		fn();
	});
};

module.exports = Board;