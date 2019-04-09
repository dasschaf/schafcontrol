let adm_check = (login, db) =>
{

	let admins = require('../settings/admin.json'),
		settings = require('./settings')

	if (login === settings.masteradmin.login)
		return true;

	else
	{
		// check for admin perms:

		if (admins.masteradmin.includes(login))
			return true;

		db.con
	}	

	
	return false;
};

module.exports =
	{
		check: adm_check
	};

