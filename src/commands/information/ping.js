module.exports = {
    name: "ping",
    aliases: ["pong"],
    category: "information",
    run: async (client, message) => {
        const msg = await message.channel.send("Pinging...");
        await msg.edit(`Web socket ping: \`${client.ws.ping}ms\` \nMessage edit ping: \`${msg.createdTimestamp - message.createdTimestamp}ms\``);
    }
};