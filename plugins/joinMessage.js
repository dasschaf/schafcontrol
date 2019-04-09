
//
// SchafControl joinMessage plugin
//
// provides joinMessage and an always up-to-date Nickname in the database + joincounting
//

class plugin
{
	
	constructor()
	{		
		this.name = 'JoinMessage';
		this.desc = 'Plugin to provide messages for player joins, leaves and join stats.';
		
		this.settings = require('../include/settings');
		this.dictionary = require('../include/dictionary');
		this.utilities = require('../include/f.utilities');
		
		this.chalk = require('chalk');

		this.requiredConnections = 
		{
			server: true,		// 1st argument
			database: true
		};

	}

	onConnect (params)
	{
		// params:
		// [0] string: login
		// [1] bool  : is Spectator?
		
		let login = params[0],
			spec  = params[1],
			title = 'Player';
		
		if (this.settings.masteradmin.login === login)
			title = this.settings.masteradmin.title;
		
		let db = this.conns.db,
			server = this.conns.server;
	
		
		server.query('GetPlayerInfo', [login, 1])
			.then(info =>
			{
				let nickname = info.NickName;
				
				db.collection('players').findOneAndUpdate(
					{login: login},
					{
						$inc: {joins: +1},
						$set: {
							nickname: nickname,
							title: title
						}
					},
					{
						upsert: true,
						returnOriginal:false
					}
					)
					.then (document =>
					{
						let player = document.value;
						
						if (typeof document.title !== 'undefined')
							title = document.title;
						
						let message = this.utilities.fill(this.dictionary.joinmessage,
							{
								title: title,
								player: nickname,
								nr: player.joins
							});
						
						server.query('ChatSendServerMessage', [message]);
						console.log(this.chalk.greenBright('- Running -') + `: ${login} joined the server for the ${nr}th time.`);
					});
			});
	}
	
	onDisconnect (params)
	{
		// params:
		// [0] string: login

		let login = params[0],
			spec  = params[1],
			title = 'Player',
			server = this.conns['server'],
			db = this.conns['db'];
		
		if (this.settings.masteradmin.login === login)
			title = this.settings.masteradmin.title;
		
		db.collection('players').findOne(
			{login: login})
			.then (document =>
			{				
				if (typeof document.title !== 'undefined')
					title = document.title;

				let nickname = document.nickname;
				
				let message = this.utilities.fill(this.dictionary.leavemessage,
					{
						title: title,
						player: nickname
					});
				
				server.query('ChatSendServerMessage', [message]);

				console.log(this.chalk.greenBright('- Running -') + `: ${login} left the server.`);
			});
		
	}
}

module.exports = new plugin();