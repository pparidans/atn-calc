var assert = require('assert');
var Atn2015 = require('../../../src/app/models/atn_2015.js');

describe('Atn2015', function() {

	describe('#calculate()', function() {
		it('should return 1250 when price is 10000, fuel is [essence] and co2 is 100', function() {
			assert.equal(1250, Atn2015.calculate('essence', 10000, 100, null, null));
		});
	});

	describe('#co2Coefficient()', function() {
		it('should return 0.055 when the fuel is [gazoil] and co2 is 95', function() {
			assert.equal(0.055, Atn2015.co2Coefficient('gazoil', 95));
		});
		it('should return 0.055 when the fuel is [essence] and co2 is 115', function() {
			assert.equal(0.055, Atn2015.co2Coefficient('essence', 115));
		});
		it('should return more than 0.055 when the fuel is [gazoil] and co2 is 115', function() {
			assert.notEqual(0.055, Atn2015.co2Coefficient('gazoil', 115));
		});
	});

	describe('#calculateCo2Coefficient()', function() {
		it('should return 0.055 when the baseline is 95 and co2 is 90', function() {
			assert.equal(0.055, Atn2015.calculateCo2Coefficient(95, 90));
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
			assert.notEqual(0.18, Atn2015.calculateCo2Coefficient(95, 219));
		});
	});

});