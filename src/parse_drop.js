module.exports = function (index) {
	return function (string) {
		return string.substr(index);
	};
};