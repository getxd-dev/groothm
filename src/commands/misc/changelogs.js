const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "changelogs",
  description: "View the bot's changelogs",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["faq"],
  async execute(message, args, client) {
    let embed = new MessageEmbed()
      .setAuthor(
        "View the bot's changelogs",
        client.user.displayAvatarURL()
      )
      .setColor("BLUE")
      .setDescription(
        `You can view the bot's changelogs and FAQ [here](https://groothm.smpworld.club/)`
      );
    message.channel.send(embed);
  }
};