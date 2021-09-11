const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
    name: "vote",
    category: "information",
    description: "allows you to vote for Popcorn on it's top.gg page",
    run: async (client, message) => {
        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription("Click the button below to vote")
        
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setStyle("LINK")
                .setLabel("Vote")
                .setURL("https://top.gg/bot/848841605876023307/vote")
            )
        return message.channel.send({ embeds: [embed], components: [row] });
    }
};