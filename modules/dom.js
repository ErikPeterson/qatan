var $ = document.querySelectorAll.bind(document);

var addClass = function(classname, el) {
    if (el.constructor === NodeList) return Array.prototype.slice.call(el)
        .map(addClass.bind(this, classname));

    var classlist = el.getAttribute('class') ? el.getAttribute('class')
        .split(/\s+/) : [];

    if (classlist.indexOf(classname) === -1) el.setAttribute('class', classlist.concat([classname])
        .join(' '));
    return el;
};

var removeClass = function(classname, el) {
    if (el.constructor === NodeList) return Array.prototype.slice.call(el)
        .map(removeClass.bind(this, classname));

    var classlist = el.getAttribute('class') ? el.getAttribute('class')
        .split(' ') : [];
    var index = classlist.indexOf(classname)

    if (index > -1) {
        classlist.splice(index, 1);
        el.setAttribute('class', classlist.join(' '));
    }

    return el;
};

var hasClass = function(classname, el) {
    if (!el || el.length == 0) return false;
    if (el.constructor === NodeList) return Array.prototype.slice.call(el)
        .every(hasClass.bind(this, classname));
    var classlist = el.getAttribute('class') ? el.getAttribute('class')
        .split(' ') : [];
    return classlist ? classlist.indexOf(classname) > -1 : false;
};

var toggleClass = function(classname, el) {
    if (el.constructor === NodeList) return Array.prototype.slice.call(el)
        .map(toggleClass.bind(this, classname));

    return hasClass(classname, el) ? removeClass(classname, el) : addClass(classname, el);
};


module.exports = {
	$: $,
	addClass: addClass,
	removeClass: removeClass,
	hasClass: hasClass,
	toggleClass: toggleClass
};
