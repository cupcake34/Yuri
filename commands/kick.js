const Discord = require("discord.js");
const db = require('quick.db');
const config = require("../config.json");

exports.run = (client, message, args) => {
    let kickMember = message.guild.member(message.mentions.users.first());
    let reason = args.slice(1).join(' ');

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`You don't have permissions to execute this command!\nYou require **KICK_MEMBERS** permission!`)
    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.channel.send("Uh! Seems like I don't have permissions to execute this command!")
    if (!kickMember) return message.channel.send(`Missing arguments!\nUsage: ${config.prefix}kick [@user] [reason]`)
    if (kickMember.hasPermission("KICK_MEMBERS")) return message.channel.send("Uh! Seems like mentioned person has more power than me!")
    if (!reason) return message.channel.send(`Missing arguments!\nUsage: ${config.prefix}kick [@user] [reason]`)

    message.guild.member(kickMember).kick();
    message.channel.send(`Done! :smiley:\nI kicked **${kickMember}** for **${reason}** !`)

    db.fetchObject(`logChannel_${message.guild.id}`).then(i => {
        if (!i.text) return message.channel.send(`Log channel is missing! If you want to log all messages, make sure to make channel and then set it with ${config.prefix}logchannel command!`, 12000)
        let embed = new Discord.RichEmbed()
        .setTimestamp()
        .setColor(0x990000)
        .setTitle("Action: Kick")
        .addField("User", kickMember, true)
        .addField("Moderator", message.author.tag, true)
        .addField("Reason", reason)
    message.guild.channels.get(i.text).send({embed})
    })
}