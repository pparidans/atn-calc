var moment = require('moment');

module.exports = {
	// TODO: extract yearly based values as Object properties
	calculate: function(fuel_type, price, co2, buy_date, sell_date) {
		// TODO: use buy_date & sell_date for prorata
		// TODO: implement coefficientPrice
		var atn = price * this.coefficientCo2(fuel_type, co2) * 6/7;
		var minAtn = 1250;
		if(atn < minAtn) {
			return minAtn;
		}
		return atn;
	},
	coefficientCo2: function(fuel_type, co2) {
		if(fuel_type === 'gazoil') {
			return this.floorCo2Coefficient(95, co2);
		} else { // essence, lpg, natural gaz
			return this.floorCo2Coefficient(116, co2);
		}
	},
	floorCo2Coefficient: function(baseline, co2) {
		// TODO: implement minCoef + degress coef
		var minCoef = 0.055;
		var maxCoef = 0.18;
		if(co2 <= baseline) {
			return minCoef;
		}
		var overflow = co2 - baseline;
		var coef = minCoef + overflow * 0.001;
		if(coef > maxCoef) {
			return maxCoef;
		}
		return coef;
	}
};