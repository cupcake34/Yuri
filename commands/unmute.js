const Discord = require('discord.js');
const db = require('quick.db');

exports.run = (client, message, args) => {
    let user = message.mentions.users.first();
    let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`You don't have permissions to execute this command!\nYou require **KICK_MEMBERS** permission!`)
    if (!user) return message.channel.send(`Incorrect usage!\nUsage: ${config.prefix}mute [@user]`)

    message.guild.member(user).removeRole(muteRole)
    message.channel.send(`Done! :wink:\nI unmuted ${user} !`)

    db.fetchObject(`logChannel_${message.guild.id}`).then(i => {
        if (!i.text) return message.channel.send(`Log channel is missing! If you want to log all messages, make sure to make channel and then set it with ${config.prefix}logchannel command!`)
        message.guild.channels.get(i.text).send(`<@${message.author.id}> unmuted ${user}`)
    })
}