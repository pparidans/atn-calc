/** @jsx React.DOM */

var React = require('react/addons');
var moment = require('moment');
var CalculatorResult = require('./calculator_result.jsx');

module.exports = React.createClass({
	getInitialState: function() {
		var today = moment();
		return {
			carburant: 'essence',
			prix: 0.0,
			emissions: 100,
			date_achat: moment(today.year()+'-01-01'),
			date_vente: moment(today.year()+'-12-31')
		};
	},
	onChangeField: function() {
		this.setState({
			carburant: this.refs.carburant.getDOMNode().value,
			prix: this.refs.prix.getDOMNode().value,
			emissions: this.refs.emissions.getDOMNode().value,
			date_achat: moment(this.refs.date_achat.getDOMNode().value, this.props.dateFormat),
			date_vente: moment(this.refs.date_vente.getDOMNode().value, this.props.dateFormat)
		});
	},
	calculate: function() {
		console.log('calculate : ', this.state);
		console.log(this.props.simulator.calculate(this.state.carburant, this.state.prix, this.state.emissions, this.state.date_achat, this.state.date_vente));
		return this.props.simulator.calculate(this.state.carburant, this.state.prix, this.state.emissions, this.state.date_achat, this.state.date_vente).toFixed(2);
	},
	render: function() {
		return (
			<form className="form-horizontal">
				<CalculatorResult atn={this.calculate()} />

				<fieldset className="form-group">
					<label htmlFor="carburant" className="control-label col-sm-3">Type de carburant</label>
					<div className="col-sm-6">
						<select ref="carburant" id="carburant" defaultValue={this.state.carburant} onChange={this.onChangeField} className="form-control">
							<option></option>
							<option>essence</option>
							<option>diesel</option>
							<option>lpg</option>
							<option>gaz naturel</option>
						</select>
					</div>
				</fieldset>

				<fieldset className="form-group">
					<label htmlFor="prix" className="control-label col-sm-3">Prix catalogue</label>
					<div className="col-sm-6">
						<div className="input-group">
							<input type="number" ref="prix" id="prix" defaultValue={this.state.prix} onChange={this.onChangeField} className="form-control" />
							<span className="input-group-addon">€</span>
						</div>
						<p className="help-block">Valeur catalogue, options et TVA comprises, hors remises et ristournes.</p>
					</div>
				</fieldset>

				<fieldset className="form-group">
					<label htmlFor="emissions" className="control-label col-sm-3">Émissions de CO<sup>2</sup></label>
					<div className="col-sm-6">
						<div className="input-group">
							<input type="number" ref="emissions" id="emissions" defaultValue={this.state.emissions} onChange={this.onChangeField} className="form-control" />
							<span className="input-group-addon">gr</span>
						</div>
					</div>
				</fieldset>

				<fieldset className="form-group">
					<label htmlFor="date_achat" className="control-label col-sm-3">Véhicule acheté durant l'année</label>
					<div className="col-sm-6">
						<div className="input-group">
							<input type="date" ref="date_achat" id="date-achat" defaultValue={this.state.date_achat.format(this.props.dateFormat)} onChange={this.onChangeField} className="form-control" />
							<span className="input-group-addon"><span className="glyphicon glyphicon-calendar"></span></span>
						</div>
					</div>
				</fieldset>

				<fieldset className="form-group">
					<label htmlFor="date_vente" className="control-label col-sm-3">Véhicule vendu durant l'année</label>
					<div className="col-sm-6">
						<div className="input-group">
							<input type="date" ref="date_vente" id="date-vente" defaultValue={this.state.date_vente.format(this.props.dateFormat)} onChange={this.onChangeField} className="form-control" />
							<span className="input-group-addon"><span className="glyphicon glyphicon-calendar"></span></span>
						</div>
					</div>
				</fieldset>
			</form>
		);
	}
});