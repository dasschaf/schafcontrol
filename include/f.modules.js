//
// SchafControl plugin array builder
//
//

//-- require: node modules --/
let fs = require('fs');
let chalk = require('chalk');

//-- require: other files --/
let settings = require('./settings');


module.exports.make = (db, server) => {

	const path = __dirname + '/..\\plugins\\';

	let files = fs.readdirSync(path);

	let disabled = require('../settings/disabledPlugins.json');

	let rawlist = [];

	console.log('\n' + chalk.green('- Startup -') + ': Loading Plugins: (' + process.uptime() + ')\n');

	files.forEach(file => {
		if (file.endsWith('.js'))
			rawlist.push(path + file);

		else
			console.log('- WARNING -: Invalid plugin file in ./plugins/: ' + file + ' (' + process.uptime() + ')');
	});

	let list = rawlist.map(cv => {

		let pg = require(cv);

		if (disabled.includes(pg.name)) {
			pg = { name: pg.name, desc: pg.desc };
			console.log(chalk.green('- Startup -') + ': PLUGIN ' + chalk.grey('"' + pg.name + '" loaded, but is disabled. (' + process.uptime() + ')'));
			return pg;
		}

		console.log(chalk.green('- Startup -') + ': PLUGIN "' + pg.name + '" loaded. (' + process.uptime() + ')');

		pg.conns = {};

		//if ('server' in pg.requiredConnections)
		pg.conns.server = server;

		//if ('database' in pg.requiredConnections)
		pg.conns.db = db;

		return pg;
	});

	console.log('\n' + chalk.green('- Startup -') + ': Plugins loaded! (' + process.uptime() + ')');

	return list;
};
