const { MessageEmbed, version } = require("discord.js");
const { MessageButton } = require("discord-buttons");

module.exports = {
    name: "botinfo",
    category: "information",
    description: "Shows some statistics of the bot",
    run: async (client, message) => {
        const Github = new MessageButton()
            .setStyle("url")
            .setLabel("Github repository")
            .setURL("https://github.com/Dennis-5618/Popcorn")

        const embed = new MessageEmbed()
            .setColor("#5865F2")
            .setDescription(`
    > **Bot information**
    Prefix: \`p!\`
    Server count: \`${client.guilds.cache.size.toLocaleString()}\`
    User count: \`${client.users.cache.size.toLocaleString()}\`
    Command count: \`${client.commands.size}\`

    > **System information**
    Memory usage: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\`
    Discord.js version: \`v${version}\`
    `)

        message.channel.send({ embed, button: Github });
    }
};