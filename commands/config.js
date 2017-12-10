const db = require('quick.db')
const Discord = require('discord.js')
const randomColor = parseInt(`0x${(Math.random() * 0xFFFFFF << 0).toString(16)}`);

exports.run = (client, message, args) => {
    let welcomeChannel
    let logChannel
    let welcomeText
    let leaveText
    let joinDMText

    db.fetchObject(`welcomeChannel_${message.guild.id}`).then(welcomeChannelIDFetched => {
        if (!message.guild.channels.get(welcomeChannelIDFetched.text)) welcomeChannel = 'none'
        else welcomeChannel = message.guild.channels.get(welcomeChannelIDFetched.text)

        db.fetchObject(`welcomeDMText_${message.guild.id}`).then(joinDMTextFetched => {
            if (!joinDMTextFetched.text) joinDMText = 'none'
            else joinDMText = joinDMTextFetched.text

            db.fetchObject(`welcomeText_${message.guild.id}`).then(welcomeTextFetched => {
                if (!welcomeTextFetched.text) welcomeText = 'none'
                else welcomeText = welcomeTextFetched.text

                db.fetchObject(`welcomeLeaveText_${message.guild.id}`).then(leaveTextFetched => {

                    if (!leaveTextFetched.text) leaveText = 'none'
                    else leaveText = leaveTextFetched.text

                    db.fetchObject(`logChannel_${message.guild.id}`).then(logChannelIDFetched => {
                        if (!message.guild.channels.get(logChannelIDFetched.text)) logChannel = 'none'
                        else logChannel = message.guild.channels.get(logChannelIDFetched.text)

                        const embed = new Discord.RichEmbed()
                            .setColor(randomColor)
                            .addField(`**Welcome Channel**`, `> ${welcomeChannel}\n`)
                            .addField(`**Log Channel**`, `> ${logChannel}\n`)
                            .addField(`**Welcome Message**`, `> ${welcomeText}\n`)
                            .addField(`**Leave Message**`, `> ${leaveText}\n`)
                            .addField(`**Welcome DM Text**`, `> ${joinDMText}\n`)
                        message.channel.send({
                            embed
                        })
                    })
                })
            })
        })
    })
}