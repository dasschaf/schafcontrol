let 

let getTitle = (login) =>
{
	if (admin.)
}

module.exports =
	{
		admins = require('../settings/admin.json'),
		settings = require('./settings'),

		check: (login) =>
		{
		
			if (login === this.settings.masteradmin.login)
				return true;
		
			else
			{
				// check for admin perms:
		
				if (this.admins.masteradmin.includes(login))
					return true;
		
				if (this.admins.admin.includes(login))
					return true;
			}	
		
			
			return false;
		},

		getTitle: (login) =>
		{
			
		}
	};

