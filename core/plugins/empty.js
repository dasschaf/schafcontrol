
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
		// params:
		// [0] string: login
		// [1] bool  : is Spectator?
	}
	
	onDisconnect (params)
	{
		// params:
		// [0] string: login
	}
	
	onChat (params)
	{
		// params:
		// [0] int   : player UId
		// [1] string: login
		// [2] string: message
		// [3] bool  : is Command?
	}
	
	onFinish (params)
	{
		// params:
		// [0] int    : Player UId
		// [1] string : login
		// [2] int    : Time/Score
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
	
	onRoundBegin (params)
	{
		// params:
		// none.
	}
	
	onRoundEnd (params)
	{
		// params:
		// none.
	}
	
	onStatusChange (params)
	{
		// params:
		// [0] int    : Status Number/Code
		// [1] string : Status Name
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
}

module.exports = (db, server) =>
{
	return new plugin(db, server);
};