var COLORS = {
	OILFIELD: '#525651',
	POPPY: '#a84a3b',
	GROVE: '#c0be88',
	OASIS: '#98c0c6',
	DUNES: '#dfdaa6',
	CITY: '#b88957'
};

var Land = function(type, position, number){
	this._type = type;
	this.position = position;
	this.number = number;
	this.color = COLORS[type.toUpperCase()];
	this.nodes = [];
};

module.exports = Land;
