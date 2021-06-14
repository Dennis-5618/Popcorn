module.exports = {
    name: "ready",
    run: (client) => {
        console.log(`${client.user.username} is now online in ${client.guilds.cache.size} servers!`);
    }
};