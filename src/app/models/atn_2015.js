var moment = require('moment');

module.exports = {
	minValue: 1250.00,
	firstDayOfYear: moment('2014-01-01'),
	lastDayOfYear: moment('2014-12-31'),

	// TODO: extract yearly based values as Object properties
	calculate: function(fuelType, price, co2, firstRegistrationDate, sellDate, usedFrom, usedTo) {
		firstRegistrationDate = firstRegistrationDate || this.firstDayOfYear;
		sellDate = sellDate || this.lastDayOfYear;
		usedFrom = usedFrom || this.firstDayOfYear;
		usedTo = usedTo || this.lastDayOfYear;
		var atn = this.proratedPrice(price, firstRegistrationDate, sellDate) * this.co2Coefficient(fuelType, co2) * 6/7;
		if(atn < this.minValue) {
			atn = this.minValue;
		}
		var usage = this.proratedUsage(atn, usedFrom, usedTo);
		return this.roundTo2Decimals(usage);
	},
	proratedUsage: function(atn, usedFrom, usedTo) {
		var totalDays = this.lastDayOfYear.diff(this.firstDayOfYear, 'days') + 1;
		var daysInYear = moment(usedTo).diff(usedFrom, 'days') + 1;
		return (atn / totalDays) * daysInYear;
	},
	co2Coefficient: function(fuelType, co2) {
		if(fuelType === 'gazoil') {
			return this.calculateCo2Coefficient(91, co2);
		} else { // essence, lpg, natural gaz
			return this.calculateCo2Coefficient(110, co2);
		}
	},
	proratedPrice: function(price, firstRegistrationDate, sellDate) {
		var diff = Math.ceil(moment(sellDate).diff(firstRegistrationDate, 'months', true));
		var coef;
		if(diff <= 12) {
			coef = 1.0;
		} else if(diff >= 13 && diff <= 24) {
			coef = 0.94;
		} else if(diff >= 25 && diff <= 36) {
			coef = 0.88;
		} else if(diff > 37 && diff <= 48) {
			coef = 0.82;
		} else if(diff > 49 && diff <= 60) {
			coef = 0.76;
		} else {
			coef = 0.70;
		}
		return Math.round(price * coef);
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
	},
	roundTo2Decimals: function(value) {
		return Math.round(value*100)/100;
	}
};
