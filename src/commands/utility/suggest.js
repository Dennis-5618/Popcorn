const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "suggest",
    category: "utility",
    description: "Suggest a command or feature for the bot",
    run: async (client, message, args) => {
        if (!args.length) return message.channel.send("Please also include a suggestion");

        const channel = message.guild.channels.cache.get("853229507640426517");
        await channel.send(new MessageEmbed()
            .setColor("#5865F2")
            .setTitle("Suggestion")
            .setDescription(`
        Author: \`${message.author.tag}\`
        Suggestion: \`${args.join(" ")}\``)
            .setFooter(`Author ID: ${message.author.id}`)
            .setTimestamp()
        );

        return message.channel.send(new MessageEmbed()
            .setColor("#5865F2")
            .setDescription("Thank you for your suggestion! I have sent it to my developer")
        );
    }
};