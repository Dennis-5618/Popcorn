module.exports = {
    name: "restart",
    category: "utility",
    run: async (client, message) => {
        if (message.author.id != "294821968887152641") return;
        await message.channel.send("Restarting");
        process.exit();
    }
};