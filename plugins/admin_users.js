
//
// SchafControl sample plugin
//
// it actually doesn't do anything...
//

class plugin
{
	constructor()
	{
		this.requiredConnections =
		{
			server: true,
			database: true
		};

		this.name = 'Admin - User handling';
		this.desc = 'Sample plugin providing a bare structure to work with for developers. It doesn\'t do anything...';

		this.chalk = require('chalk');

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
			db = this.conns['db'],
			server = this.conns['server'],
			request = this.request,
			fs = this.fs,
			settings = this.settings,
			utilities = this.utilities;

		// check for admin:

		if (command.shift() === '/admin')
			{
				let task = command.shift();

				switch (task)
				{
					case 'kick':
					{
						let target = command.shift(),
							message = command.join(' ');

						server.query('GetPlayerInfo', [login, 1])
						.then(result =>
							{
								let adm_nn = result.NickName,
									adm_lg = login;

								server.query('GetPlayerInfo', [target, 1])
								.then(result =>
									{
										let tar_nn = result.NickName,
											tar_lg = target;

										db.collection('players').findOne({login: login}).then(document =>
											{
												let title = document.title;

												console.log(chalk.greenBright('- Running -') + `: [Admin] - ${adm_lg} kicked ${tar_lg}; Reason: ${message}`);

												let s_message = utilities.fill(this.dictionary.admin_kick, {title: title, player: adm_nn, target: tar_nn});

												server.query('ChatSendServerMessage', [s_message]);
												server.query('Kick', [tar_lg, message]);
											});
									});
							});

						break;
					}

					case 'ban':
					{
						let target = command.shift(),
							message = command.join(' ');

						server.query('GetPlayerInfo', [login, 1])
						.then(result =>
							{
								let adm_nn = result.NickName,
									adm_lg = login;

								server.query('GetPlayerInfo', [target, 1])
								.then(result =>
									{
										let tar_nn = result.NickName,
											tar_lg = target;

										db.collection('players').findOne({login: login}).then(document =>
											{
												let title = document.title;

												console.log(chalk.greenBright('- Running -') + `: [Admin] - ${adm_lg} ban ${tar_lg}; Reason: ${message}`);

												let s_message = utilities.fill(this.dictionary.admin_ban, {title: title, player: adm_nn, target: tar_nn});

												server.query('ChatSendServerMessage', [s_message]);
												server.query('Ban', [tar_lg, message]);
											});
									});
							});

						break;
					}
				}
			}
	}

}

module.exports = new plugin();
