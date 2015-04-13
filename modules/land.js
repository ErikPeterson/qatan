var COLORS = {
	OILFIELD: '#525651',
	POPPY: '#E8A5A5',
	GROVE: '#D0D6B0',
	OASIS: '#98c0c6',
	DUNES: '#fff3cf',
	CITY: '#DEBB97'
};

var Land = function(type, position, number){
	this._type = type;
	this.position = position;
	this.number = number;
	this.color = COLORS[type.toUpperCase()];
	this.nodes = [];
};

module.exports = Land;
