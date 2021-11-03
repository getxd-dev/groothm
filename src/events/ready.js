const lavalink = require('../lavalink/index');
const chalk = require('chalk');
const { Util } = require('discord.js');
const {version} = require('../../package.json');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        const player = new lavalink(client)
        client.player = player
        player.init(client.user.id)
        client.user.setActivity(`with getxd | ${client.defaultPrefix}help`)
        setInterval(() => {
            let statusList = [
                `finally fixed prefix cmd | ${client.defaultPrefix}help`,
                `idk what to put here | ${client.defaultPrefix}help`,
                `you play songs | ${client.defaultPrefix}help`
            ]
            let choosenStatus = statusList[Math.round(Math.random() * statusList.length)]
            client.user.setActivity(choosenStatus, { type: 3 })
        }, 40000);
        console.log(chalk.green(`[CLIENT] => [READY] ${client.user.tag} is now ready!`))
        await Util.delayFor(800)
        client.on('raw', (d) => player.updateVoiceState(d))
    }
};