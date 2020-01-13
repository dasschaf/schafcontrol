const chalk = require('chalk')

class errorhandler {

	warning (str)
	{
		console.log(chalk.yellow("[" + Date.now() + " -- WARNING]: ") + str);
	}

	r_error (str)
	{
		console.log(chalk.orange("[" + Date.now() + " -- ERROR]: ") + str);
	}

	db_error (str)
	{
		console.log(chalk.red("[" + Date.now() + " -- DB ERROR]: ") + str);
		process.exit(620);
	}

	s_error (str)
	{
		console.log(chalk.red("[" + Date.now() + " -- SERVER ERROR]: ") + str);
		process.exit(621);
	}

	f_error (str)
	{
		console.log(chalk.red("[" + Date.now() + " -- FATAL ERROR]: ") + str);
		process.exit(622);
	}

	info (str)
	{
		console.log(chalk.blue("[" + Date.now() + " -- INFO]: ") + str);
	}

}

module.exports = new errorhandler();