const { apiToken } = require("../../../config.json");
const topgg = require("@top-gg/sdk");
const api = new topgg.Api(apiToken);

module.exports = {
    name: "ready",
    run: (client) => {
        console.log(`${client.user.username} is now online in ${client.guilds.cache.size} servers!`);
        client.user.setActivity(`${client.guilds.cache.size} servers`, { type: 'WATCHING' });

        setInterval(() => {
            api.postStats({ serverCount: client.guilds.cache.size });
            console.log(`Posted servercount to top.gg | ${client.guilds.cache.size} servers`);
        }, 1800000);
    }
};