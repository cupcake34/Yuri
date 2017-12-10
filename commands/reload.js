
const config = require("../config.json");

exports.run = (client, message, args) => {
    if (message.author.id === config.owner) {
        var arguments = message.content.substring().split(" ");
        if (!arguments || arguments.size < 1) return message.reply("Must provide a command name to reload.");
        delete require.cache[require.resolve(`./${arguments[1]}.js`)];
        message.channel.send(`The command **${arguments[1]}** has been reloaded`);
    } else {
        message.channel.send("Oops! Seems like you tried to run owner-only command!")
    }
};