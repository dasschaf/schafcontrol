//
// SchafControl Utility library
//

module.exports =
	{
		fill: (string, replacements) =>
		{
			Object.keys(replacements).forEach((element, idx) =>
			{
				string = string.replace('%' + Object.keys(replacements)[idx] + '%', replacements[element]);
			});

			return string;
		},

		calculateTime: (ms) =>
		{
			return new Date(ms).toLocaleTimeString();
		}
	};