const db = require('quick.db')
const Discord = require("discord.js");
const config = require("../config.json");

exports.run = (client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("This command requires the **ADMINISTRATOR** permission")
    if (!message.mentions.channels.first() && args.join(" ").toUpperCase() !== 'NONE') return message.channel.send(`Usage: ${config.prefix}logchannel #channel`)

    let newChannel;
    if (args.join(" ").toUpperCase() === 'NONE') newChannel = '';
    else newChannel = message.mentions.channels.first().id;

    db.updateText(`logChannel_${message.guild.id}`, newChannel).then(i => {
        message.channel.send(`Successfully updated log channel to **${message.mentions.channels.first()}**`)
    })
}