var utils = require('./utils');
var Board = require('./board');


function getSmallestDimension(){
	return window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
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