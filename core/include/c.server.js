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
let server = gbxremote.createClient(settings.server.port, settings.server.host);
let connected = false;

//-- set up connection to TMF server --//
module.exports.connect = () =>
{
	server.on('connect', () =>
	{
		server.query('Authenticate', [settings.server.login, settings.server.password]).then(result =>
		{


		}).catch(error =>
		{
			throw error;
		});

		server.query('EnableCallbacks', [true]).then(result =>
		{
			console.log('- Startup -: Successfully authenticated and Callbacks enabled! (' + process.uptime() + ')');
			connected = true;

		}).catch(error =>
		{
			throw error;
		});
	});
};

module.exports.get = () =>
{
	if (!connected)
	{
		throw new Error('Call .connect(); first -- connection not created yet.');
	}

	return server;
};