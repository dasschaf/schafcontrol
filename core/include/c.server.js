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


//-- set up connection variables --//
let server;

//-- set up connection to TMF server --//
module.exports.connect = () =>
{
    server = gbxremote.createClient(settings.server.port, settings.server.host);

	server.on('connect', () =>
	{
		server.query('Authenticate', [settings.server.login, settings.server.password]).then(result =>
        {
            server.query('EnableCallbacks', [true]);

		}).catch(error =>
		{
			throw error;
		});

	});
};

module.exports.get = () =>
{
	return server;
};