//
//  SchafControl
//  MongoDB Connection file
//
//  used to provide a working MySQL Object in any file via
//  let MongoDB = require('./include/c.mongodb.js');
//

//-- require: node modules --//
let gbxremote = require('gbxremote');


//-- require: other files --//
let settings = require('./settings.js');


let server = gbxremote.createClient(settings.server.port, settings.server.host);

server.on('connect', () =>
{
	server.query('Authenticate', [settings.server.login, settings.server.password]).then(result =>
	{
		server.query('EnableCallbacks', [true]).then(result =>
		{
			module.exports.server = server;
		});


	}).catch(error =>
	{
		throw error;
	});

});