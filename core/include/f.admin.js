let adm_check = (login, db) =>
{

	let admins = require('../settings/admin.json'),
		settings = require('')

	if (login === settings.masteradmin.login)
		return true;

	else
	{
		// check for admin perms:

		if (admins.masteramin.includes(login))
			return true;
	}	

	
	return false;
};

module.exports =
	{
		check: adm_check
	};

