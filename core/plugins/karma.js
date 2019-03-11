// todo:

// basic karma ++/--
// author filters that can only be up/downvoted


//
// SchafControl sample plugin
//
// it actually doesn't do anything...
//

class plugin
{
	constructor()
	{		

		this.name = 'KarmaCounter';
		this.desc = 'Provides basic Karma counting for tracks';

		this.requiredConnections = 
		{
			server: true,		// 1st argument
			database: true
        };
        
        this.settings = require('../include/settings');
        this.karma = require('../settings/karma.json');
	}

	onChat (params)
	{
		// params:
		// [0] int   : player UId
		// [1] string: login
		// [2] string: message
        // [3] bool  : is Command?
        
        let message = params[2],
            login = params[1];

        if (this.voted(message) !== 0)
        {
            let impact = this.voted(message);

			this.conns['server'].query('GetCurrentChallengeInfo')
			.then(challenge =>
				{
					let uid = challenge.UId;

					if (this.checkIfVotedAlready(login, uid, impact) !== true)
					{
						this.conns['db'].collection('karma').findOneAndUpdate({uid: uid, login: login}, {$set: {vote: impact}}, {upsert: true}, () =>
						{
							this.conns['db'].collection('karma').find({uid: uid}).toArray((err, result) =>
							{
								if (err) throw err;
								let pos = 0,
									neg = 0,
									score = 0;

								result.forEach(document =>
									{
										if (document.vote === -1)
										{
											neg += 1;
											score += document.vote;
										}

										if (document.vote === 1)
										{
											pos += 1;
											score += document.vote;
										}
									});

								// fill karma placeholder
								// send message to server
								// send private message: vote recorded!
							});
						});
					}

					else
					{
						// send private message: already voted dumbass!
					}
				});
		}
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
    
    voted (message)
    {
        if (message === '/++' || message === '++')
        return 1;

        if (message === '/--' || message === '--')
        return -1;

        return 0;
	}
	
	checkIfVotedAlready(login, uid, vote)
	{
		let response;
		
		this.conns['db'].collection('karma').findOne({uid: uid, login: login}, (err, res) =>
		{
			if (err) throw err;

			if (res.vote === vote)
				response = true;

			else
				response = false;
		});

		return response;
	}
	
}

module.exports = new plugin();