//
//  SchafControl TrackMania Forever Server Controller.
//
//  see License in the Git repository.
//

//-- require: node modules --//


//-- require: other files --//
let settings = require('./include/settings');
let modules = require('./include/f.modules');

//-- set up connections variables --//
//
// 1: server
let gbxremote = require('./include/c.server');
let server;

//-- connect --//
gbxremote.connect();
server = gbxremote.get();

//-- log! --//
server.query('ChatSendServerMessage', ["SchafControl is starting ..."]);
console.log('- Startup -: Successfully established a connection pool to the TrackMania Server! (' + process.uptime() + ')');

// 2: database
let db = require('./include/c.mongodb');
db.connect()
	.then(() =>
	{
		console.log('- Startup -: Successfully established a connection to the MongoDB server! (' + process.uptime() + ')');

		/*
		 *	Make plugin list:
		 */

		let plugins = modules.make(db, server);
		console.log('- Startup -: Plugin list successfully built! ' + process.uptime() + ')');
		
		/*
		 * TrackMania Server Callback Handling:
		 * (per plugin)
		 */
		
		server.on('TrackMania.PlayerConnect', params =>
		{
			plugins.forEach(plugin =>
			{
				if (typeof plugin.onConnect === 'function')
					plugin.onConnect(params);
			});
		})

	});

