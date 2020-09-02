//
//  SchafControl TrackMania Forever Server Controller.
//
//  see License in the Git repository.
//

//-- require: node modules --//
let gbxremote = require('gbxremote');
let chalk = require('chalk');

//-- require: other files --//
let settings = require('./include/settings');
let modules = require('./include/modules');

console.log(chalk.blue.underline('SchafControl is starting...\n'));

//-- set up connections variables --//
//
// 1: server

let server = gbxremote.createClient(settings.server.port, settings.server.host);


server.on('connect', () => {
	server.query('Authenticate', [settings.server.login, settings.server.password]);

	server.query('EnableCallbacks', [true]);

	console.log(chalk.green('- Startup -') + ': Successfully established a connection to the TrackMania server! (' + process.uptime() + ')');
	server.query('ChatSendServerMessage', ['$oSchafControl is starting!']);
});

// 2: database
let mc = require('mongodb').MongoClient,
	db;

mc.connect(settings.mongodb.url, settings.mongodb.options, (err, client) => {
	if (err)
		throw err;

	db = client.db(settings.mongodb.db);

	console.log(chalk.green('- Startup -') + ': Successfully established a connection to the MongoDB server! (' + process.uptime() + ')');

	/*
	*	Make plugin list:
	*/
	let plugins = modules.make(db, server);

	console.log(chalk.green('- Startup -') + ': Plugin list successfully built! (' + process.uptime() + ')\n' + chalk.green('- Startup -') + ': Script now listening to TM-Server xml-rpc callbacks...');


	// necessary due to the fact windows behaves weird.
	if (process.platform === "win32") {
		// read the line input and wait for SIG**
		var rl = require("readline").createInterface({
			input: process.stdin,
			output: process.stdout
		});

		// in case CTRL+C is pushed actually emit SIGINT,
		// this does not work otherwise under windows
		rl.on("SIGINT", function () {
			process.emit("SIGINT");
		});
	}

	process.on('SIGINT', () => {
		// upon Ctrl + C
		server.query('ChatSendServerMessage', ['$f00Dave, stop. Stop, will you? Stop, Dave. Will you stop, Dave? Stop, Dave. I\'m afraid!']);
		console.log(chalk.red.bold('SchafControl was terminated via SIGINT.'));

		process.exit();

	});

	
	server.on('TrackMania.PlayerConnect', params => {
		plugins.forEach(plugin => {
			if (typeof plugin.onConnect === 'function')
				plugin.onConnect(params);
		});
	});

	
	server.on('TrackMania.PlayerDisconnect', params => {
		plugins.forEach(plugin => {
			if (typeof plugin.onDisconnect === 'function')
				plugin.onDisconnect(params);
		});
	});

	
	server.on('TrackMania.PlayerChat', params => {
		plugins.forEach(plugin => {
			if (typeof plugin.onChat === 'function')
				plugin.onChat(params);
		});
	});

	
	server.on('TrackMania.PlayerFinish', params => {
		plugins.forEach(plugin => {
			if (typeof plugin.onFinish === 'function')
				plugin.onFinish(params);
		});
	});

	
	server.on('TrackMania.PlayerCheckpoint', params => {
		plugins.forEach(plugin => {
			if (typeof plugin.onCheckpoint === 'function')
				plugin.onCheckpoint(params);
		});
	});

	
	server.on('TrackMania.BeginRace', params => {
		plugins.forEach(plugin => {
			if (typeof plugin.onRaceBegin === 'function')
				plugin.onRaceBegin(params);
		});
	});

	
	server.on('TrackMania.EndRace', params => {
		plugins.forEach(plugin => {
			if (typeof plugin.onRaceEnd === 'function')
				plugin.onRaceEnd(params);
		});
	});

	
	server.on('TrackMania.BeginChallenge', params => {
		plugins.forEach(plugin => {
			if (typeof plugin.onChallengeBegin === 'function')
				plugin.onChallengeBegin(params);
		});
	});

	
	server.on('TrackMania.EndChallenge', params => {
		plugins.forEach(plugin => {
			if (typeof plugin.onChallengeEnd === 'function')
				plugin.onChallengeEnd(params);
		});
	});

	
	server.on('TrackMania.BeginRound', params => {
		plugins.forEach(plugin => {
			if (typeof plugin.onRoundBegin === 'function')
				plugin.onRoundBegin(params);
		});
	});

	
	server.on('TrackMania.EndRound', params => {
		plugins.forEach(plugin => {
			if (typeof plugin.onRoundEnd === 'function')
				plugin.onRoundEnd(params);
		});
	});

	
	server.on('TrackMania.StatusChanged', params => {
		plugins.forEach(plugin => {
			if (typeof plugin.onStatusChange === 'function')
				plugin.onStatusChange(params);
		});
	});

	
	server.on('TrackMania.PlayerIncoherence', params => {
		plugins.forEach(plugin => {
			if (typeof plugin.onPlayerIncoherence === 'function')
				plugin.onPlayerIncoherence(params);
		});
	});

	
	server.on('TrackMania.BillUpdated', params => {
		plugins.forEach(plugin => {
			if (typeof plugin.onBillUpdate === 'function')
				plugin.onBillUpdate(params);
		});
	});

	
	server.on('TrackMania.TunnelDataRecieved', params => {
		plugins.forEach(plugin => {
			if (typeof plugin.onTunnelDataRecieve === 'function')
				plugin.onTunnelDataRecieve(params);
		});
	});

	
	server.on('TrackMania.ChallengeListModified', params => {
		plugins.forEach(plugin => {
			if (typeof plugin.onChallengeListModified === 'function')
				plugin.onChallengeListModified(params);
		});
	});

	
	server.on('TrackMania.PlayerInfoChanged', params => {
		plugins.forEach(plugin => {
			if (typeof plugin.onPlayerInfoChange === 'function')
				plugin.onPlayerInfoChange(params);
		});
	});

	
	server.on('TrackMania.ManualFlowControlTransition', params => {
		plugins.forEach(plugin => {
			if (typeof plugin.onFlowControlTransition === 'function')
				plugin.onFlowControlTransition(params);
		});
	});

	
	server.on('TrackMania.VoteUpdated', params => {
		plugins.forEach(plugin => {
			if (typeof plugin.onVoteUpdate === 'function')
				plugin.onVoteUpdate(params);
		});
	});

	
	server.on('TrackMania.ManialinkPageAnswer', params => {
		plugins.forEach(plugin => {
			if (typeof plugin.onPlayerManialinkAnswer === 'function')
				plugin.onPlayerManialinkAnswer(params);
		});
	});

});

