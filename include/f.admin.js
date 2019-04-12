module.exports =
	{

		admins: require('../settings/admin.json'),
		settings: require('./settings'),

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
			if (this.admins.titles.includes(login))
				return this.admins.titles[login];

			if (this.admins.masteradmin.includes(login))
				return "Field Marshal"; // maybe add config herefor later


			return "Player";
		}

	};

