const { Client, Collection, Intents } = require("discord.js");
const { token, database } = require("../config.json");
const { promisify } = require("util");
const mongoose = require("mongoose");
const glob = require("glob");

const globPromise = promisify(glob);
const client = new Client({ ws: { intents: Intents.ALL }, partials: ["CHANNEL", "MESSAGE", "REACTION"] });

mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

client.categories = new Set();

client.events = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();

(async () => {
    const eventFiles = await globPromise(`${__dirname}/events/**/*.js`);
    eventFiles.map((value) => {
        const file = require(value);
        client.events.set(file.name, file);
        client.on(file.name, file.run.bind(null, client));
    });

    const commandFiles = await globPromise(`${__dirname}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        client.commands.set(file.name, file);
        client.categories.add(file.category);
        if (file.aliases) {
            file.aliases.map((value) => client.aliases.set(value, file.name));
        };
    });
})();

client.login(token);