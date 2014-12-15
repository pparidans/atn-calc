/** @jsx React.DOM */

var React = require('react/addons');

module.exports = React.createClass({
	render: function() {
		return (
			<div className="row">
				<div className="jumbotron col-sm-offset-1 col-sm-8">
					<p>Votre ATN voiture est de&nbsp;:</p>
					<p className="result h1 text-right">
						{this.props.atn} €
					</p>
				</div>
			</div>
		);
	}
});