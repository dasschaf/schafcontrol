
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
	onChat (params)
	{
		// params:
		// [0] int   : player UId
		// [1] string: login
		// [2] string: message
		// [3] bool  : is Command?

		
	}
	
}

module.exports = (db, server) =>
{
	return new plugin(db, server);
};