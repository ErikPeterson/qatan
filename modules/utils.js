var pi = Math.PI;
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function die(){
	return Math.floor(Math.random() * 6) + 1;
}

function roll(){
	return [die(), die()];
};

module.exports = {
	pi: pi,
	shuffle: shuffle,
	die: die,
	roll: roll
};