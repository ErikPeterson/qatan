var utils = require('./utils');

var BoardNumber = function(center, number, tileHeight){
	this.tileHeight = tileHeight;
	this.discWidth = (tileHeight / 7) * 2;
	this.animating = false;
	this.ticker = 0;
	this.number =  number;
	this.x = center.x;
	this.y = center.y;
};

BoardNumber.numberFns = {
	0: function(ctx, x, y, dw){
		ctx.lineWidth = Math.floor(dw / 20);
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.arc(x, y, dw / 10, 0, 2 * utils.pi);
		ctx.stroke();
	},
	1: function(ctx, x, y, dw){
		ctx.lineWidth = Math.floor(dw / 20);
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(x - (dw / 7), y - (dw / 4));
		ctx.bezierCurveTo(x, y - (dw / 4), x , y + (dw / 4), x, y + (dw / 4));
		ctx.stroke();
	},
	2: function(ctx, x, y, dw){
		ctx.lineWidth = Math.floor(dw / 20);
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(x + (dw / 5), y - (dw / 4.1666666667));
		ctx.bezierCurveTo(x + (dw / 5), y - (dw / 8.33333), x - (dw / 7.1428571429), y - (dw / 10), x - (dw / 7.1428571429), y - (dw / 4.5454545455));
		ctx.bezierCurveTo(x - (dw / 7.1428571429), y - (dw / 5), x + (dw / 8.33333), y + (dw / 5), x, y + (dw / 5));
		ctx.stroke();
	},
	3: function(ctx, x, y, dw){
		ctx.lineWidth = Math.floor(dw / 20);
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(x + (dw / 4.1666666667), y - (dw / 3.8461538462));
		ctx.bezierCurveTo(x + (dw / 4.1666666667), y - (dw / 10), x + (dw / 25), y - (dw / 7.1428571429), x + (dw / 25), y - (dw / 4.5454545455));
		ctx.bezierCurveTo(x + (dw / 25), y - (dw / 10), x - (dw / 5), y - (dw / 10), x - (dw / 5), y - (dw / 3.8461538462));
		ctx.bezierCurveTo(x - (dw / 5), y - (dw / 5), x + (dw / 10), y + (dw / 5), x , y + (dw / 3.8461538462) );
		ctx.stroke();
	},
	4: function(ctx, x, y, dw){
		ctx.lineWidth = Math.floor(dw / 20);
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(x + (dw / 10), y - (dw / 3.3333333333));
		ctx.bezierCurveTo(x - (dw / 5), y - (dw / 5), x - (dw / 5), y, x, y - (dw / 25));
		ctx.bezierCurveTo(x - (dw / 4.1666666667), y + (dw / 5), x - (dw / 4.1666666667), y + (dw / 2.9411764706), x + (dw / 7.1428571429), y + (dw/ 4.1666666667));
		ctx.stroke();
	},
	5: function(ctx, x, y, dw){
		ctx.lineWidth = Math.floor(dw / 20);
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(x + (dw / 12.5), y - (dw / 3.3333333333));
		ctx.bezierCurveTo(x - (dw / 1.1904761905), y + (dw / 2.5), x + (dw / 1.3157894737), y + (dw / 2.5), x, y - (dw / 4.1666666667));
		ctx.stroke();
	},
	6: function(ctx, x, y, dw){
		ctx.lineWidth = Math.floor(dw / 20);
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(x - (dw / 12.5), y - (dw / 4.1666666667));
		ctx.bezierCurveTo(x - (dw / 6.25), y - (dw / 10), x + (dw / 5), y - (dw / 7.1428571429), x + (dw / 7.1428571429), y - (dw / 4.1666666667));
		ctx.bezierCurveTo( x , y , x - (dw / 16.666666667), y + (dw / 5), x, y + (dw / 4.1666666667));
		ctx.stroke();
	},
	8: function(ctx, x, y, dw){
		ctx.lineWidth = Math.floor(dw / 20);
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(x - (dw / 5), y + (dw / 6.25));
		ctx.bezierCurveTo(x, y + (dw / 6.25), x, y - (dw / 5), x, y - (dw / 5));
		ctx.bezierCurveTo(x, y - (dw/ 5), x, y + (dw / 6.25), x + (dw / 5), y + (dw / 6.25));
		ctx.stroke();
	},		
	9: function(ctx, x, y, dw){
		ctx.lineWidth = Math.floor(dw / 20);
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.arc(x, y - (dw / 8.3333333333), (dw / 6.25), utils.pi * 0.25, utils.pi * 2);
		ctx.bezierCurveTo(x, y + (dw / 3.333333), x, y + (dw / 3.333333), x, y + (dw / 3.333333));
		ctx.stroke();
	},		
	10: function(ctx, x, y, dw){
		BoardNumber.numberFns[1](ctx, x - (dw / 10), y, dw);
		BoardNumber.numberFns[0](ctx, x + (dw / 10), y, dw);
	},		
	11: function(ctx, x, y, dw){
		BoardNumber.numberFns[1](ctx, x - (dw / 16.666666), y, dw);
		BoardNumber.numberFns[1](ctx, x + (dw / 8.333333), y, dw);

	},		
	12: function(ctx, x, y, dw){
		BoardNumber.numberFns[1](ctx, x - (dw / 8.333333), y, dw);	
		BoardNumber.numberFns[2](ctx, x + (dw / 16.666666), y, dw);
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
	return this.tileHeight / 7;
};

BoardNumber.prototype.drawNumber = function(ctx){
	BoardNumber.numberFns[this.number](ctx, this.x, this.y, this.discWidth);
};

module.exports = BoardNumber;