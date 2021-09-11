const { Client, Collection, Intents } = require("discord.js");
const { token, database } = require("../config.json");
const { promisify } = require("util");
const mongoose = require("mongoose");
const glob = require("glob");

mongoose.connect(database);

const globPromise = promisify(glob);
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] });

client.categories = new Set();
client.events = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();

(async () => {
    const eventFiles = await globPromise(`${__dirname}/events/**/*.js`);
    eventFiles.map((res) => {
        const file = require(res);
        client.events.set(file.name, file);
        client.on(file.name, file.run.bind(null, client));
    });

    const commandFiles = await globPromise(`${__dirname}/commands/**/*.js`);
    commandFiles.map((res) => {
        const file = require(res);
        client.commands.set(file.name, file);
        client.categories.add(file.category);
        if (file.aliases) file.aliases.map((res) => client.aliases.set(res, file.name));
    });
})();

client.login(token);