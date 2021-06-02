const { MessageEmbed, version } = require("discord.js")

module.exports = {
    name: "botinfo",
    category: "information",
    description: "Shows some statistics of the bot",
    run: async (client, message) => {
        message.channel.send(new MessageEmbed()
            .setColor("#ff6666")
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
        );
    }
};