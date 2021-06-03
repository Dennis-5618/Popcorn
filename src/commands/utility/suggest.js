const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "suggest",
    category: "utility",
    description: "Suggest a command or feature for the bot",
    run: async (client, message, args) => {
        if (!args.length) return message.channel.send("Please also include a suggestion");

        const channel = message.guild.channels.cache.get("849594107965210624");
        await channel.send(new MessageEmbed()
            .setColor("#8989ff")
            .setTitle("Suggestion")
            .setDescription(`
        Author: \`${message.author.tag}\`
        Suggestion: \`${args.join(" ")}\``)
            .setFooter(`Author ID: ${message.author.id}`)
            .setTimestamp()
        );

        return message.channel.send(new MessageEmbed()
            .setColor("#8989ff")
            .setDescription("Thank you for your suggestion! I have sent it to my developer")
        );
    }
};