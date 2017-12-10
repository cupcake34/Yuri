const Discord = require("discord.js");
const db = require('quick.db');
const config = require("../config.json");

exports.run = (client, message, args) => {
    let banMember = message.guild.member(message.mentions.users.first());
    let reason = args.slice(1).join(' ');

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`You don't have permissions to execute this command!\nYou require **BAN_MEMBERS** permission!`)
    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.channel.send("Uh! Seems like I don't have permissions to execute this command!")
    if (!banMember) return message.channel.send(`Missing arguments!\nUsage: ${config.prefix}ban [@user] [reason]`)
    if (banMember.hasPermission("BAN_MEMBERS")) return message.channel.send("Uh! Seems like mentioned person has more power than me!")
    if (!reason) return message.channel.send(`Missing arguments!\nUsage: ${config.prefix}ban [@user] [reason]`)

    message.guild.member(banMember).ban();
    message.channel.send(`Done! :smiley:\nI banned **${banMember}** for **${reason}** !`)

    db.fetchObject(`logChannel_${message.guild.id}`).then(i => {
        if (!i.text) return message.channel.send(`Log channel is missing! If you want to log all messages, make sure to make channel and then set it with ${config.prefix}logchannel command!`)
        message.guild.channels.get(i.text).send(`<@${message.author.id}> banned ${banMember} for **${reason}**`)
    })
}