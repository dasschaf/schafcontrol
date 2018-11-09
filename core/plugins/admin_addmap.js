
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
			server = this.server,
			db = this.db,
			request = this.request;

		// check for admin:
		// TODO

		if (command.shift() == '/admin')
			if (command.shift() == 'add')
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
									var abs_fn = targetDir + id + '.Challenge.Gbx';
									var rel_fn = '/TMX/' + id + '.Challenge.Gbx';
								});
							}
						});
				}
			}
	}
	
}

module.exports = (db, server) =>
{
	return new plugin(db, server);
};