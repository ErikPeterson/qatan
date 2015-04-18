var PlayerView = require('./player-view');

var Player = function(color, order){
	this.color = color;
	this.changed = true;
	this.events = {};
	this.resources = {
		oil: 0,
		opium: 0,
		water: 0,
		olives: 0,
		weapons: 0
	};
	this.order = order;
	this.view = new PlayerView(this, document.body);
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
	// if(!this.events[event]) return;
	this.events[event].forEach(function(fn){
		fn();
	});
};

Player.prototype.render = function(ctx){
	if(!this.changed) return;
	this.view.render();
	return this.changed = false;
};

module.exports = Player;