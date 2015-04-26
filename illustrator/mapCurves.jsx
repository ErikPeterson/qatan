"object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(a){return 10>a?"0"+a:a}function this_value(){return this.valueOf()}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return"string"==typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,h,g=gap,i=b[a];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(a)),"function"==typeof rep&&(i=rep.call(b,a,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,h=[],"[object Array]"===Object.prototype.toString.apply(i)){for(f=i.length,c=0;f>c;c+=1)h[c]=str(c,i)||"null";return e=0===h.length?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&"object"==typeof rep)for(f=rep.length,c=0;f>c;c+=1)"string"==typeof rep[c]&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=0===h.length?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value);var cx,escapable,gap,indent,meta,rep;"function"!=typeof JSON.stringify&&(escapable=/[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(a,b,c){var d;if(gap="",indent="","number"==typeof c)for(d=0;c>d;d+=1)indent+=" ";else"string"==typeof c&&(indent=c);if(rep=b,b&&"function"!=typeof b&&("object"!=typeof b||"number"!=typeof b.length))throw new Error("JSON.stringify");return str("",{"":a})}),"function"!=typeof JSON.parse&&(cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),void 0!==d?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();

var LayerReader = function(layer, height, width){
	this.width = width;
	this.height = height;
	this.center = {x: this.width / 2, y: this.height / 2}
	this.layer = layer;
	this.name = layer.name;
	this.read();
};

LayerReader.prototype.read = function(){
	var paths = this.layer.pathItems;
	this.curves = [];

	for(var i = 0, len = paths.length; i < len; i++){
		this.curves.push(this.readPath(paths[i]));
	}
};

LayerReader.prototype.readPath = function(path){
	var points = path.pathPoints;
	var len = points.length;
	var path = [],
		currentPoint,
		nextPoint,
		currentHash;

	path.push({ method: 'moveTo', point: this.point(points[0].anchor[0], points[0].anchor[1]) });
	
	for(var i = 0; i < len - 1; i ++){
		currentPoint = points[i];
		nextPoint = points[i + 1];
		currentHash = {};

		if(currentPoint.rightDirection || nextPoint.leftDirection){ 
			currentHash.method = 'bezierCurveTo';
			currentHash.points = this.bezierCurve(currentPoint, nextPoint);
		} else{
			currentHash.method = 'lineTo';
			currentHash.point = this.point(nextPoint.anchor[0], nextPoint.anchor[1])
		}

		path.push(currentHash);
	}

	return path;
};

LayerReader.prototype.point = function(x, y){return {x: this.offsetX(x), y: this.offsetY(y)};}

LayerReader.prototype.offsetX = function(n){return n - this.center.x;};

LayerReader.prototype.offsetY = function(n){ return this.center.y - (n + this.height);};

LayerReader.prototype.bezierCurve = function (point1, point2){
		var output = [];

		if(point1.rightDirection){
			output.push(this.point(point1.rightDirection[0], point1.rightDirection[1]));
		} else{
			output.push(this.point(point1.anchor[0], point1.anchor[1]));
		}

		if(point2.leftDirection){
			output.push(this.point(point2.leftDirection[0], point2.leftDirection[1]));
		} else {
			output.push(this.point(point2.anchor[0], point2.anchor[1]));
		}
		
		output.push(this.point(point2.anchor[0], point2.anchor[1]));

		return output;
};

LayerReader.prototype.toHash = function(){
	return {center: this.center, name: this.name, width: this.width, height: this.height, curves: this.curves};
};

function mapCurves(file, outpath, language){
	app.open(new File(file));

	var layers = app.activeDocument.layers;
	var len = layers.length;
	var currentLayer;
	var width = app.documents[0].width;
	var height = app.documents[0].height;
	var output = {};
	
	for(var i = 0; i < len - 1 ; i++){
		currentLayer = new LayerReader(layers[i], height, width);
		json = currentLayer.toHash();
		output[len - i - 2] = json;
	}
	
	writeFile(outpath + '/' + language + '.json', JSON.stringify(output, null, 4)); 

	return outpath + '/' + language + '.json';
}

function writeFile(path, content, language){
	var file = new File(path);
	file.open('w+');
	file.writeln(content);
}

function main(args){
	return mapCurves(args[0], args[1], args[2]);
}
