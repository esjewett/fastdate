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