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

	makeConnections(server, db)
	{
		this.server = server;
		this.db = db;
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

        if (this.voted(message) != 0)
        {
            let impact = this.voted(message);

            
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
        if (message == '/++' || message == '++')
        return 1;

        if (message == '/--' || message == '--')
        return -1;

        return 0;
    }
	
}

module.exports = () =>
{
	return new plugin();
};