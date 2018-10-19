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
			let pg = require(cv)(db, server);
			
			console.log('- Startup -: PLUGIN "' + pg.name + '" loaded. (' + process.uptime() + ')');
			
			return pg;
		});
		
		console.log('\n- Startup -: Plugins loaded! ('  + process.uptime() + ')');
		
		return list;
	};
