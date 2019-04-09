
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

						db.collection('players').find({$or: [{login: login}, {login: target}]})
						.then(result =>
						{

							results.forEach(document =>
							{
								
							})

						});

						break;
					}
				}
			}
	}

}

module.exports = new plugin();
