
//
// SchafControl sample plugin
//
// it actually doesn't do anything...
//

class plugin {
	constructor() {

		this.name = 'Set - Title';
		this.desc = 'Set library provides a variety of functions to set settings for yourself - this particular module provides support to set your custom title';

		this.utilities = require('../include/f.utilities');
		this.dictionary = require('../include/dictionary');

		this.chalk = require('chalk');

		this.requiredConnections =
			{
				server: true,		// 1st argument
				database: true
			};
	}

	/*
	onChat (params)
	{
		// params:
		// [0] int   : player UId
		// [1] string: login
		// [2] string: message
		// [3] bool  : is Command?

		let command = params[2].split(' ');
		let	db = this.conns['db'],
			server = this.conns['server'],
			utilities = this.utilities;

		if (!params[3])
			return;


		if (command.shift() == '/set')
			if (command.shift() == 'title')
			{
				let title = command.join(' ');
				if (title !== '')
					db.collections('players').findOneAndUpdate({login: params[1]}, {$set: {title: title}}, {upsert: true, returnOriginal: false})
					.then(d =>
						{
							let document = d.value;

							let message = utilities.fill(this.dictionary.titlechanged, {title: document.title});

							server.query('ChatSendServerMessageToLogin', [message, document.login]);
						})

				else
					db.collections('players').findOne({login: params[1]})
			}
	}
	*/

}

module.exports = new plugin();