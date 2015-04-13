var Land  = require('./land');
var utils = require('./utils');


var BoardNumber = function(center, number){
	this.animating = false;
	this.ticker = 0;
	this.number =  number;
	this.x = center.x;
	this.y = center.y;
};

BoardNumber.numberFns = {
	0: function(ctx, x, y){
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.arc(x, y, 4, 0, 2 * utils.pi);
		ctx.stroke();
	},
	1: function(ctx, x, y){
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(x - 7, y - 12);
		ctx.bezierCurveTo(x, y - 12, x , y + 12, x, y + 12);
		ctx.stroke();
	},
	2: function(ctx, x, y){
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(x + 10, y - 12);
		ctx.bezierCurveTo(x + 10, y - 3, x - 7, y - 5, x - 7, y - 11);
		ctx.bezierCurveTo(x - 4, y - 10, x + 3, y + 10, x, y + 10);
		ctx.stroke();
	},
	3: function(ctx, x, y){
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(x + 12, y - 13);
		ctx.bezierCurveTo(x + 12, y - 5, x + 2, y - 7, x + 2, y - 11);
		ctx.bezierCurveTo(x + 2, y - 5, x - 10, y - 5, x - 10, y - 13);
		ctx.bezierCurveTo(x - 10, y - 10, x + 5, y + 10, x , y + 13 );
		ctx.stroke();
	},
	4: function(ctx, x, y){
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(x + 5, y - 15);
		ctx.bezierCurveTo(x - 10, y - 10, x - 10, y, x, y - 2);
		ctx.bezierCurveTo(x - 12, y + 10, x - 12, y + 17, x + 7, y + 12);
		ctx.stroke();
	},
	5: function(ctx, x, y){
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(x + 4, y - 15);
		ctx.bezierCurveTo(x - 42, y + 20, x + 38, y + 20, x, y - 12);
		ctx.stroke();
	},
	6: function(ctx, x, y){
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(x - 10, y - 12);
		ctx.bezierCurveTo(x - 8, y - 5, x + 10, y - 7, x + 7, y - 12);
		ctx.bezierCurveTo( x , y , x - 3, y + 10, x, y + 12);
		ctx.stroke();
	},
	8: function(ctx, x, y){
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(x - 10, y + 8);
		ctx.bezierCurveTo(x, y + 8, x, y - 10, x, y - 10);
		ctx.bezierCurveTo(x, y - 10, x, y + 8, x + 10, y + 8);
		ctx.stroke();
	},		
	9: function(ctx, x, y){
		ctx.lineWidth = 3;
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.arc(x, y - 6, 8, utils.pi * 0.25, utils.pi * 2);
		ctx.bezierCurveTo(x, y + 15, x, y + 15, x, y + 15);
		ctx.stroke();
	},		
	10: function(ctx, x, y){
		BoardNumber.numberFns[1](ctx, x - 5, y);
		BoardNumber.numberFns[0](ctx, x + 5, y);
	},		
	11: function(ctx, x, y){
		BoardNumber.numberFns[1](ctx, x - 3, y);
		BoardNumber.numberFns[1](ctx, x + 6, y);

	},		
	12: function(ctx, x, y){
		BoardNumber.numberFns[1](ctx, x - 6, y);	
		BoardNumber.numberFns[2](ctx, x + 3, y);
	}	
};

BoardNumber.prototype.draw = function(ctx){
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius(), 0, 2 * utils.pi);
	ctx.closePath();
	ctx.fillStyle = '#333333';
	ctx.fill();
	this.drawNumber(ctx);
};

BoardNumber.prototype.radius = function(){
	return 30;
};

BoardNumber.prototype.drawNumber = function(ctx){
	BoardNumber.numberFns[this.number](ctx, this.x, this.y);
};

var Board = function(ctx){
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
	this.numbers.push(new BoardNumber(land.center, land.number));
};

Board.prototype.drawBackground = function(){
	var r = this.tileHeight * 2,
		self = this,
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
		drawHex(this.ctx, this.lands[i-1].color, x, y, 100);
	}
	r = Math.cos(utils.pi / 6) * r;
	for(i = 1; i <= 6; i++) {
		x = this.center + r * Math.cos((i) * 2 * utils.pi / 6);
		y = this.center + r * Math.sin((i) * 2 * utils.pi /6);
		this.positions.push({x: x, y: y});
		this.lands[i + 5].center = {x: x, y: y};
		drawHex(this.ctx, this.lands[i + 5].color, x, y, 100);
	}
	r = 200;
	for(i = 1; i <= 6; i++) {
		x = this.center + r * Math.cos((i + 0.5) * 2 * utils.pi / 6);
		y = this.center + r * Math.sin((i + 0.5) * 2 * utils.pi /6);
		this.positions.push({x: x, y: y});
		this.lands[i + 11].center = {x: x, y: y};
		drawHex(this.ctx, this.lands[ i + 11].color, x, y, 100);
		
	}

	this.positions.push({x: this.center, y: this.center});
	this.lands[this.lands.length - 1].center = {x: this.center, y: this.center};
	drawHex(this.ctx, this.lands[this.lands.length - 1].color, this.center, this.center, this.tileHeight / 2);

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
	window.setTimeout(function(){window.requestAnimationFrame(self.render.bind(self))}, 30);
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