
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
		
		this.name = 'JoinMessage';
		this.desc = 'Plugin to provide messages for player joins, leaves and join stats.';
		
		this.settings = require('../include/settings');
		this.dictionary = require('../include/dictionary');
		this.utilities = require('../include/f.utilities');
	}

	onConnect (params)
	{
		// params:
		// [0] string: login
		// [1] bool  : is Spectator?
		
		let login = params[0],
			spec  = params[1];
		
		if (this.settings.masteradmin.login === login)
		{
			let title = this.settings.masteradmin.title,
				db = this.db,
				server = this.server;
			
			server.query('GetPlayerInfo', [login, 1])
				.then(info =>
				{
					let nickname = info.NickName;
					
					db.get().collection('players').findOneAndUpdate(
						{login: login},
						{
							$inc: {joins: +1},
							$set: {nickname: nickname}
						},
						{
							upsert: true,
							returnOriginal:false
						}
						)
						.then (document =>
						{
							let player = document.value;
							
							let message = this.utilities.fill(this.dictionary.joinmessage,
								{
									title: title,
									player: nickname,
									nr: player.joins
								});
							
							server.query('ChatSendServerMessage', [message]);
						})
					
					
					
				});
		}
		
		else
		{
			let title = 'Player',
				db = this.db,
				server = this.server;
			
			server.query('GetPlayerInfo', [login, 1])
				.then(info =>
				{
					let nickname = info.NickName;
					
					let player = db.get().collection('players').findOneAndUpdate(
						{login: login},
						{
							$inc: {joins: +1},
							$set: {nickname: nickname}
						},
						{
							upsert: true,
							returnNewDocument:true
						}
					);
					
					let joins = player.joins;
					
					let message = this.utilities.fill(this.dictionary.joinmessage,
						{
							title: title,
							player: nickname,
							nr: joins
						});
					
					server.query('ChatSendServerMessage', [message]);
				});
		}
	}
	
	onDisconnect (params)
	{
		// params:
		// [0] string: login
	}
}

module.exports = (db, server) =>
{
	return new plugin(db, server);
};