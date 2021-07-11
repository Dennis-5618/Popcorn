module.exports = {
    name: "guildCreate",
    run: (client) => {
        client.user.setActivity(`${client.guilds.cache.size} servers`, { type: "WATCHING" });

        console.log(`Joined a new server! | Total servers: ${client.guilds.cache.size}`);
    }
};