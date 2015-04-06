var pi = Math.PI;

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function getSmallestDimension(){
	return window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth;
}

function drawBoard(ctx){
	var colors = ['#a55434', '#a55434', '#a55434', '#50966e', '#50966e', '#50966e', '#50966e', '#67b94e', '#67b94e', '#67b94e', '#67b94e', '#e4e066', '#e4e066', '#e4e066', '#e4e066', '#739292', '#739292', '#739292', '#c0bf95'];
	var r = 400;
	var x = y = 500;
	
	shuffle(colors);
	drawHex(ctx, colors.pop(), 500, 500, 100);

	shuffle(colors);
	for(var i = 1; i <= 6; i++) drawHex(ctx, colors.pop(), x + r * Math.cos((i + 0.5) * 2 * pi / 6), y + r * Math.sin((i + 0.5) * 2 * pi /6), 100);
	
	r = Math.cos(pi / 6) * r;
	shuffle(colors);
	for(i = 1; i <= 6; i++) drawHex(ctx, colors.pop(), x + r * Math.cos((i) * 2 * pi / 6), y + r * Math.sin((i) * 2 * pi /6), 100);

	r = 200;
	shuffle(colors);
	for(i = 1; i <= 6; i++) drawHex(ctx, colors.pop(), x + r * Math.cos((i + 0.5) * 2 * pi / 6), y + r * Math.sin((i + 0.5) * 2 * pi /6), 100);
}

function drawHex(ctx, color, x, y, a){
	var r = a / Math.cos(pi / 6);

	ctx.beginPath();
	ctx.moveTo(x + r * Math.cos(0), y + r * Math.sin(0));
	for(var i = 1; i < 6; i++) ctx.lineTo(x + r * Math.cos(i * 2 * pi / 6), y + r * Math.sin(i * 2 * pi / 6));

	ctx.closePath();
	ctx.lineWidth = 1;
	ctx.fillStyle = color;
	ctx.strokeStyle = color;
	ctx.fill();
	ctx.stroke();
}

function scale(canvas){
	var dim = getSmallestDimension();
	var factor = (dim/1000) * 0.75;
	canvas.setAttribute('style', 'transform: scale(' + factor + ')')
}

function init(){
	var canvas = document.getElementsByTagName('canvas')[0];
		scale(canvas);
	var ctx = canvas.getContext('2d');
	
	drawBoard(ctx);
}

init();

