module.exports =
	{

		admins: require('../settings/admin.json'),
		settings: require('./settings'),

		check: (login) => {

			if (login === this.settings.masteradmin.login)
				return true;

			else {
				// check for admin perms:

				if (this.settings.masteradmin.includes(login))
					return true;

				if (this.admins.admin.includes(login))
					return true;
			}


			return false;
		},

		getTitle: (login) => {
			// returns the title from the configuration file
			if (this.admins.titles.includes(login))
				return this.admins.titles[login];


			// master admin settings are saved in the main configuration file
			if (this.admins.masteradmin.includes(login))
				return this.settings.masteradmin.title;


			return "Player";
		}

	};

