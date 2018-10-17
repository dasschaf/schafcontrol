
class plugin
{
	constructor(db, server)
	{
		this.db = db;
		this.server = server;
	}

	onConnect (params)
	{

	}
}

module.exports = (db, server) =>
{
	return new plugin(db, server);
};