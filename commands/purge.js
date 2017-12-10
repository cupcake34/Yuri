const config = require("../config.json");
const db = require('quick.db');

exports.run = (client, message, args) => {
    if (message.channel.permissionsFor(message.author).has('MANAGE_MESSAGES')) {
        if (args.length === 0) {
            message.channel.send('You need to provide number to delete!');
        } else if (args.length === 1) {
            message.channel.fetchMessages({
                limit: parseInt(args[0]) + 1
            }).then((messages) => {
                var channel_id = message.channel.name
                message.channel.bulkDelete(messages);
                db.fetchObject(`logChannel_${message.member.guild.id}`).then(i => {
                    if (!i.text) {
                        message.channel.sendMessage(`If you want to log all messages, make sure to make channel to log and then set it with ${config.prefix}logchannel command.`)
                    } else {
                        message.guild.channels.get(i.text).send(`:wastebasket: <@${message.author.id}> deleted ${args[0]} messages from **${channel_id}**.`)
                    }
                })
            });
        } else if (args.length === 2) {
            message.channel.fetchMessages({
                limit: parseInt(args[0]) + 1
            }).then((messages) => {
                let bulkMessages = [];
                var channel_id = message.channel.name
                messages.forEach((i) => {
                    if (i.author.id === args[1].replace(/@|<|>/g, "")) {
                        bulkMessages.push(i);
                    }
                });
                message.channel.bulkDelete(bulkMessages);
                db.fetchObject(`logChannel_${message.member.guild.id}`).then(i => {
                    if (!i.text) {
                        message.channel.sendMessage(`If you want to log all messages, make sure to make channel to log and then set it with ${config.prefix}logchannel command.`)
                    } else {
                        message.guild.channels.get(i.text).send(`:wastebasket: <@${message.author.id}> deleted ${args[0]} messages from **${channel_id}**.`)
                    }
                })
            });
        } else {
            message.channel.send('Invalid parameters for purge');
        }
    } else {
        message.channel.send("You do not have permissions to delete messages");
    }
}