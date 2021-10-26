const { MessageEmbed } = require('discord.js');
const { PREFIX, LOG_USAGE } = new (require('../modules/laffeyUtils'))();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const chalk = require('chalk');

module.exports = {
    name: 'message',
    once: false,
    async execute(message, client) {
        if (!message.guild || message.author.bot) return;

        let intro = new MessageEmbed()
            .setAuthor('Groothm', 'https://www.gitbook.com/cdn-cgi/image/width=200,height=200,fit=contain,dpr=1.5,format=auto/https%3A%2F%2Ffiles.gitbook.com%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F-MiMJWwxKrFlpVznpkpb%252Ficon%252F5DeRZbY2xKKCvuBuEbHC%252FDpb2hOtU8AACnYP%2520(2).jpg%3Falt%3Dmedia%26token%3D2ee85873-a9f7-4371-b390-88751f0078a7')
            .setDescription(`My prefix in \`${message.guild.name}\` is ${client.prefixes.get(message.guild.id) ? client.prefixes.get(message.guild.id).prefix : PREFIX}`)
            .setColor('#f50ae5')
        if (message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
            if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return message.member.send('Hey, i need `SEND_MESSAGES` permission to do interaction with user.').catch(() => { })
            return message.channel.send(intro)
        }

        const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(client.prefixes.get(message.guild.id)?.prefix || PREFIX)})\\s*`);
        if (!prefixRegex.test(message.content)) return;
        const [, matchedPrefix] = message.content.match(prefixRegex);
        const args = message.content.slice(matchedPrefix.length).trim().split(/\s+/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(x => x.aliases?.includes(commandName));

        if (!command) return;
        if (!message.channel.permissionsFor(client.user).has('SEND_MESSAGES')) return message.member.send('Hey, i need `SEND_MESSAGES` permission to do interaction with user.').catch(() => { })

        try {
            if (LOG_USAGE) {
                console.log(chalk.magenta(`[LOG] => [COMMANDS] ${message.author.tag} (${message.author.id}) : ${message.content}`))
            }
            await command.execute(message, args, client)
        } catch (err) {
            const errorEmbed = new MessageEmbed()
                .setDescription(`I'm sorry, there was an error while executing **${command.name}**\n\`\`\`${err}\`\`\``)
                .setColor(client.guilds.cache.get(message.guild.id).me.displayHexColor !== '#000000' ? client.guilds.cache.get(message.guild.id).me.displayHexColor : '#00C7FF')
            message.channel.send(errorEmbed)
            client.logger.error(err)
        }
    }
};