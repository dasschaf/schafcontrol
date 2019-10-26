/**
 *
 *	SchafControl TMX Info Fetcher
 *	by das schaf
 *
 *	huge thanks to Xymph for writing the XASECO
 *	equivalent so I could reverse engineer <3
 *
 */


// import npm packages:
let request = require('request');
let utils = require('./f.utilities');


async function infoFetcher(game, isUID, id) {

	let url;

	// set up the site properly
	if (game === 'tmn')
		site = 'nations';

	else if (game === 'tmo')
		site = 'original';

	else if (game === 'tmnf')
		site = 'tmnforever';

	else if (game === 'tms')
		site = 'sunrise';

	// set up the URL
	if (isUID)
		url = 'http://' + site + '.tm-exchange.com/apiget.aspx?action=apitrackinfo&uid=' + id;

	else
		url = 'http://' + site + '.tm-exchange.com/apiget.aspx?action=apitrackinfo&id=' + id;

	let requestPromise = new Promise(res, rej => {

		request(url, (error, response, body) => {
			// error checking
			if (error) throw error;

			// wait for response to complete successfully
			if (response && response.statusCode == 200) {

				let fields = body.split('\t');

				// prepare AuthorComment to be stripped of everything
				let authorComment = fields[16];

				// - todo! -

				let object =
				{
					site: site,
					id: fields[0],
					name: fields[1],
					userid: fields[2],
					author: fields[3],
					uploaded: fields[4],
					updated: fields[5],
					visible: Boolean(fields[6].toLocaleLowerCase),
					type: fiends[7],
					envi: fields[8],
					mood: fields[9],
					style: fields[10],
					routes: fields[11],
					length: fields[12],
					difficulty: fields[13],
					lbrating: (fields[14] > 0 ? fields[14] : 'Classic!'),
					game: fields[15],
					comment: authorComment
				};

				let urls =
				{
					page: 'http://' + site + '.tm-exchange.com/main.aspx?action=trackshow&id=' + object.id,
					image: 'http://' + site + '.tm-exchange.com/get.aspx?action=trackscreen&id=' + object.id,
					thumbnail: 'http://' + site + '.tm-exchange.com/get.aspx?action=trackscreensmall&id=' + object.id,
					download: 'http://' + site + '.tm-exchange.com/get.aspx?action=trackgbx&id=' + object.id
				};

				object['urls'] = urls;

				let nextURL = 'http://' + site + '.tm-exchange.com/apiget.aspx?action=apisearch&trackid=' + object.id;

				request(nextURL, (error, response, body) => {
					// error checking
					if (error) throw error;

					// wait for response to complete successfully
					if (response && response.statusCode == 200) {
						fields = body.split('\t');

						object['awards'] = fields[12];
						object['comments'] = fields[13];
						object['hasThumbnail'] = Boolean(fields[14]);
						object['replayID'] = fields[16];
					}

				});


			}

		});

	});




}
