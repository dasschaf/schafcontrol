//
//	SchafControl sentence bank
//
//

let separators =
	{
		status: '$0af-- ',
		private: '$999-- '
	};

module.exports =
	{
		joinmessage: separators.status + '$z$s$fff%title%$z$s$fff $ff0%player%$z$s$fff joined the server for the $ff0%nr%.$fff time!',

		winmessage: separators.status + '$z$s$ff0%player%$z$s$fff won for the $ff0%nr%.$fff time!',
		nowinner: separators.status + '$z$s$fffAin\'t no winner! :(',

		titlechanged: separators.private + '$z$s$fffYour title was changed to: %title%',

		localrecord_new: separators.status + '$z$s$fff%nickname%$z$s$fff just drove the $ff0%place%$fff. local record! ($0ff%time%$fff)',

		admin_add_tmx: separators.status + '$z$s$fff%title%$z$s$ff0 %player%$z$s$fff just added and jukeboxed $ff0%track%$z$s$fff %method%!'
	};