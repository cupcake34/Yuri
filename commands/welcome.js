// Remember, you can change the name of the command by changing the name of the javscript file (make sure its lowercase)

// Now, lets start by making it so that we can edit those values.

// Require Packages
const db = require('quick.db')
const Discord = require("discord.js");

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor(0x00ff00)
    .addField("All Available Welcome Commands", "  welcomemessage - Set's welcome message\n welcomechannel - Set's welcome channel\n welcomedm - Set's welcome DM message\n welcomeleave - Set's welcome leave message.")
    message.channel.send({embed})
}