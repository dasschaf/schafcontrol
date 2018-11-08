
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
				
				/*
				 * plan:
				 *
				 * 1) update record if it is any better
				 * 2) calculate rank and update rank in record
				 * 3) post message
				 */
	
				db.get().collection('records').findOneAndUpdate({track: uid, login: login},
					{
						$min: {time: time},
						$setOnInsert: {time: time}
					},
					{
						upsert: true,
						returnNewDocument: true
					})
				.then(document =>
					{
						let record = document.value;

						if (record.time > time)
						{
							// here we go bois!
							let place = db.get().collection('records').countDocuments({track: uid, time: {$lt: time}});

							server.query('GetPlayerInfo', [login, 1])
							.then(player =>
								{
									let nickname = player.NickName;

									
								});
						}
					});
					
			});
		
		
		
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