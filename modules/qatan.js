var utils = require('./utils');
var Board = require('./board');


function getSmallestDimension(){
	return window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
};

var Qatan = {
	layers: [],
	deck: [],
	scale: 0.75,
	playersLoaded: false,
	boardLoaded: false,
	init: function(width){
		this.width = width;
		this.canvas = document.createElement('canvas');
		this.canvas.height = this.canvas.width = this.width;
		this.ctx = this.canvas.getContext('2d');
		document.body.appendChild(this.canvas);

		this.scaleCanvas();
		window.addEventListener('resize', this.scaleCanvas.bind(this));

		this.buildBoard();
	},
	scaleCanvas: function(){
		var dim = getSmallestDimension();
		var factor = (dim / this.width) * this.scale;

		this.canvas.setAttribute('style', 'transform: scale(' + factor + ')')
	},
	buildBoard: function(){
		this.board = new Board(this.ctx);
		this.board.on('ready', this.start.bind(this));
	},
	start: function(){
		if(!this.playersLoaded || !this.boardLoaded ) return window.setTimeout(this.start.bind(this), 100);
		window.requestAnimationFrame(this.render.bind(this));
	},
	render: function(){
		var self = this;

		this.board.render();
		this.players.each(function(p){p.render(self.ctx)});
	}
};

Qatan.init(2500);