var fastdate = require('../fastdate.js');

describe('fastdate.format(specifier).parse', function(){
	describe('fastdate.format("%Y-%m-%d %H:%M:%S").parse', function(){
		var date = new Date(0);
		var dateString = "2013-06-30 05:20:10";
		date.setYear(2013);
		date.setMonth(05);
		date.setDate(30);
		date.setHours(5);
		date.setMinutes(20);
		date.setSeconds(10);
		it('should return a matching Date object', function(){
			fastdate.format("%Y-%m-%d %H:%M:%S").parse(dateString).toString().should.equal(date.toString());
		});
	});
});