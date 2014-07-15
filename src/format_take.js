module.exports = function (format, i) {
	var string = format.substr(0,i);
	return function () {
		return string;
	};
};