var moment = require('moment');

module.exports = {
	minValue: 1250.00,
	priceYearlyDiminution: 0.06,
	minPriceCoefficient: 0.70,

	// TODO: extract yearly based values as Object properties
	calculate: function(fuelType, price, co2, firstRegistrationDate, sellDate) {
		// TODO: use buy_date & sell_date for prorata
		var atn = this.priceCoefficient(price, firstRegistrationDate, sellDate) * this.co2Coefficient(fuelType, co2) * 6/7;
		if(atn < this.minValue) {
			return this.minValue;
		}
		return atn;
	},
	co2Coefficient: function(fuelType, co2) {
		if(fuelType === 'gazoil') {
			return this.calculateCo2Coefficient(95, co2);
		} else { // essence, lpg, natural gaz
			return this.calculateCo2Coefficient(116, co2);
		}
	},
	priceCoefficient: function(price, firstRegistrationDate, sellDate) {
		var diff = Math.ceil(moment(sellDate).diff(firstRegistrationDate, 'months', true)) - 12;
		var aggr = price;
		var i = 1.0;
		var coef = 1.0;
		while(diff > 0 && coef >= this.minPriceCoefficient) {
			coef = coef - this.priceYearlyDiminution;
			aggr = aggr + (price * coef);
			diff = diff - 12;
			i++;
		}
		return aggr / i;
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