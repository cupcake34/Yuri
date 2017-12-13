const db = require('quick.db')
const Discord = require('discord.js')
const randomColor = parseInt(`0x${(Math.random() * 0xFFFFFF << 0).toString(16)}`);

exports.run = (client, message, args) => {
    let embed = new Discord.RichEmbed()
    .setColor(randomColor)
    .setTitle("Invite me to your discord server!")
    .setURL(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`)
    message.channel.send({embed})
}