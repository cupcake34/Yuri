exports.run = (client, message, args) => {
    
        if (message.channel.type === "dm") {
            message.reply("commands are not enabled in private messages")
        } else {
            if (message.author.id === "285399206708117504") {
                message.channel.send("Alright! I'm restarting. See you soon!").then(() => process.exit());
            } else {
                console.log(message.author.tag + " tried to restart the bot in " + message.guild.name + ".")
                message.channel.sendMessage("Only Shaz#2133 can use this")
            }
        }
    }