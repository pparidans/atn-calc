var moment = require('moment');

module.exports = {
	minValue: 1250.00,

	// TODO: extract yearly based values as Object properties
	calculate: function(fuel_type, price, co2, buy_date, sell_date) {
		// TODO: use buy_date & sell_date for prorata
		// TODO: implement coefficientPrice
		var atn = price * this.co2Coefficient(fuel_type, co2) * 6/7;
		if(atn < this.minValue) {
			return this.minValue;
		}
		return atn;
	},
	co2Coefficient: function(fuel_type, co2) {
		if(fuel_type === 'gazoil') {
			return this.calculateCo2Coefficient(95, co2);
		} else { // essence, lpg, natural gaz
			return this.calculateCo2Coefficient(116, co2);
		}
	},
	calculateCo2Coefficient: function(baseline, co2) {
		var baseCoef = 0.055;
		var minCoef = 0.04;
		var maxCoef = 0.18;

		var coef = baseCoef + (co2 - baseline) * 0.001;
		if(coef > maxCoef) {
			return maxCoef;
		}
		if(coef < minCoef) {
			return minCoef;
		}
		return coef;
	}
};