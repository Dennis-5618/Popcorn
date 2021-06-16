module.exports = {
    name: "guildDelete",
    run: (client) => {
        client.user.setActivity(`${client.guilds.cache.size} servers`, { type: "WATCHING" });
    }
};