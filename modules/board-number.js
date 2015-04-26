var utils = require('./utils');
var numbers = require('./number-dictionaries/languages');

var BoardNumber = function(center, number, tileHeight, language){
	this.tileHeight = tileHeight;
	this.discWidth = (tileHeight / 7) * 2;
	this.animating = false;
	this.ticker = 0;
	this.number =  number;
	this.x = center.x;
	this.y = center.y;
	this.numberHash = numbers[language][this.number];
};

BoardNumber.prototype.draw = function(ctx){
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius(), 0, 2 * utils.pi);
	ctx.closePath();
	ctx.fillStyle = '#E6E2AD';
	ctx.fill();
	this.drawNumber(ctx);
};

BoardNumber.prototype.radius = function(){
	return this.tileHeight / 7;
};

BoardNumber.prototype.drawNumber = function(ctx){
	var ratio = this.discWidth / this.numberHash.width;
	var i = 0,
		len = this.numberHash.curves.length;
	ctx.strokeStyle = '#ffffff';
	ctx.lineWidth = this.discWidth / 25;

	for(i = 0; i < len; i++){
		this.drawCurve(ctx, this.numberHash.curves[i], ratio);
	};

};

BoardNumber.prototype.drawCurve = function(ctx, curve, ratio){
	var self = this;
	ctx.beginPath();
	curve.forEach(function(segment){
		self[segment.method](ctx, segment, ratio);
	});
	ctx.stroke();
};

BoardNumber.prototype.moveTo = function(ctx, segment, ratio){
	ctx.moveTo(this.x + (ratio * segment.point.x), this.y + (ratio * segment.point.y));
};

BoardNumber.prototype.bezierCurveTo = function(ctx, segment, ratio){
	ctx.bezierCurveTo( this.x + (ratio * segment.points[0].x), this.y + (ratio * segment.points[0].y), this.x + (ratio * segment.points[1].x), this.y + (ratio * segment.points[1].y), this.x + (ratio * segment.points[2].x), this.y + (ratio * segment.points[2].y));
};

BoardNumber.prototype.lineTo = function(ctx, segment, ratio){
	ctx.lineTo(this.x + (ratio * segment.point.x), this.y + (ratio * segment.point.y));
};

module.exports = BoardNumber;