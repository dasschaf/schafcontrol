
//
// SchafControl sample plugin
//
// it actually doesn't do anything...
//

class plugin {
	constructor() {

		this.name = 'Sample Plugin';
		this.desc = 'Sample plugin providing a bare structure to work with for developers. It doesn\'t do anything...';

		this.requiredConnections =
			{
				server: true,		// 1st argument
				database: true
			};

	}

	onConnect(params) {
		// params:
		// [0] string: login
		// [1] bool  : is Spectator?
	}

	onDisconnect(params) {
		// params:
		// [0] string: login
	}

	onChat(params) {
		// params:
		// [0] int   : player UId
		// [1] string: login
		// [2] string: message
		// [3] bool  : is Command?
	}

	onFinish(params) {
		// params:
		// [0] int    : Player UId
		// [1] string : login
		// [2] int    : Time/Score
	}

	onCheckpoint(params) {
		// params:
		// [0] int    : Player UId
		// [1] string : Player login
		// [2] int    : time/score
		// [3] int    : Current Lap
		// [4] int    : Checkpoint Number
	}

	onChallengeEnd(params) {
		// params:
		// [0] struct : PlayerRankings (SPlayerRankings[])
		// [1] struct : ChallengeInfo  (SChallengeInfo)
		// [2] bool   : Was WarmUp?
		// [3] bool   : Match continues on next map?
		// [4] bool   : Challenge Restart?
	}

	onChallengeBegin(params) {
		// params:
		// [0] struct : ChallengeInfo (SChallengeInfo)
		// [1] bool   : Is WarmUp?
		// [2] bool   : Is Match Coninuation?
	}

	onRoundBegin(params) {
		// params:
		// none.
	}

	onRoundEnd(params) {
		// params:
		// none.
	}

	onRaceBegin(params) {
		// params:
		// [1] struct : ChallengeInfo (SChallengeInfo)
	}

	onRaceEnd(params) {
		// params:
		// [0] struct : Player Rankings (SPlayerRankings[])
		// [1] struct : Challenge Info (SChallengeInfo)
	}

	onStatusChange(params) {
		// params:
		// [0] int    : Status Number/Code
		// [1] string : Status Name
	}

	onBillUpdate(params) {
		// params:
		// [0] int    : Bill ID
		// [1] int    : State
		// [2] string : State Name
		// [3] int    : Transaction ID
	}

	onPlayerInfoChange(params) {
		// params:
		// [0] struct : Player Info
	}

	onVoteUpdate(params) {
		// params:
		// [0] string : State Name
		// [1] string : Login
		// [2] string : Command Name
		// [3] string : Command param
	}

	onFlowControlTransition(params) {
		// params:
		// [0] string : Transition
	}

	onChallengeListModified(params) {
		// params:
		// [0] int    : Current Challenge Index
		// [1] int    : Next Challenge Index
		// [2] int    : Is List Modified?
	}

	onTunnelDataRecieve(params) {
		// params:
		// [0] int    : Player UId
		// [1] string : Player Login
		// [2] string : base64 encoded data
	}

	onPlayerIncoherence(params) {
		// params:
		// [0] int    : Player UId
		// [1] string : Player Login
	}

	onPlayerManialinkAnswer(params) {
		// params:
		// [0] int    : Player UId
		// [1] string : Player Login
		// [2] int    : Answer
	}

}

module.exports = new plugin();