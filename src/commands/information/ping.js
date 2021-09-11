module.exports = {
    name: "ping",
    category: "information",
    run: async (client, message) => {
        const msg = await message.channel.send("Pinging...");
        msg.edit(`WebSocket: \`${client.ws.ping}ms\` \nMessage edit: \`${msg.createdTimestamp - message.createdTimestamp}ms\``);
    }
};