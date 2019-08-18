const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const db = require('quick.db');
var request = require("superagent");
const moment = require("moment")
require("moment-duration-format")


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

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        let commandFile = require(`./commands/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error(err);
    }
});

//Join stuff
client.on("guildCreate", guild => {
    guild.owner.send(`:wave: Hi!\nI'm Yuri the Discord Bot!\nI have Moderation and Welcome features.\nTo get started type **${config.prefix}help** to get full list of my commands.\nEnjoy and have fun!`)
    db.updateText(`welcomeText_${guild.id}`, `:wave: Welcome %USER% to the **%GUILD_NAME%**! You are %GUILD_MEMBER_COUNT%th member!`)
    db.updateText(`welcomeLeaveText_${guild.id}`, `Oof... Looks like **%USER_TAG%** left. Good bye...`)

    request
    .post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
    .send(`{ "server_count": ${client.guilds.size},
    "shards": [${client.guilds.size}],
    "shard_count": ${client.guilds.size} }`)
    .type('application/json')
    .set('Authorization', config.discordbotsorg)
    .set('Accept', 'application/json')
    .end(err => {
        if (err) return console.error(err);
        console.log("Posted stats to disordbots.org!");
    });
})

client.on("guildRemove", guild => {
    request
    .post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
    .send(`{ "server_count": ${client.guilds.size},
    "shards": [${client.guilds.size}],
    "shard_count": ${client.guilds.size} }`)
    .type('application/json')
    .set('Authorization', config.discordbotsorg)
    .set('Accept', 'application/json')
    .end(err => {
        if (err) return console.error(err);
        console.log("Posted stats to disordbots.org!");
    });
})

//Game Stuff
client.on('ready', () => {
    request
    .post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
    .send(`{ "server_count": ${client.guilds.size},
    "shards": [${client.guilds.size}],
    "shard_count": ${client.guilds.size} }`)
    .type('application/json')
    .set('Authorization', config.discordbotsorg)
    .set('Accept', 'application/json')
    .end(err => {
        if (err) return console.error(err);
        console.log("Posted stats to disordbots.org!");
    });

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
            name: `Confused? Usage ${config.prefix}help`,
            type: 0
        }
    })
    setTimeout(game3, 30000)
}

function game3() {
    client.user.setPresence({
        game: {
            name: `Want me on your discord server? Use ${config.prefix}invite`,
            type: 0
        }
    })
    setTimeout(game4, 30000)
}

function game4() {
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    client.user.setPresence({
        game: {
            name: `you can contact my owner for more commands`,
            type: 0
        }
    })
    setTimeout(game5, 30000)
}

function game5() {
    client.user.setPresence({
        game: {
            name:`with ${Clint.user.size} users`,
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
