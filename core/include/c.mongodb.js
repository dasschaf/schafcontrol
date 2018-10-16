//
//  SchafControl
//  MongoDB Connection file
//
//  used to provide a working MySQL Object in any file via
//  let MongoDB = require('./include/c.mongodb.js');
//

//-- require: node packages --//
let mc = require('mongodb').MongoClient;

//-- require: other files --//
let settings = require('./settings');

//-- variables --//
let connection = null;

module.exports.connect = () => new Promise((resolve, reject) =>
	{
		mc.connect(settings.mongodb.url, settings.mongodb.options, (err, client) =>
		{
			if(err)
			{
				reject(err);
				return;
			}

			let db = client.db(settings.mongodb.db);

			resolve(db);

			connection = db;
			
		});
	});

module.exports.get = () =>
{
	if (!connection)
	{
		throw new Error('Call .connect(); first -- connection not created yet.');
	}

	return connection;
};