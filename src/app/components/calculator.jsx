/** @jsx React.DOM */

var React = require('react/addons');

module.exports = React.createClass({
	render: function() {
		return (
			<form className="form-horizontal">
				<fieldset className="form-group">
					<label htmlFor="carburant" className="control-label col-sm-2">Type de carburant</label>
					<div className="col-sm-10">
						<select name="carburant" id="carburant" className="form-control">
							<option>essence</option>
							<option>diesel</option>
							<option>lpg</option>
							<option>gaz naturel</option>
						</select>
					</div>
				</fieldset>

				<fieldset className="form-group">
					<label htmlFor="prix" className="control-label col-sm-2">Prix catalogue</label>
					<div className="col-sm-10">
						<input type="number" name="prix" id="prix" className="form-control" />
						<p className="help-block">Valeur catalogue, options et TVA comprises, hors remises et ristournes.</p>
					</div>
				</fieldset>

				<fieldset className="form-group">
					<label htmlFor="emissions" className="control-label col-sm-2">Émissions de CO<sup>2</sup></label>
					<div className="col-sm-10">
						<input type="number" name="emissions" id="emissions" className="form-control" />
					</div>
				</fieldset>

				<fieldset className="form-group">
					<label htmlFor="date_achat" className="control-label col-sm-2">Véhicule acheté durant l''année</label>
					<div className="col-sm-10">
						<input type="date" name="date_achat" id="date-achat" className="form-control" />
					</div>
				</fieldset>

				<fieldset className="form-group">
					<label htmlFor="date_vente" className="control-label col-sm-2">Véhicule vendu durant l''année</label>
					<div className="col-sm-10">
						<input type="date" name="date_vente" id="date-vente" className="form-control" />
					</div>
				</fieldset>
			</form>
		);
	}
});