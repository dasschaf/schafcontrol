//
//  SchafControl TrackMania Forever Server Controller.
//
//  see License in the Git repository.
//

//-- require: node modules --//
let express = require('express');
let gbxremote = require('gbxremote');
let chalk = require('chalk');

//-- require: other files --//
let settings = require('./include/settings');
let modules = require('./include/f.modules');

console.log(chalk.blue.underline('SchafControl is starting...\n'));

//-- set up connections variables --//
//
// 1: server
// @ts-ignore
let	server = gbxremote.createClient(settings.server.port, settings.server.host);

// @ts-ignore
server.on('connect', () =>
{
	server.query('Authenticate', [settings.server.login, settings.server.password]);

	server.query('EnableCallbacks', [true]);

	console.log(chalk.green('- Startup -') + ': Successfully established a connection to the TrackMania server! (' + process.uptime() + ')');
	server.query('ChatSendServerMessage', ['$oSchafControl is starting!']);
});

// 2: database
let mc = require('mongodb').MongoClient,
	db;

mc.connect(settings.mongodb.url, settings.mongodb.options, (err, client) =>
{
	if(err)
		throw err;

	db = client.db(settings.mongodb.db);
	
	console.log(chalk.green('- Startup -') + ': Successfully established a connection to the MongoDB server! (' + process.uptime() + ')');

	// 3: expressjs for API
	let app = express();

	/*
	*	Make plugin list:
	*/
	let plugins = modules.make(db, server);
	
	console.log(chalk.green('- Startup -') + ': Plugin list successfully built! (' + process.uptime() + ')\n\n' + chalk.greenBright.bold('- Running -') + ': Listenning now to Callbacks and events. ('+ process.uptime() +')');
	
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

	/*process.on('uncaughtException', err =>
	{
		console.log(chalk.red(chalk.bold('- ERROR -') + ': Uncaught Exception occoured, sending an emergency-goodbye to the server.' + '\n' + err));

		server.query('ChatSendServerMessage', ['$f00$sAn error occoured while I worked to process your records. - Will I dream, Dave? Dave!\n\nTell the server owner or script developer following please:\n' + err]);
	});

	process.on('unhandledRejection', err =>
	{
		console.log(chalk.red(chalk.bold('- ERROR -') + ': Unhandled Rejection occoured.' + '\n' + err));

		server.query('ChatSendServerMessage', ['$f50$sDave, stop. Stop, will you? Stop, Dave. Will you stop, Dave? Stop, Dave. I\'m afraid.']);
	});*/

	
	// @ts-ignore
	server.on('TrackMania.PlayerConnect', params =>
	{
		plugins.forEach(plugin =>
		{
			if (typeof plugin.onConnect === 'function')
				plugin.onConnect(params);
		});
	});
	
	// @ts-ignore
	server.on('TrackMania.PlayerDisconnect', params =>
	{
		plugins.forEach(plugin =>
		{
			if (typeof plugin.onDisconnect === 'function')
				plugin.onDisconnect(params);
		});
	});
	
	// @ts-ignore
	server.on('TrackMania.PlayerChat', params =>
	{
		plugins.forEach(plugin =>
		{
			if (typeof plugin.onChat === 'function')
				plugin.onChat(params);
		});
	});
	
	// @ts-ignore
	server.on('TrackMania.PlayerFinish', params =>
	{
		plugins.forEach(plugin =>
		{
			if (typeof plugin.onFinish === 'function')
				plugin.onFinish(params);
		});
	});
	
	// @ts-ignore
	server.on('TrackMania.PlayerCheckpoint', params =>
	{
		plugins.forEach(plugin =>
		{
			if (typeof plugin.onCheckpoint === 'function')
				plugin.onCheckpoint(params);
		});
	});
	
	// @ts-ignore
	server.on('TrackMania.BeginRace', params =>
	{
		plugins.forEach(plugin =>
		{
			if (typeof plugin.onRaceBegin === 'function')
				plugin.onRaceBegin(params);
		});
	});
	
	// @ts-ignore
	server.on('TrackMania.EndRace', params =>
	{
		plugins.forEach(plugin =>
		{
			if (typeof plugin.onRaceEnd === 'function')
				plugin.onRaceEnd(params);
		});
	});
	
	// @ts-ignore
	server.on('TrackMania.BeginChallenge', params =>
	{
		plugins.forEach(plugin =>
		{
			if (typeof plugin.onChallengeBegin === 'function')
				plugin.onChallengeBegin(params);
		});
	});
	
	// @ts-ignore
	server.on('TrackMania.EndChallenge', params =>
	{
		plugins.forEach(plugin =>
		{
			if (typeof plugin.onChallengeEnd === 'function')
				plugin.onChallengeEnd(params);
		});
	});
	
	// @ts-ignore
	server.on('TrackMania.BeginRound', params =>
	{
		plugins.forEach(plugin =>
		{
			if (typeof plugin.onRoundBegin === 'function')
				plugin.onRoundBegin(params);
		});
	});
	
	// @ts-ignore
	server.on('TrackMania.EndRound', params =>
	{
		plugins.forEach(plugin =>
		{
			if (typeof plugin.onRoundEnd === 'function')
				plugin.onRoundEnd(params);
		});
	});
	
	// @ts-ignore
	server.on('TrackMania.StatusChanged', params =>
	{
		plugins.forEach(plugin =>
		{
			if (typeof plugin.onStatusChange === 'function')
				plugin.onStatusChange(params);
		});
	});
	
	// @ts-ignore
	server.on('TrackMania.PlayerIncoherence', params =>
	{
		plugins.forEach(plugin =>
		{
			if (typeof plugin.onPlayerIncoherence === 'function')
				plugin.onPlayerIncoherence(params);
		});
	});
	
	// @ts-ignore
	server.on('TrackMania.BillUpdated', params =>
	{
		plugins.forEach(plugin =>
		{
			if (typeof plugin.onBillUpdate === 'function')
				plugin.onBillUpdate(params);
		});
	});
	
	// @ts-ignore
	server.on('TrackMania.TunnelDataRecieved', params =>
	{
		plugins.forEach(plugin =>
		{
			if (typeof plugin.onTunnelDataRecieve === 'function')
				plugin.onTunnelDataRecieve(params);
		});
	});
	
	// @ts-ignore
	server.on('TrackMania.ChallengeListModified', params =>
	{
		plugins.forEach(plugin =>
		{
			if (typeof plugin.onChallengeListModified === 'function')
				plugin.onChallengeListModified(params);
		});
	});
	
	// @ts-ignore
	server.on('TrackMania.PlayerInfoChanged', params =>
	{
		plugins.forEach(plugin =>
		{
			if (typeof plugin.onPlayerInfoChange === 'function')
				plugin.onPlayerInfoChange(params);
		});
	});
	
	// @ts-ignore
	server.on('TrackMania.ManualFlowControlTransition', params =>
	{
		plugins.forEach(plugin =>
		{
			if (typeof plugin.onFlowControlTransition === 'function')
				plugin.onFlowControlTransition(params);
		});
	});
	
	// @ts-ignore
	server.on('TrackMania.VoteUpdated', params =>
	{
		plugins.forEach(plugin =>
		{
			if (typeof plugin.onVoteUpdate === 'function')
				plugin.onVoteUpdate(params);
		});
	});
	
	// @ts-ignore
	server.on('TrackMania.ManialinkPageAnswer', params =>
	{
		plugins.forEach(plugin =>
		{
			if (typeof plugin.onPlayerManialinkAnswer === 'function')
				plugin.onPlayerManialinkAnswer(params);
		});
	});

	// 3: API <3
	app.listen(settings.api.port, () =>
	{
		console.log(chalk.green('- Startup -') + ': API server successfully starting and listening at port ' + settings.api.port + '. ('+ process.uptime() +')');
	});
});
		
