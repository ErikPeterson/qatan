var pi = Math.PI;

var COLORS = {
	OILFIELD: '#525651',
	POPPY: '#a84a3b',
	GROVE: '#c0be88',
	OASIS: '#98c0c6',
	DUNES: '#dfdaa6',
	CITY: '#b88957'
};

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function getSmallestDimension(){
	return window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
}

function die(){
	return Math.floor(Math.random() * 6) + 1;
}

function roll(){
	return [die(), die()];
};

var Land = function(type, position, number){
	this._type = type;
	this.position = position;
	this.number = number;
	this.color = COLORS[type.toUpperCase()];
	this.nodes = [];
};

var Board = function(ctx){
	this.events = {};
	this.ctx = ctx;
	this.height = this.ctx.canvas.height;
	this.width = this.ctx.canvas.width;
	this.center = this.height/2;
	this.tileHeight = this.height / 5;
	this.buildLands();
};

Board.prototype.buildLands = function(){
	var types = shuffle(['oilfield','oilfield','oilfield', //coal:oil
				 'poppy','poppy','poppy','poppy', //wool:opium
				 'grove','grove','grove','grove', //wheat:olives
				 'city','city','city', 'city', //wood:guns
				 'oasis','oasis','oasis', //brick:water
				 'dunes' //desert
				 ]);

	var tokens = shuffle([8,8,6,6,10,10,9,9,5,5,4,4,3,3,2,12]);


	this.lands = types.map(function(type, i ){ return type !== 'dunes' ? new Land(type, i, tokens.pop()) : new Land(type, i)});

	this.drawBackground();
};

Board.prototype.drawBackground = function(){
	var r = this.tileHeight * 2,
		self = this,
		x,
		y;
	
	this.positions = [];

	function drawHex(ctx, color, x, y, a){
		var r = a / Math.cos(pi / 6);
		ctx.beginPath();
		ctx.moveTo(x + r * Math.cos(0), y + r * Math.sin(0));
		for(var i = 1; i < 6; i++) ctx.lineTo(x + r * Math.cos(i * 2 * pi / 6), y + r * Math.sin(i * 2 * pi / 6));

		ctx.closePath();
		ctx.lineWidth = 1;
		ctx.fillStyle = color;
		ctx.strokeStyle = color;
		ctx.fill();
		ctx.stroke();
	}

	for(var i = 1; i <= 6; i++) {
		x = this.center + r * Math.cos((i + 0.5) * 2 * pi / 6);
		y = this.center + r * Math.sin((i + 0.5) * 2 * pi /6);
		this.positions.push({x: x, y: y});
		drawHex(this.ctx, this.lands[i-1].color, x, y, 100);
	}
	r = Math.cos(pi / 6) * r;
	for(i = 1; i <= 6; i++) {
		x = this.center + r * Math.cos((i) * 2 * pi / 6);
		y = this.center + r * Math.sin((i) * 2 * pi /6);
		this.positions.push({x: x, y: y});
		drawHex(this.ctx, this.lands[i + 5].color, x, y, 100);
	}
	r = 200;
	for(i = 1; i <= 6; i++) {
		x = this.center + r * Math.cos((i + 0.5) * 2 * pi / 6);
		y = this.center + r * Math.sin((i + 0.5) * 2 * pi /6);
		this.positions.push({x: x, y: y});
		drawHex(this.ctx, this.lands[ i + 11].color, x, y, 100);
		
	}

	this.positions.push({x: this.center, y: this.center});
	drawHex(this.ctx, this.lands[this.lands.length - 1].color, this.center, this.center, this.tileHeight / 2);

	var img = new Image();
	img.src = this.ctx.canvas.toDataURL();

	this.ctx.clearRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);
	
	img.onload = function(){
		self.background = img;
		self.trigger('ready');
	};
};

Board.prototype.render = function(){
	this.paintBackground();
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

var Qatan = {
	layers: [],
	deck: [],
	scale: 0.75,
	init: function(){
		this.canvas = document.createElement('canvas');
		this.canvas.height = this.canvas.width = 1000;
		this.ctx = this.canvas.getContext('2d');
		document.body.appendChild(this.canvas);

		this.scaleCanvas();
		window.addEventListener('resize', this.scaleCanvas.bind(this));

		this.buildBoard();
	},
	scaleCanvas: function(){
		var dim = getSmallestDimension();
		var factor = (dim/1000) * this.scale;

		this.canvas.setAttribute('style', 'transform: scale(' + factor + ')')
	},
	buildBoard: function(){
		this.board = new Board(this.ctx);
		this.board.on('ready', this.start.bind(this));
	},
	start: function(){
		window.requestAnimationFrame(this.render.bind(this));
	},
	render: function(){
		this.board.render();
	}
};

Qatan.init();