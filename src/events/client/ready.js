const { apiToken } = require("../../../config.json");
const topgg = require("@top-gg/sdk");
const api = new topgg.Api(apiToken);

module.exports = {
    name: "ready",
    run: client => {
        console.log(`${client.user.username} is now online!`);
        client.user.setActivity(`${client.guilds.cache.size} servers`, { type: "WATCHING" });

        setInterval(() => {
            api.postStats({ serverCount: client.guilds.cache.size });
        }, 1800000);
    }
};