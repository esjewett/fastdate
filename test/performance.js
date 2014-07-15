var d3 = require('d3');
var moment = require('moment');
var fastdate = require('../fastdate.js');

var date = new Date(2013,5,2);
var str = "2013-05-02";
var mom = moment(str, "YYYY-MM-DD");
var start, end, result;

// Set iterations
var d3ParseIterations = 100000;
var d3FormatIterations = 100000;
var momentParseIterations = 100000;
var momentFormatIterations = 100000;
var optimalParseIterations = 100000;
var optimalFormatIterations = 100000;
var fastdateParseIterations = 100000;
var fastdateFormatIterations = 100000;

var d3parse = d3.time.format("%Y-%m-%d").parse;
var d3format = d3.time.format("%Y-%m-%d");
var fastdateParse = fastdate.format("%Y-%m-%d").parse;
var fastdateFormat = fastdate.format("%Y-%m-%d");

// Basic d3.js parsing.

start = Date.now();

for(var i = 0; i<d3ParseIterations; i++) {
	result = d3parse(str);
}

end = Date.now();

console.log("d3.js parsing: " + (end - start) + "ms (" + ((end - start) / d3ParseIterations) + " ms/parse)");


// Basic d3.js formatting.

start = Date.now();

for(var i = 0; i<d3FormatIterations; i++) {
	result = d3format(date);
}

end = Date.now();

console.log("d3.js formatting: " + (end - start) + "ms(" + ((end - start) / d3FormatIterations) + " ms/parse)");

// Basic moment.js parsing.

start = Date.now();

for(var i = 0; i<momentParseIterations; i++) {
	result = moment(str, "YYYY-MM-DD");
}

end = Date.now();

console.log("moment.js parsing: " + (end - start) + "ms(" + ((end - start) / momentParseIterations) + " ms/parse)");


// Basic moment.js formatting.

start = Date.now();

for(var i = 0; i<momentFormatIterations; i++) {
	result = mom.format("YYYY-MM-DD");
}

end = Date.now();

console.log("moment.js formatting: " + (end - start) + "ms(" + ((end - start) / momentFormatIterations) + " ms/parse)");

// Basic fastdate.js parsing.

start = Date.now();

for(var i = 0; i<fastdateParseIterations; i++) {
	result = fastdateParse(str);
}

end = Date.now();

console.log("fastdate.js parsing: " + (end - start) + "ms(" + ((end - start) / fastdateParseIterations) + " ms/parse)");


// Basic fastdate.js formatting.

start = Date.now();

for(var i = 0; i<fastdateFormatIterations; i++) {
	result = fastdateFormat(date);
}

end = Date.now();

console.log("fastdate.js formatting: " + (end - start) + "ms(" + ((end - start) / fastdateFormatIterations) + " ms/parse)");

// Try parsing ourselves.

start = Date.now();

for(var i = 0; i<optimalParseIterations; i++) {
	result = new Date(+str.substr(0,4), +str.substr(5,2), +str.substr(8,2));
}

end = Date.now();

console.log("Optimal parsing: " + (end - start) + "ms(" + ((end - start) / optimalParseIterations) + " ms/parse)");


// Try formatting ourselves.

start = Date.now();

for(var i = 0; i<optimalFormatIterations; i++) {
	result = date.getFullYear() + '-' + (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() > 9 ? date.getDate() : '0' + (date.getDate()));
}
end = Date.now();

console.log("Optimal formatting: " + (end - start) + "ms(" + ((end - start) / optimalFormatIterations) + " ms/parse)");