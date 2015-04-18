var addClass = require('./dom').addClass;
var readFile = require('fs').readFileSync;

var PlayerView = function(player, parent){
	this.rendered = false;
	this.player = player;
	this.$parent = parent;
	this.createElements();
};

PlayerView.prototype.createElements = function(){
	this.$el = document.createElement('div');
	addClass(this.classList(), this.$el);
	this.$el.innerHTML = readFile(__dirname + '/player-template.tpl');
};

PlayerView.prototype.classList = function(){
	return 'player ' + this.player.color + ' ' + 'seat-' + this.player.order;
};

PlayerView.prototype.render = function(){
	if(!this.rendered) return this.firstRender();
};

PlayerView.prototype.firstRender = function(){
	this.$parent.appendChild(this.$el);
};

module.exports = PlayerView;