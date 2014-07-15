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