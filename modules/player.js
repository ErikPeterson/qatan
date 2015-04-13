var Player = function(color, order){
	this.color = color;
	this.events = {};
	this.resources = [];
	this.order = order;
	this.sourcePortrait();
};

Player.portraits = {
	white: 'images/red-player.svg',
	black: 'images/black-player.svg',
	green: 'images/green-player.svg',
	red: 'images/red-player.svg'
};

Player.prototype.sourcePortrait = function(){
	var self = this;

	this.portrait = new Image();
	this.portrait.src = Player.portraits[this.color];
	
	this.portrait.onload = function(){
		self.trigger('ready');
	};
};


Player.prototype.on = function(event, fn){
	this.events[event] = this.events[event] || [];
	this.events[event].push(fn.bind(arguments[2]));
};

Player.prototype.off = function(event, fn){
	var index = this.events[event].indexOf(fn);

	this.events[event].splice(index, 1);
};

Player.prototype.trigger = function(event){
	this.events[event].forEach(function(fn){
		fn();
	});
};

module.exports = Player;