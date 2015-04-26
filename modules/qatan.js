var utils  = require('./utils');
var Board  = require('./board');
var Player = require('./player');

function getSmallestDimension(){
	return window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
};

var Qatan = {
	layers: [],
	deck: [],
	scale: 0.75,
	playersLoaded: false,
	boardLoaded: false,
	init: function(width, playerCount){
		this.width = width;
		this.playerCount = playerCount;
		this.canvas = document.createElement('canvas');
		this.canvas.height = this.canvas.width = this.width;
		this.ctx = this.canvas.getContext('2d');
		document.body.appendChild(this.canvas);

		this.scaleCanvas();
		window.addEventListener('resize', this.scaleCanvas.bind(this));
		this.buildPlayers();
		this.buildBoard();
	},
	scaleCanvas: function(){
		var dim = getSmallestDimension();
		var factor = (dim / this.width) * this.scale;

		this.canvas.setAttribute('style', 'transform: scale(' + factor + ')')
	},
	buildBoard: function(){
		var self = this;

		this.board = new Board(this.ctx, 'english');

		this.board.on('ready', function(){
			self.boardLoaded = true;
			self.start();
		});
	},
	buildPlayers: function(){
		var colors = utils.shuffle(['red', 'black', 'green', 'white']),
			self = this;

		if(this.playerCount === 3) colors.pop();
		
		this.players = colors.map(function(color, i){
				return new Player(color, i);
		});

		this.playersLoaded = true;
	},
	start: function(){
		if(!this.playersLoaded || !this.boardLoaded ) return window.setTimeout(this.start.bind(this), 100);
		window.requestAnimationFrame(this.render.bind(this));
	},
	render: function(){
		var self = this;

		this.board.render();
		this.players.forEach(function(p){p.render(self.ctx)});
		window.requestAnimationFrame(this.render.bind(this));
	}
};

Qatan.init(2500, 4);