const Discord = require("discord.js");
const db = require('quick.db');
const config = require("../config.json");

exports.run = (client, message, args) => {
    let warnMember = message.guild.member(message.mentions.users.first());
    let reason = args.slice(1).join(' ');
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have permissions! You need **KICK_MEMBERS** permission!")
    if (!warnMember) return message.channel.send(`Incorrect usage!\nUsage: ${config.prefix}warn [@user] [reason]`)
    if (!reason) return message.channel.send(`Incorrect usage!\nUsage: ${config.prefix}warn [@user] [reason]`)
    if (warnMember.id === message.author.id) return message.channel.send(`You can't warn yourself. Self-harm is bad :pensive:`)

    message.guild.member(warnMember).send({
        embed: new Discord.RichEmbed()
            .setColor(0xf40000)
            .addField("Warned!", "You received warning!")
            .addField("Moderator", message.author.tag)
            .addField("Reason", reason)
    })
    message.channel.send(`Done! :wink:\nI warned ${warnMember} for ${reason}`)

    db.fetchObject(`logChannel_${message.guild.id}`).then(i => {
        if (!i.text) return message.channel.send(`Log channel is missing! If you want to log all messages make sure to make log channel and then set it with **${config.prefix}logchannel command!**`)

        let embed = new Discord.RichEmbed()
        .setTimestamp()
        .setColor(0xc6e2ff)
        .setTitle("Action: Warn")
        .addField("User", warnMember, true)
        .addField("Moderator", message.author.tag, true)
        .addField("Reason", reason)
        message.guild.channels.get(i.text).send({
            embed: embed
        })
    })
}