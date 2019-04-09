
//
// SchafControl sample plugin
//
// it actually doesn't do anything...
//

class plugin
{
	constructor()
	{		

		this.name = 'Admin - Track handling';
		this.desc = 'Sample plugin providing a bare structure to work with for developers. It doesn\'t do anything...';

		this.request = require('request');
		this.fs = require('fs');
		this.settings = require('../include/settings');
		this.utilities = require('../include/f.utilities');
		this.dictionary = require('../include/dictionary');

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
			settings = this.settings,
			utilities = this.utilities;


		if (command.shift() === '/admin')
		{
			let task = command.shift();
			
			switch (task)
			{
				case "restart":
				case "res":
				{
					db.collection('players').findOne({login: login}).then(document =>
						{
							let player = document;

							let title = this.settings.masteradmin.login === login ? this.settings.masteradmin.title : player.title;
							let nickname = player.nickname;

							let message = utilities.fill(this.dictionary.admin_restart,
								{
									title: title,
									player: nickname
								});

							server.query("RestartChallenge");
							server.query('ChatSendServerMessage', [message]);
						});

					return;
				}

				case "skip":
				{
					db.collection('players').findOne({login: login}).then(document =>
						{
							let player = document;

							let title = this.settings.masteradmin.login === login ? this.settings.masteradmin.title : player.title;
							let nickname = player.nickname;

							let message = utilities.fill(this.dictionary.admin_skip,
								{
									title: title,
									player: nickname
								});

							server.query('NextChallenge');
							server.query('ChatSendServerMessage', [message]);
						});

					return;
				}
			}
		}
	}
	
}

module.exports = new plugin();