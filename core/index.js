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
// 1: server
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
		//-- log! --/
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
		
		server.on('TrackMania.PlayerCheckpoint', params =>
		{
			plugins.forEach(plugin =>
			{
				if (typeof plugin.onCheckpoint === 'function')
					plugin.onCheckpoint(params);
			});
		});
		
		server.on('TrackMania.BeginRace', params =>
		{
			plugins.forEach(plugin =>
			{
				if (typeof plugin.onRaceBegin === 'function')
					plugin.onRaceBegin(params);
			});
		});
		
		server.on('TrackMania.EndRace', params =>
		{
			plugins.forEach(plugin =>
			{
				if (typeof plugin.onRaceEnd === 'function')
					plugin.onRaceEnd(params);
			});
		});
		
		server.on('TrackMania.BeginChallenge', params =>
		{
			plugins.forEach(plugin =>
			{
				if (typeof plugin.onChallengeBegin === 'function')
					plugin.onChallengeBegin(params);
			});
		});
		
		server.on('TrackMania.EndChallenge', params =>
		{
			plugins.forEach(plugin =>
			{
				if (typeof plugin.onChallengeEnd === 'function')
					plugin.onChallengeEnd(params);
			});
		});
		
		server.on('TrackMania.BeginRound', params =>
		{
			plugins.forEach(plugin =>
			{
				if (typeof plugin.onRoundBegin === 'function')
					plugin.onRoundBegin(params);
			});
		});
		
		server.on('TrackMania.EndRound', params =>
		{
			plugins.forEach(plugin =>
			{
				if (typeof plugin.onRoundEnd === 'function')
					plugin.onRoundEnd(params);
			});
		});
		
		server.on('TrackMania.StatusChanged', params =>
		{
			plugins.forEach(plugin =>
			{
				if (typeof plugin.onStatusChange === 'function')
					plugin.onStatusChange(params);
			});
		});
		
		server.on('TrackMania.PlayerIncoherence', params =>
		{
			plugins.forEach(plugin =>
			{
				if (typeof plugin.onPlayerIncoherence === 'function')
					plugin.onPlayerIncoherence(params);
			});
		});
		
		server.on('TrackMania.BillUpdated', params =>
		{
			plugins.forEach(plugin =>
			{
				if (typeof plugin.onBillUpdate === 'function')
					plugin.onBillUpdate(params);
			});
		});
		
		server.on('TrackMania.TunnelDataRecieved', params =>
		{
			plugins.forEach(plugin =>
			{
				if (typeof plugin.onTunnelDataRecieve === 'function')
					plugin.onTunnelDataRecieve(params);
			});
		});
		
		server.on('TrackMania.ChallengeListModified', params =>
		{
			plugins.forEach(plugin =>
			{
				if (typeof plugin.onChallengeListModified === 'function')
					plugin.onChallengeListModified(params);
			});
		});
		
		server.on('TrackMania.PlayerInfoChanged', params =>
		{
			plugins.forEach(plugin =>
			{
				if (typeof plugin.onPlayerInfoChange === 'function')
					plugin.onPlayerInfoChange(params);
			});
		});
		
		server.on('TrackMania.ManualFlowControlTransition', params =>
		{
			plugins.forEach(plugin =>
			{
				if (typeof plugin.onFlowControlTransition === 'function')
					plugin.onFlowControlTransition(params);
			});
		});
		
		server.on('TrackMania.VoteUpdated', params =>
		{
			plugins.forEach(plugin =>
			{
				if (typeof plugin.onVoteUpdate === 'function')
					plugin.onVoteUpdate(params);
			});
		});
		
		server.on('TrackMania.ManialinkPageAnswer', params =>
		{
			plugins.forEach(plugin =>
			{
				if (typeof plugin.onPlayerManialinkAnswer === 'function')
					plugin.onPlayerManialinkAnswer(params);
			});
		});
		
	});

