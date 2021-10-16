const chalk = require('chalk');
require('dotenv').config()
require('./src/modules/console');
console.log(chalk.yellow('----------------------------------------------------------------------------------------------'))
console.log()
console.log(chalk.red('groothm starting...'))
console.log()
console.log(chalk.yellow('----------------------------------------------------------------------------------------------'))
console.log()
const Laffey = require('./src/Laffey');

new Laffey().login()
    .catch(err => console.error(err))
