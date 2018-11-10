
//
// SchafControl sample plugin
//
// it actually doesn't do anything...
//

class plugin
{
	constructor(db, server)
	{
		this.db = db;
		this.server = server;
		
		this.name = 'Sample Plugin';
		this.desc = 'Sample plugin providing a bare structure to work with for developers. It doesn\'t do anything...';

		this.request = require('request');
		this.fs = require('fs');
		this.settings = require('../include/settings');
		this.utilities = require('../include/f.utilities');
		this.dictionary = require('../include/dictionary');
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
			server = this.server,
			db = this.db,
			request = this.request,
			fs = this.fs,
			settings = this.settings,
			utilities = this.utilities;

		// check for admin:

		if (command.shift() == '/admin')
			{
				let task = command.shift()

				if (task === 'add')
				{
					let mode = command[0],
						file = command[1],
						para = command[2];

					if (mode === 'tmx')
					{
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

						let link = 'https://' + site + '.tm-exchange.com/get.aspx?action=trackgbx&id=' + id;

						request({url: link, encoding: 'binary'}, (error, response, body) =>
							{
								// if error: throw error.
								if (error) throw error;
								
								if (response && response.statusCode == 200)
								{
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

										server.query('InsertChalenge', [relative_path])
										.then(result =>
											{
												server.query('GetChallengeInfo', [relative_path])
												.then(result =>
													{
														let challenge = 
														{
															name: result.Name,
															uid: result.UId,
															filename: result.FileName,
															author: result.Author,
															mood: result.Mood,
															medals:
															[
																result.AuthorTime,
																result.GoldTime,
																result.SilverTime,
																result.BronzeTime
															],
															coppers: result.CopperPrice,
															isMultilap: result.LapRace,
															laps: result.NbLaps,
															checkpoints: result.NbCheckpoints,
															source: 'TMX'
														};

														db.get().collection('tracks').insertOne(challenge);
														
														db.get().collection('players').findOne({login: login})
														.then(document =>
															{
																let player = document.value;

																let title = player.title,
																	nickname = player.nickname;

																let message = utilities.fill(this.dictionary.admin_add_tmx,
																	{
																		title: title,
																		player: nickname,
																		track: challenge.name,
																		method: 'from TMX'
																	});

																server.query('ChatSendServerMessage', [message]);
															});
													});
											});
									});
								}
							});
					} // -- tmx --//

					if (mode === 'url')
					{
						let link = file;

						request({url: link, encoding: 'binary'}, (error, response, body) =>
							{
								// if error: throw error.
								if (error) throw error;
								
								if (response && response.statusCode == 200)
								{
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

										server.query('InsertChalenge', [relative_path])
										.then(result =>
											{
												server.query('GetChallengeInfo', [relative_path])
												.then(result =>
													{
														let challenge = 
														{
															name: result.Name,
															uid: result.UId,
															filename: result.FileName,
															author: result.Author,
															mood: result.Mood,
															medals:
															[
																result.AuthorTime,
																result.GoldTime,
																result.SilverTime,
																result.BronzeTime
															],
															coppers: result.CopperPrice,
															isMultilap: result.LapRace,
															laps: result.NbLaps,
															checkpoints: result.NbCheckpoints,
															source: 'url'
														};

														db.get().collection('tracks').insertOne(challenge);
														
														db.get().collection('players').findOne({login: login})
														.then(document =>
															{
																let player = document.value;

																let title = player.title,
																	nickname = player.nickname;

																let message = utilities.fill(this.dictionary.admin_add_tmx,
																	{
																		title: title,
																		player: nickname,
																		track: challenge.name,
																		method: 'from URL'
																	});

																server.query('ChatSendServerMessage', [message]);
															});
													});
											});
									});
								}
							});
					} //-- url --//

					if (mode === 'local')
					{

					} //-- local --//
				}

				if (task === 'writetracklist')
				{
					let tracklist = 'tracklist.txt';

					server.query('SaveMatchSettings', [tracklist]);

					server.query('ChatSendServerMessageToLogin', [this.dictionary.admin_writetracklist]);
				}
			}
	}
	
}

module.exports = (db, server) =>
{
	return new plugin(db, server);
};