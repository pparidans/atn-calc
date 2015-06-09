var assert = require('assert');
var moment = require('moment');
var Atn2015 = require('../../../src/app/models/atn_2015.js');

describe('Atn2015', function() {

	describe('#calculate()', function() {
		it('should return 1250 when price is 10000, fuel is [essence] and co2 is 100', function() {
			assert.equal(1250, Atn2015.calculate('essence', 10000, 100, '2014-01-01', '2014-12-31', '2014-01-01', '2014-12-31'));
		});
		it('should return 1469.57 when price is 31750, fuel is [essence] and co2 is 109', function() {
			assert.equal(1469.57, Atn2015.calculate('essence', 31750, 109, '2014-01-01', '2014-12-31', '2014-01-01', '2014-12-31'));
		});
		it('should return 4397.31 when price is 45400, fuel is [gazoil] and co2 is 149', function() {
			assert.equal(4397.31, Atn2015.calculate('gazoil', 45400, 149, '2014-01-01', '2014-12-31', '2014-01-01', '2014-12-31'));
		});
		it('should return 2811.43 when price is 82000, fuel is [electric] and co2 is 0', function() {
			assert.equal(2811.43, Atn2015.calculate('electric', 82000, 0, '2014-01-01', '2014-12-31', '2014-01-01', '2014-12-31'));
		});
		it('should return 1250 when price is 10000, fuel is [essence] and co2 is 100', function() {
			assert.equal(1250, Atn2015.calculate('essence', 10000, 100, '2014-01-01', '2014-12-31', '2014-01-01', '2014-12-31'));
		});
		it('should return 124.81 for 1 month when price is 31750, fuel is [essence] and co2 is 109', function() {
			assert.equal(124.81, Atn2015.calculate('essence', 31750, 109, '2014-01-01', '2014-12-31', '2014-01-01', '2014-01-31'));
		});
		it('should return 373.47 for 1 month when price is 45400, fuel is [gazoil] and co2 is 149', function() {
			assert.equal(373.47, Atn2015.calculate('gazoil', 45400, 149, '2014-01-01', '2014-12-31', '2014-01-01', '2014-01-31'));
		});
		it('should return 238.78 for 1 month when price is 82000, fuel is [electric] and co2 is 0', function() {
			assert.equal(238.78, Atn2015.calculate('electric', 82000, 0, '2014-01-01', '2014-12-31', '2014-01-01', '2014-01-31'));
		});
	});

	describe('#co2Coefficient()', function() {
		it('should return 0.055 when the fuel is [gazoil] and co2 is 91', function() {
			assert.equal(0.055, Atn2015.co2Coefficient('gazoil', 91));
		});
		it('should return 0.055 when the fuel is [essence] and co2 is 110', function() {
			assert.equal(0.055, Atn2015.co2Coefficient('essence', 110));
		});
		it('should return more than 0.055 when the fuel is [gazoil] and co2 is 115', function() {
			assert.ok(0.055 < Atn2015.co2Coefficient('gazoil', 115));
		});
	});

	describe('#calculateCo2Coefficient()', function() {
		it('should return 0.055 when the baseline is 95 and co2 is 95', function() {
			assert.equal(0.055, Atn2015.calculateCo2Coefficient(95, 95));
		});
		it('should return 0.065 when the baseline is 95 and co2 is 105', function() {
			assert.equal(0.065, Atn2015.calculateCo2Coefficient(95, 105));
		});
		it('should return 0.18 when the baseline is 95 and co2 is 400', function() {
			assert.equal(0.18, Atn2015.calculateCo2Coefficient(95, 400));
		});
		it('should return 0.18 when the baseline is 95 and co2 is 220', function() {
			assert.equal(0.18, Atn2015.calculateCo2Coefficient(95, 220));
		});
		it('should return less than 0.18 when the baseline is 95 and co2 is 219', function() {
			assert.ok(0.18 > Atn2015.calculateCo2Coefficient(95, 219));
		});
		it('should return 0.05 when the baseline is 95 and co2 is 90', function() {
			assert.equal(0.05, Atn2015.calculateCo2Coefficient(95, 90));
		});
	});

	describe('#proratedPrice()', function() {
		it('should return the prorated price on a 1 year old basis (down to 100%)', function() {
			assert.equal(10000, Atn2015.proratedPrice(10000, '2014-01-01', '2014-12-31'));
		});
		it('should return the prorated price on a 2 years old basis (down to 94%)', function() {
			assert.equal(9400, Atn2015.proratedPrice(10000, '2013-01-01', '2014-12-31'));
		});
		it('should return the prorated price on a 3 years old basis (down to 88%)', function() {
			assert.equal(8800, Atn2015.proratedPrice(10000, '2012-01-01', '2014-12-31'));
		});
		it('should return the prorated price on a 4 years old basis (down to 82%)', function() {
			assert.equal(8200, Atn2015.proratedPrice(10000, '2011-01-01', '2014-12-31'));
		});
		it('should return the prorated price on a 5 years old basis (down to 76%)', function() {
			assert.equal(7600, Atn2015.proratedPrice(10000, '2010-01-01', '2014-12-31'));
		});
		it('should return the prorated price on a 6 years old basis (down to 70%)', function() {
			assert.equal(7000, Atn2015.proratedPrice(10000, '2009-01-01', '2014-12-31'));
		});
		it('should return the prorated price on a more than 6 years old basis (down to 70%)', function() {
			assert.equal(7000, Atn2015.proratedPrice(10000, '2008-01-01', '2014-12-31'));
		});
	});

	describe('#proratedUsage()', function() {
		it('should return the prorated price based on a full year usage', function() {
			assert.equal(1000, Atn2015.proratedUsage(1000, '2014-01-01', '2014-12-31'));
		});
		it('should return the prorated price based on the actual number of days of usage during the year', function() {
			assert.equal(504.1095890410959, Atn2015.proratedUsage(1000, '2014-07-01', '2014-12-31'));
		});
		it('should return the prorated price based on the actual number of days of usage during one month', function() {
			assert.equal(84.93150684931507, Atn2015.proratedUsage(1000, '2014-01-01', '2014-01-31'));
		});
	});

});
