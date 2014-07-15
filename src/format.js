var take = require('./format_take.js');
var takeSpecifier = require('./format_take_specifier.js');
var parse = require('./parse.js');

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