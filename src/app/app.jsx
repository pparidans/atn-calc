/** @jsx React.DOM */

var React = require('react/addons');
var Calculator = require('./components/calculator.jsx');

React.render(<Calculator dateFormat="DD-MM-YYYY" />, document.querySelector('#app-container'));