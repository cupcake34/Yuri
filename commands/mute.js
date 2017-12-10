const Discord = require('discord.js');
const db = require('quick.db');
exports.run = (client, message, args) => {
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`You don't have permissions to execute this command!\nYou require **KICK_MEMBERS** permission!`)
    if (!user) return message.channel.send(`Incorrect usage!\nUsage: ${config.prefix}mute [@user] [reason]`)
    if (!reason) return message.channel.send(`Incorrect usage!\nUsage: ${config.prefix}mute [@user] [reason]`)
    if (!muteRole) return message.channel.send(`The **Muted** role is missing.\nPlease create one and make sure they cannot send messages!`)

    message.guild.member(user).addRole(muteRole)
    message.channel.send(`Done! :wink:\nI muted ${user} for **${reason}** !`)

    db.fetchObject(`logChannel_${message.guild.id}`).then(i => {
        if (!i.text) return message.channel.send(`Log channel is missing! If you want to log all messages, make sure to make channel and then set it with ${config.prefix}logchannel command!`)
        message.guild.channels.get(i.text).send(`<@${message.author.id}> muted ${user} for **${reason}**`)
    })
}