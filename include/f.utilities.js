//
// SchafControl Utility library
//

module.exports =
	{
		fill: (string, replacements) => {
			Object.keys(replacements).forEach((element, idx) => {
				string = string.replace('%' + Object.keys(replacements)[idx] + '%', replacements[element]);
			});

			return string;
		},

		calculateTime: (time) => {
			time = parseInt(time);

			// quick mafhs!
			var minutes = Math.floor(time / (1000 * 60));
			var seconds = Math.floor((time - minutes * 1000 * 60) / 1000);
			var hundredth = Math.floor((time - (seconds * 1000 + minutes * 1000 * 60)) / 10);
			var string = '';

			// 1 + '1' = 11 - 1 = 10!

			if (seconds < 10 && minutes !== 0) seconds = "0" + seconds;
			if (hundredth < 10 && hundredth !== 0) hundredth = "0" + hundredth;
			if (hundredth === 0) hundredth = "00";

			if (minutes === 0) string = seconds + '.' + hundredth;
			if (minutes !== 0) string = minutes + ':' + seconds + '.' + hundredth;

			return string;
		},

		formatting_tm2html: (string) => {

			// strip formatting
			string = string.replace(/[$][nmwoszi]|[$][hl][\[][a-zA-Z0-9/?#!&\.\\\-_=@$'()+,;:]*[\]]/gi, '');

			if (string.includes('$')) {
				// only colors left now
				var split = string.split('$');

				var output = '';

				split.forEach(elem => {
					var color = elem.substring(0, 3);
					var text = elem.substring(3);

					output += '<span style="color:#' + color + ';">' + text + '</span>';
				});
			} else return string;
		},

		formatting_strip_tm: (string) => {

			return string.replace(/[$][nmwoszi]|[$][hl][\[][a-zA-Z0-9/?#!&\.\\\-_=@$'()+,;:]*[\]]|[$]{1}[0-f]{3}/gi, '');

		},

		th: (number) => {
			while (number > 20) {
				number = number - 10;
			}

			switch (number) {
				case 1: return 'st';
				case 2: return 'nd';
				case 3: return 'rd';

				case 21: return 'st';
				case 22: return 'nd';
				case 23: return 'rd';

				default: return 'th';
			}
		}
	};