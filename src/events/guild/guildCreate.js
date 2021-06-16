module.exports = {
    name: "guildCreate",
    run: (client) => {
        client.user.setActivity(`${client.guilds.cache.size} servers`, { type: "WATCHING" });
    }
};