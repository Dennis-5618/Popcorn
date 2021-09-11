const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "suggest",
    category: "utility",
    description: "suggest a new command or feature to be added to Popcorn",
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("You also need to include something you want to suggest");

        const guildEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription("Thank you for your suggestion! Your suggestion will be looked at shortly");
        message.channel.send({ embeds: [guildEmbed] });

        const suggestionChannel = client.channels.cache.get("853229507640426517");
        const suggestionEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .addField("Author:", `\`${message.author.tag}\``)
            .addField("Suggestion:", `\`${args.join(" ")}\``)
            .setTimestamp()
        suggestionChannel.send({ embeds: [suggestionEmbed] });
    }
};