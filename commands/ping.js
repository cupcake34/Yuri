exports.run = (client, message, args) => {
    message.channel.send("Hold on. Pinging...").then(pong => {
        pong.edit(`:ping_pong: Pong!\nLatency: **${pong.createdTimestamp - message.createdTimestamp}ms**\nAPI Latency: **${Math.round(client.ping)}ms**`)
    })
}