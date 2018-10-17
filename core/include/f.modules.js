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

		const path = '../plugins/';

		let files = fs.readdirSync(path);

		let rawlist = [];

		files.forEach(file =>
		{
			rawlist.push(path + file);
		});

		return rawlist.map(cv =>
		{
			return require(cv)(db, server);
		});
	};
