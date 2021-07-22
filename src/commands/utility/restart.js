module.exports = {
    name: "restart",
    category: "utility",
    run: async (client, message) => {
        if (message.author.id != "294821968887152641") return message.channel.send("This command is only available for the bot owner");
        await message.channel.send("Restarting...");
        process.exit();
    }
};