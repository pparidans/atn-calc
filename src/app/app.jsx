/** @jsx React.DOM */

var React = require('react/addons');
var Calculator = require('./components/calculator.jsx');
var Atn2015 = require('./models/atn_2015.js');

React.render(<Calculator dateFormat="DD-MM-YYYY" simulator={Atn2015} />, document.querySelector('#app-container'));