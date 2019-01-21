//
// SchafControl plugin array builder
//
//

//-- require: node modules --/
let fs = require('fs');

//-- require: other files --/
let settings = require('./settings');


module.exports.make = (db, server) =>
	{

		const path = __dirname + '/..\\plugins\\';

		let files = fs.readdirSync(path);
		
		let rawlist = [];
		
		console.log('\n- Startup -: Loading Plugins: ('  + process.uptime() + ')\n');
		
		files.forEach(file =>
		{
			if(file.endsWith('.js'))
				rawlist.push(path + file);
			
			else
				console.log('- WARNING -: Invalid plugin file in ./plugins/: ' + file + ' (' + process.uptime() + ')');
		});

		let list = rawlist.map(cv =>
		{
			let pg = require(cv),
				conns;
			
			console.log('- Startup -: PLUGIN "' + pg.name + '" loaded. (' + process.uptime() + ')');
			
			if ('server' in pg.requiredConnections)
				conns['server'] = server;

			if ('db' in pg.requiredConnections)
				conns['db'] = db;

			return pg;
		});
		
		console.log('\n- Startup -: Plugins loaded! ('  + process.uptime() + ')');
		
		return list;
	};
