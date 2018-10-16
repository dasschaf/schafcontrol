//
//  SchafControl TrackMania Forever Server Controller.
//
//  see License in the Git repository.
//

//-- require: node modules --//


//-- require: other files --//
let settings = require('./include/settings');


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
		 *
		 */

		server.on('TrackMania.PlayerConnect', params =>
		{
			let login = params[0];

			server.query('GetPlayerInfo', [login, 1]).then(result =>
			{
				db.get().collection('players').findOne({login: login}, (error, player) =>
				{
					if (error)
						throw error;

					if (player)
					{
						// player exists:

						db.get().collection('players').updateOne({login: login}, {$set: {joins: player.joins + 1}}, {upsert: true}, (error, result) =>
						{
							if (error)
								throw error;

						});

						server.query('ChatSendServerMessage', ['... player $f00' + result.NickName + '$z$s$fff has joined the server for the $f00' + (player.joins + 1) + '. $fff time!']);
					}

					else
					{
						// player doesn't exist:
						db.get().collection('players').insertOne({login: login, nickname: result.NickName, joins: 1}, (error, result) =>
						{
							if (error)
								throw error;

						});

						server.query('ChatSendServerMessage', ['... player $f00' + result.NickName + '$z$s$fff has joined the server for the $f00' + 1 + '. $fff time!']);
					}
				});
			})
		});
	});

