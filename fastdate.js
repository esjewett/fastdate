!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.fastdate=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var fastdate_format = _dereq_('./format.js');

module.exports.format = fastdate_format;
},{"./format.js":2}],2:[function(_dereq_,module,exports){
var take = _dereq_('./format_take.js');
var takeSpecifier = _dereq_('./format_take_specifier.js');
var parse = _dereq_('./parse.js');

module.exports = function (format) {

	var parseFormat = format;
	var formatFunctions = [];

	if(format.length === 0) {
		formatFunctions.push(function() { return ""; });
	}

	while(format.length > 0) {
		if(format.indexOf('%') === -1) {
			// No capturing necessary
			formatFunctions.push(take(format, format.length));
			format = "";
		} else {
			if(format.indexOf('%') > 0) {
				// Capture is not at the beginning.
				formatFunctions.push(take(format, format.indexOf('%')));
				format = format.substr(format.indexOf('%'));
			} else {
				// Capture is at the beginning, so we generate an appropriate function.
				formatFunctions.push(takeSpecifier(format.substr(0,2)));
				format = format.substr(2);
			}
		}
	}

	var string = "";
	var form = function (date) {
		string = "";
		for(var i = 0; i < formatFunctions.length; i++) {
			string = string + formatFunctions[i](date);
		}
		return string;
	};

	form.parse = parse(parseFormat);

	return form;
};
},{"./format_take.js":3,"./format_take_specifier.js":4,"./parse.js":5}],3:[function(_dereq_,module,exports){
module.exports = function (format, i) {
	var string = format.substr(0,i);
	return function () {
		return string;
	};
};
},{}],4:[function(_dereq_,module,exports){
module.exports = function (specifier) {
	switch (specifier) {
		case '%Y':
			return function (date) {
				return date.getFullYear();
			};
		case '%m':
			return function (date) {
				return date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
			};
		case '%d':
			return function (date) {
				return date.getDate() > 9 ? date.getDate() : '0' + (date.getDate());
			};
		case '%H':
			return function (date) {
				return date.getHours() > 9 ? date.getHours() : '0' + (date.getHours());
			};
		case '%L':
			return function (date) {
				return date.getMilliseconds() > 9 ?
					(date.getMilliseconds() > 99 ? date.getMilliseconds() : ('0' + date.getMilliseconds()) ) :
					('00' + date.getMilliseconds());
			};
		case '%S':
			return function (date) {
				return date.getSeconds() > 9 ? date.getSeconds() : '0' + (date.getSeconds());
			};
		case '%M':
			return function (date) {
				return date.getMinutes() > 9 ? date.getMinutes() : '0' + (date.getMinutes());
			};
		case '%%':
			return function () {
				return '%';
			};
	}
};
},{}],5:[function(_dereq_,module,exports){
var drop = _dereq_('./parse_drop.js');
var capture = _dereq_('./parse_capture_specifier.js');

module.exports = function (format) {
	var date;

	// Parse functions take a string and a Date object, modify the Date object, and
	// return a string with the requisite characters removed from the beginning.
	var parseFunctions = [];

	while(format.length > 0) {
		if(format.indexOf('%') === -1) {
			// No capturing necessary
			format = "";
		} else {
			if(format.indexOf('%') > 0) {
				// Capture is not at the beginning.
				parseFunctions.push(drop(format.indexOf('%')));
				format = format.substr(format.indexOf('%'));
			} else {
				// Capture is at the beginning, so we generate an appropriate function.
				parseFunctions.push(capture(format.substr(0,2)));
				format = format.substr(2);
			}
		}
	}

	return function (string) {
		date = new Date();
		for(var i = 0; i < parseFunctions.length; i++) {
			string = parseFunctions[i](string, date);
		}
		return date;
	};
};
},{"./parse_capture_specifier.js":6,"./parse_drop.js":7}],6:[function(_dereq_,module,exports){
module.exports = function (specifier) {
	switch (specifier) {
		case '%Y':
			return function (string, date) {
				date.setFullYear(+string.substr(0,4));
				return string.substr(4);
			};
		case '%m':
			return function (string, date) {
				date.setMonth(+string.substr(0,2)-1);
				return string.substr(2);
			};
		case '%d':
			return function (string,date) {
				date.setDate(+string.substr(0,2));
				return string.substr(2);
			};
		case '%H':
			return function (string,date) {
				date.setHours(+string.substr(0,2));
				return string.substr(2);
			};
		case '%L':
			return function (string,date) {
				date.setMilliseconds(+string.substr(0,3));
				return string.substr(3);
			};
		case '%S':
			return function (string,date) {
				date.setSeconds(+string.substr(0,2));
				return string.substr(2);
			};
		case '%M':
			return function (string,date) {
				date.setMinutes(+string.substr(0,2));
				return string.substr(2);
			};
		case '%%':
			return function (string) {
				return string.substr(1);
			};
	}
};
},{}],7:[function(_dereq_,module,exports){
module.exports = function (index) {
	return function (string) {
		return string.substr(index);
	};
};
},{}]},{},[1])
(1)
});