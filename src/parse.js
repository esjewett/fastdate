var drop = require('./parse_drop.js');
var capture = require('./parse_capture_specifier.js');

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