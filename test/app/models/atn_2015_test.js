var assert = require('assert');
var moment = require('moment');
var Atn2015 = require('../../../src/app/models/atn_2015.js');

describe('Atn2015', function() {

	describe('#calculate()', function() {
		it('should return 1250 when price is 10000, fuel is [essence] and co2 is 100', function() {
			assert.equal(1250, Atn2015.calculate('essence', 10000, 100, '2014-01-01', '2014-12-31'));
		});
	});

	describe('#co2Coefficient()', function() {
		it('should return 0.055 when the fuel is [gazoil] and co2 is 95', function() {
			assert.equal(0.055, Atn2015.co2Coefficient('gazoil', 95));
		});
		it('should return 0.055 when the fuel is [essence] and co2 is 115', function() {
			assert.equal(0.055, Atn2015.co2Coefficient('essence', 116));
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

	describe('#priceCoefficient()', function() {
		it('should return 10000 when the price is 10000 and first registration is 1 year (100%) before sell date', function() {
			assert.equal(10000, Atn2015.priceCoefficient(10000, moment('2014-01-01'), moment('2014-12-31')));
		});
		it('should return 9700 when the price is 10000 and first registration is 2 years (94%) before sell date', function() {
			assert.equal(9700, Atn2015.priceCoefficient(10000, moment('2013-01-01'), moment('2014-12-31')));
		});
		it('should return 9400 when the price is 10000 and first registration is 3 years (88%) before sell date', function() {
			assert.equal(9400, Atn2015.priceCoefficient(10000, moment('2012-01-01'), moment('2014-12-31')));
		});
		it('should return 9100 when the price is 10000 and first registration is 4 years (82%) before sell date', function() {
			assert.equal(9100, Atn2015.priceCoefficient(10000, moment('2011-01-01'), moment('2014-12-31')));
		});
		it('should return 8800 when the price is 10000 and first registration is 5 years (76%) before sell date', function() {
			assert.equal(8800, Atn2015.priceCoefficient(10000, moment('2010-01-01'), moment('2014-12-31')));
		});
		it('should return 8500 when the price is 10000 and first registration is 6 years (70%) before sell date', function() {
			assert.equal(8500, Atn2015.priceCoefficient(10000, moment('2009-01-01'), moment('2014-12-31')));
		});
		it('should return 8500 when the price is 10000 and first registration is more than 6 years (70%) before sell date', function() {
			assert.equal(8500, Atn2015.priceCoefficient(10000, moment('2008-01-01'), moment('2014-12-31')));
		});
	});

});