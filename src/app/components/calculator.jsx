/** @jsx React.DOM */

var React = require('react/addons');
var moment = require('moment');

module.exports = React.createClass({
	getInitialState: function() {
		var today = moment();
		return {
			carburant: null,
			prix: 0.0,
			emissions: null,
			date_achat: moment(today.year()+'-01-01'),
			date_vente: moment(today.year()+'-12-31')
		};
	},
	render: function() {
		return (
			<form className="form-horizontal">
				<fieldset className="form-group">
					<label htmlFor="carburant" className="control-label col-sm-3">Type de carburant</label>
					<div className="col-sm-6">
						<select name="carburant" id="carburant" defaultValue={this.state.carburant} className="form-control">
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
							<input type="number" name="prix" id="prix" value={this.state.prix} className="form-control" />
							<span className="input-group-addon">€</span>
						</div>
						<p className="help-block">Valeur catalogue, options et TVA comprises, hors remises et ristournes.</p>
					</div>
				</fieldset>

				<fieldset className="form-group">
					<label htmlFor="emissions" className="control-label col-sm-3">Émissions de CO<sup>2</sup></label>
					<div className="col-sm-6">
						<div className="input-group">
							<input type="number" name="emissions" id="emissions" defaultValue={this.state.emissions} className="form-control" />
							<span className="input-group-addon">gr</span>
						</div>
					</div>
				</fieldset>

				<fieldset className="form-group">
					<label htmlFor="date_achat" className="control-label col-sm-3">Véhicule acheté durant l'année</label>
					<div className="col-sm-6">
						<div className="input-group">
							<input type="date" name="date_achat" id="date-achat" defaultValue={this.state.date_achat.format(this.props.dateFormat)} className="form-control" />
							<span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
						</div>
					</div>
				</fieldset>

				<fieldset className="form-group">
					<label htmlFor="date_vente" className="control-label col-sm-3">Véhicule vendu durant l'année</label>
					<div className="col-sm-6">
						<div className="input-group">
							<input type="date" name="date_vente" id="date-vente" defaultValue={this.state.date_vente.format(this.props.dateFormat)} className="form-control" />
							<span className="input-group-addon"><i className="glyphicon glyphicon-calendar"></i></span>
						</div>
					</div>
				</fieldset>
			</form>
		);
	}
});