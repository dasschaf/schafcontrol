
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
	}

	onConnect (params)
	{

	}
}

module.exports = (db, server) =>
{
	return new plugin(db, server);
};