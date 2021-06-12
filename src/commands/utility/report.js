const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "report",
    category: "utility",
    description: "Report a bug or error with the bot",
    run: async (client, message, args) => {
        if (!args.length) return message.channel.send("please also include something you want to report");

        const reportChannel = message.guild.channels.cache.get("853229555144589322");
        await reportChannel.send(new MessageEmbed()
            .setColor("#5865F2")
            .setTitle("Report")
            .setDescription(`
        Author: \`${message.author.tag}\`
        Report: \`${args.join(" ")}\``)
            .setFooter(`Author ID: ${message.author.id}`)
            .setTimestamp()
        );

        return message.channel.send(new MessageEmbed()
            .setColor("#5865F2")
            .setDescription(`Thank you for reporting your issue! I have sent your report to my developer`)
        );
    }
};