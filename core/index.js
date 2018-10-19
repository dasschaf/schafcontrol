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
		
		console.log('- Startup -: Plugin list successfully built! (' + process.uptime() + ')\n\n- Running -: Listenning now to Callbacks and events. ('+ process.uptime() +')');
		
		/*
		 * TrackMania Server Callback Handling:
		 * (per plugin)
		 */
		
		// logging purposes:
		/*
		server.on('callback', (method, params) =>
		{
			console.log('- Running -: Callback type \'' + method + '\' triggered. (' + process.uptime() + ')');
		});*/
		
		server.on('TrackMania.PlayerConnect', params =>
		{
			plugins.forEach(plugin =>
			{
				if (typeof plugin.onConnect === 'function')
					plugin.onConnect(params);
			});
		});
		
		server.on('TrackMania.PlayerDisconnect', params =>
		{
			plugins.forEach(plugin =>
			{
				if (typeof plugin.onDisconnect === 'function')
					plugin.onDisconnect(params);
			});
		});
		
		server.on('TrackMania.PlayerChat', params =>
		{
			plugins.forEach(plugin =>
			{
				if (typeof plugin.onChat === 'function')
					plugin.onChat(params);
			});
		});
		
		server.on('TrackMania.PlayerFinish', params =>
		{
			plugins.forEach(plugin =>
			{
				if (typeof plugin.onFinish === 'function')
					plugin.onFinish(params);
			});
		});
	});

