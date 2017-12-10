const Discord = require("discord.js");
exports.run = (client, message, args) => {
    let embed = new Discord.RichEmbed()
    .setColor(0xc6e2ff)
    .addField("Moderation Commands", ` ban - Ban's the member\n kick - Kick's the member\n lockdown - Lock's the channel for x time\n mute - Mute's a member\n purge - Delete's x last messages\n unmute - Unmute's the member`)
    .addField("Welcome Commands", ` welcome - Display's all welcome commands\n welcomechannel - Set's the welcome channel\n welcomedm - Set's the welcome dm message\n welcomeleave - Set's the leave message\n welcomemessage - Set's the welcome message`)
    .addField("Other commands", ` config - Display's current's guild config\n logchannel - Set's the log channel`)
    message.channel.send({embed})
}