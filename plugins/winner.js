
//
// SchafControl sample plugin
//
// it actually doesn't do anything...
//

class plugin {
	constructor() {

		this.name = 'WinnerCount';
		this.desc = 'Provides stats for count of wins';

		this.dictionary = require('../include/dictionary');
		this.utilities = require('../include/f.utilities');

		this.chalk = require('chalk');

		this.requiredConnections =
			{
				server: true,		// 1st argument
				database: true
			};
	}

	onRaceEnd(params) {
		// params:
		// [0] struct : Player Rankings (SPlayerRankings[])
		// [1] struct : Challenge Info (SChallengeInfo)

		let ranking = params[0],

			db = this.conns['db'],
			server = this.conns['server'];

		if (ranking.length < 2 || ranking[0].BestTime === '-1') {
			server.query('ChatSendServerMessage', [this.dictionary.nowinner]);
			return;
		}

		let winner = ranking[0];

		let login = winner.Login,
			nickname = winner.NickName;

		db.collection('players').findOneAndUpdate(
			{ login: login },
			{ $inc: { wins: +1 } },
			{
				upsert: true,
				returnOriginal: false
			}
		)
			.then(document => {
				let player = document.value;

				let message = this.utilities.fill(this.dictionary.winmessage,
					{
						player: nickname,
						nr: player.wins
					});

				if (Number.isInteger(player.wins / 10) || player.wins < 10)
					server.query('ChatSendServerMessage', [message]);

				console.log(this.chalk.greenBright('- Running -') + `: ${login} won for the ${player.wins}. time.`);
			});


	}

}

module.exports = new plugin();