
//
// SchafControl sample plugin
//
// it actually doesn't do anything...
//

class plugin
{
	constructor()
	{
		
		this.name = 'Admin - Add Map';
		this.desc = 'Sample plugin providing a bare structure to work with for developers. It doesn\'t do anything...';

		this.request = require('request');
		this.fs = require('fs');
		this.settings = require('../include/settings');
		this.utilities = require('../include/f.utilities');
		this.dictionary = require('../include/dictionary');
		this.admin = require('../include/f.admin')
		
		this.chalk = require('chalk');

		//this.isAdmin = require('../include/f.admin').isAdmin;

		this.requiredConnections = 
		{
			server: true,		// 1st argument
			database: true
		};

	}

	onChat (params)
	{
		// params:
		// [0] int   : player UId
		// [1] string: login
		// [2] string: message
		// [3] bool  : is Command?

		if (!params[3])
			return;

		let command = params[2].split(' '),
			login = params[1],
			server = this.conns['server'],
			db = this.conns['db'],
			request = this.request,
			fs = this.fs,
			settings = this.settings,
			utilities = this.utilities;

		// check for admin:

		if (command.shift() === '/admin')
			{
				let title;

				if (!this.admin.check(login))
					return;

				else
					title = this.admin.getTitle(login)

				let task = command.shift();

				if (task === 'add')
				{
					let mode = command[0],
						file = command[1],
						para = command[2];

					if (mode === 'tmx')
					{
						// default: united site
						// ... selected when last parameter is omitted
						let id = file,
							site = 'united';

						if (para === 'tmn')
							site = 'nations';

						else if (para === 'tmo')
							site = 'original';

						else if (para === 'tmnf')
							site = 'tmnforever';

						else if (para === 'tms')
							site = 'sunrise';

						// assemble link:
						let link = 'https://' + site + '.tm-exchange.com/get.aspx?action=trackgbx&id=' + id;

						// URL request to the specified united site for said track:
						request({url: link, encoding: 'binary'}, (error, response, body) =>
							{
								// if error: throw error.
								if (error) throw error;
								
								// wait for response to successfully finish
								if (response && response.statusCode === 200)
								{

									// get tracks directory from the server to write the downloaded track into the fitting directory
									server.query('GetTracksDirectory').then(result =>
									{
										// get variables right
										var targetDir = result + '/TMX/';
										var absolute_path = targetDir + id + '.Challenge.Gbx';
										var relative_path = '/TMX/' + id + '.Challenge.Gbx';

										// check if exists, if not, create
										if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);

										// write file.
										fs.writeFileSync(absolute_path, body, 'binary');

										// insert track to the tracklist
										server.query('InsertChallenge', [relative_path])
										.then(result =>
											{

												// get the metadata of the track from the server in order to add the track to the database
												server.query('GetChallengeInfo', [relative_path])
												.then(result =>
													{
														// convert ChallengeInfo object of the server into a object with proper formatting
														let challenge = this.makeChObj(result, 'tmx');
														
														// add track to database with track ID
														// query:
														//	- get all tracks
														//  - sort descending by MongoDB UID, the newest object will be first
														//  - only get one document and add it to an array (?!)
														db.collection('tracks').find({}).sort({_id: -1}).limit(1).toArray((err, res) => {
															// add track ID to the object
															challenge.nr = res[0].nr + 1;
															
															// insert to database
															db.collection('tracks').insertOne(challenge);
														});
														
														// get player information from database
														db.collection('players').findOne({login: login})
														.then(document =>
															{
																let player = document;

																// get nickname and title to format the message
																let title = this.settings.masteradmin.login === login ? this.settings.masteradmin.title : player.title;
																let nickname = player.nickname;

																// fill in message placeholders
																let message = utilities.fill(this.dictionary.admin_add_tmx,
																	{
																		title: title,
																		player: nickname,
																		track: challenge.name,
																		method: 'from TMX'
																	});

																// send message, logging
																server.query('ChatSendServerMessage', [message]);
																console.log(this.chalk.greenBright('- Running -') + `: ${login} added ${challenge.name} from TMX to the tracklist`);
															});
													});
											});
									});
								}
							});
					} // -- tmx --//

					if (mode === 'url')
					{
						// get link from the passed argument
						let link = file;

						// send HTTP request to download the file
						request({url: link, encoding: 'binary'}, (error, response, body) =>
							{
								// if error: throw error.
								if (error) throw error;
								
								// once file downloaded & everything OK:
								if (response && response.statusCode === 200)
								{

									// get tracks directory from the server to put the track into it
									server.query('GetTracksDirectory').then(result =>
									{
										let spliturl = link.split('/');
										let fn = spliturl[spliturl.length - 1];

										// get variables right
										var targetDir = result + '/URL/';
										var absolute_path = targetDir + fn + '.Challenge.Gbx';
										var relative_path = '/URL/' + fn + '.Challenge.Gbx';

										// check if exists, if not, create
										if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);

										// write file.
										fs.writeFileSync(absolute_path, body, 'binary');

										// add track to tracklist
										server.query('InsertChallenge', [relative_path])
										.then(result =>
											{
												// get challenge info for metadata
												server.query('GetChallengeInfo', [relative_path])
												.then(result =>
													{

														// create MongoDB document
														let challenge = this.makeChObj(result, 'url');

														// get the new ID for the track, get latest document and get the number from it, add one for the new ID
														db.collection('tracks').find({}).sort({_id: -1}).limit(1).toArray((err, res) => {
															challenge.nr = res[0].nr + 1;

															// add track to database
															db.collection('tracks').insertOne(challenge);
														});
														
														// get player nickname and title to format chat message
														db.collection('players').findOne({login: login})
														.then(document =>
															{
																let player = document;

																let title = player.title,
																	nickname = player.nickname;

																let message = utilities.fill(this.dictionary.admin_add_tmx,
																	{
																		title: title,
																		player: nickname,
																		track: challenge.name,
																		method: 'from URL'
																	});
																
																// send chat message & logging
																server.query('ChatSendServerMessage', [message]);
																console.log(this.chalk.greenBright('- Running -') + `: ${login} added ${challenge.name} from URL to the tracklist`);
															});
													});
											});
									});
								}
							});
					} //-- url --//

					if (mode === 'local')
					{
						server.query('GetTracksDirectory')
						.then(directory =>
							{
								let path = directory + file;

								server.query('InsertChallenge', [path])
								.then(result =>
									{
										server.query('GetChallengeInfo', [path],
										chinfo =>
										{
											let challenge = this.makeChObj(chinfo);

											db.collection('tracks').find({}).sort({_id: -1}).limit(1).toArray((err, res) => {
															challenge.nr = res[0].nr + 1;

															db.collection('tracks').insertOne(challenge);
														});
														
											db.collection('players').findOne({login: login})
											.then(document =>
												{
													let player = document;

													let title = player.title,
														nickname = player.nickname;

													let message = utilities.fill(this.dictionary.admin_add_tmx,
														{
															title: title,
															player: nickname,
															track: challenge.name,
															method: 'from local file'
														});

													server.query('ChatSendServerMessage', [message]);
													console.log(this.chalk.greenBright('- Running -') + `: ${login} added ${challenge.name} from local file to the tracklist`);
												});
										});
									});
							});
					} //-- local --//
				}

				if (task === 'writetracklist')
				{
					let tracklist = 'MatchSettings/tracklist.txt';

					server.query('SaveMatchSettings', [tracklist]);

					server.query('ChatSendServerMessageToLogin', [this.dictionary.admin_writetracklist, login]);
					console.log(this.chalk.greenBright('- Running -') + `: ${login} saved the tracklist.`);
				}
			}
	}

	makeChObj (challenge, source)
	{
		let obj =
		{
			name: challenge.Name,
			uid: challenge.UId,
			filename: challenge.FileName,
			author: challenge.Author,
			mood: challenge.Mood,
			medals:
			[
				challenge.AuthorTime,
				challenge.GoldTime,
				challenge.SilverTime,
				challenge.BronzeTime
			],
			coppers: challenge.CopperPrice,
			isMultilap: challenge.LapRace,
			laps: challenge.NbLaps,
			checkpoints: challenge.NbCheckpoints,
			source: source
		};

		return obj;
	}
	
}

module.exports = new plugin();