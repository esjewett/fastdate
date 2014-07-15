var fastdate = require('../fastdate.js');

describe('fastdate.format', function(){
	describe('fastdate.format("%Y-%m-%d %H:%M:%S")', function(){
		var date = new Date();
		date.setYear(2013);
		date.setMonth(05);
		date.setDate(30);
		date.setHours(5);
		date.setMinutes(20);
		date.setSeconds(10);
		it('should return "2013-06-30 05:20:10"', function(){
			fastdate.format("%Y-%m-%d %H:%M:%S")(date).should.equal("2013-06-30 05:20:10");
		});
	});
});