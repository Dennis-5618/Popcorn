const { MessageEmbed, version } = require("discord.js")

module.exports = {
    name: "botinfo",
    category: "information",
    description: "returns some statistics about Popcorn",
    run: async (client, message) => {
        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`
            > **Bot information**
            Prefix: \`p!\`
            Shard count: \`${client.options.shardCount}\`
            Server count: \`${client.guilds.cache.size.toLocaleString()}\`
            Member count: \`${client.users.cache.size.toLocaleString()}\`
            Command count: \`${client.commands.size}\`

            > **System information**
            Memory usage: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\`
            Discord.js: \`v${version}\`
            `)
        return message.channel.send({ embeds: [embed] });
    }
};