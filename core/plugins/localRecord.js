
//
// SchafControl localRecords plugin
//
// localRecord handling
//

class plugin
{
	constructor(db, server)
	{
		this.db = db;
		this.server = server;
		
		this.name = 'LocalRecords';
		this.desc = 'Local Records management plugin';
		
		this.settings = require('../include/settings');
		this.utilities = require('../include/f.utilities');
	}
	
	onFinish (params)
	{
		// params:
		// [0] int    : Player UId
		// [1] string : login
		// [2] int    : Time/Score
		
		let time = params[2],
			login = params[1],
			settings = this.settings,
			utilities = this.utilities,
			db = this.db,
			server = this.server;
		
		server.query('GetCurrentChallengeInfo', [])
			.then(challenge =>
			{
				let uid = challenge.UId;
				
				db.get().collection('records').find({track: uid})
					.then(documents =>
					{
					
					})
			})
		
		
		
	}
	
	onCheckpoint (params)
	{
		// params:
		// [0] int    : Player UId
		// [1] string : Player login
		// [2] int    : time/score
		// [3] int    : Current Lap
		// [4] int    : Checkpoint Number
	}
	
	onChallengeEnd (params)
	{
		// params:
		// [0] struct : PlayerRankings (SPlayerRankings[])
		// [1] struct : ChallengeInfo  (SChallengeInfo)
		// [2] bool   : Was WarmUp?
		// [3] bool   : Match continues on next map?
		// [4] bool   : Challenge Restart?
	}
	
	onChallengeBegin (params)
	{
		// params:
		// [0] struct : ChallengeInfo (SChallengeInfo)
		// [1] bool   : Is WarmUp?
		// [2] bool   : Is Match Coninuation?
		
		
	}
	
}

module.exports = (db, server) =>
{
	return new plugin(db, server);
};