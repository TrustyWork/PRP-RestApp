const nconf = require('nconf');
const path = require( 'path');

nconf.argv()
	.env()
	.file({file: path.join( __dirname, 'appconfig.json')});

module.exports = nconf;