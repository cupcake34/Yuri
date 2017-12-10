const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const db = require('quick.db');


client.on("ready", () => {
    console.log(`---------------------`);
    console.log(`Logged in as ${client.user.username} (${client.user.tag})`)
    console.log(`ID: ${client.user.id}`)
    console.log(`Guilds: ${client.guilds.array().length}`)
    console.log(`---------------------`)
});

client.on("message", message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    // This is the best way to define args. Trust me.
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // The list of if/else is replaced with those simple 2 lines:
    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error(err);
    }
});

//Join stuff
client.on("guildCreate", guild => {
    let general = guild.channels.get("general")
    if (!general) return;
    general.send(`:wave: Hi!\nI'm Yuri the Discord Bot!\nI have Moderation and Welcome features.\nTo get started type **${config.prefix}help** to get full list of my commands.\nEnjoy and have fun!`)
    guild.owner.send(`:wave: Hi!\nI'm Yuri the Discord Bot!\nI have Moderation and Welcome features.\nTo get started type **${config.prefix}help** to get full list of my commands.\nEnjoy and have fun!`)
})

//Game Stuff
client.on('ready', () => {
    client.user.setPresence({
        game: {
            name: `on ${client.guilds.array().length} servers with ${client.users.size} members!`,
            type: 0
        }
    })
    setTimeout(game2, 30000)
})

function game1() {
    client.user.setPresence({
        game: {
            name: `on ${client.guilds.array().length} servers with ${client.users.size} members!`,
            type: 0
        }
    })
    setTimeout(game2, 30000)
}

function game2() {
    client.user.setPresence({
        game: {
            name: `Confused? ${config.prefix}help !`,
            type: 0
        }
    })
    setTimeout(game3, 30000)
}

function game3() {
    client.user.setPresence({
        game: {
            name: `Want me on your discord server? ${config.prefix}invite !`,
            type: 0
        }
    })
    setTimeout(game1, 30000)
}


// Welcome Stuff
client.on('guildMemberAdd', member => {
    db.fetchObject(`welcomeChannel_${member.guild.id}`).then(i => {
        db.fetchObject(`welcomeDMText_${member.guild.id}`).then(o => {
            if (!o.text) console.log("o.text not found")
            else member.send(o.text.replace('%USER%', member).replace('%GUILD_MEMBER_COUNT%', member.guild.memberCount).replace('%USER_TAG%', member.tag).replace('%GUILD_NAME%', member.guild.name))
            if (!member.guild.channels.get(i.text)) console.log("channel not found")
            db.fetchObject(`welcomeText_${member.guild.id}`).then(p => {
                if (!p.text) console.log("p.text not found")
                else member.guild.channels.get(i.text).send(p.text.replace('%USER%', member).replace('%GUILD_MEMBER_COUNT%', member.guild.memberCount).replace('%USER_TAG%', member.user.tag).replace('%GUILD_NAME%', member.guild.name))
            })
        })
    })
});

client.on('guildMemberRemove', member => {
    db.fetchObject(`welcomeChannel_${member.guild.id}`).then(i => {
        if (!member.guild.channels.get(i.text)) return console.log('i.text not found')
        db.fetchObject(`welcomeLeaveText_${member.guild.id}`).then(o => {
            if (!o.text) console.log('o.text not found')
            else member.guild.channels.get(i.text).send(o.text.replace('%USER%', member).replace('%GUILD_MEMBER_COUNT%', member.guild.memberCount).replace('%USER_TAG%', member.user.tag).replace('%GUILD_NAME%', member.guild.name))
        })
    })
});

client.login(config.token);