const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "report",
    category: "utility",
    description: "reports an issue with Popcorn",
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("You also need to include something you want to report");

        const guildEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`Thank you for reporting your issue! Your report will be looked at shortly`)
        message.channel.send({ embeds: [guildEmbed] });

        const reportChannel = client.channels.cache.get("885948202422009907");
        const reportEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .addField("Author:", `\`${message.author.tag}\``)
            .addField("Report:", `\`${args.join(" ")}\``)
            .setTimestamp()
        reportChannel.send({ embeds: [reportEmbed] });
    }
};