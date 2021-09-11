module.exports = {
    name: "guildCreate",
    run: async (client) => {
        client.user.setActivity(`${client.guilds.cache.size} servers`, { type: "WATCHING" });
    }
};