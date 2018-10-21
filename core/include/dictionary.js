//
//	SchafControl sentence bank
//
//

let separators =
	{
		status: '$0af- '
	};

module.exports =
	{
		joinmessage: separators.status + '$z$s$fff%title%$z$s$fff $ff0%player%$z$s$fff joined the server for the $ff0%nr%.$fff time!',
		winmessage: separators.status + '$z$s$ff0%player%$z$s$fff won for the $ff0%nr%.$fff time!'
	};