module.exports = {
    name: "ready",
    run: (client) => {
        console.log(`${client.user.username} is now online in ${client.guilds.cache.size} servers!`);
        client.user.setActivity(`${client.guilds.cache.size} servers`, { type: 'WATCHING' });
    }
};