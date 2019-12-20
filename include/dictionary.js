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
		leavemessage: separators.status + '$z$s$fff%title%$z$s $ff0%player%$z$s$fff has left the server.',

		winmessage: separators.status + '$z$s$ff0%player%$z$s$fff won for the $ff0%nr%.$fff time!',
		nowinner: separators.status + '$z$s$fffAin\'t no winner! :(',

		titlechanged: separators.private + '$z$s$fffYour title was changed to: %title%',

		localrecord_new: separators.status + '$z$s$fff%nickname%$z$s$fff just drove the $ff0#%place%$fff local record! ($ff0%time%$fff)',
		localrecord_imp: separators.status + '$z$s$fff%nickname%$z$s$fff just drove the $ff0#%place%$fff local record! ($ff0%time%$fff; $0af%imp%$fff)',

		localrecord_summary_a: separators.status + '$z$s$fffLocal Records on $ff0%map%$z$s$fff %event%: ',
		localrecord_summary_elem: '$ff0#%nr%: %name%$z$s$fff ($ff0%time%$fff)',

		admin_add_tmx: separators.status + '$z$s$fff%title%$z$s$ff0 %player%$z$s$fff just added and jukeboxed $ff0%track%$z$s$fff %method%!',
		admin_writetracklist: separators.private + '$z$s$fff Tracklist successfully saved.',
		admin_restart: separators.status + '$z$s$fff%title%$z$s$ff0 %player%$z$s$fff restarts the current track!',
		admin_skip: separators.status + '$z$s$fff%title%$z$s$ff0 %player%$z$s$fff skips the current track!',
		admin_kick: separators.status + '$z$s$fff%title%$z$s$ff0 %player%$z$s$fff skips the current track!',
		admin_ban: separators.status + '$z$s$fff%title%$z$s$ff0 %player%$z$s$fff skips the current track!',

		karma_status: separators.status + '$z$s$fffKarma on the current track: $ff0%score%$fff (+: $ff0%pos%$fff / -: $ff0%neg%$fff)',
		karma_recorded: separators.private + '$z$s$fffYour vote has been recorded!',
		karma_alreadyvoted: separators.private + '$z$s$fffYou already have voted for this track!',


		// suffixes:
		suffix_pts: ' pts' // <-- points
	};