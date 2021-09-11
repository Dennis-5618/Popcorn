const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
    name: "botinvite",
    aliases: ["botinv"],
    category: "utility",
    description: "sends a link so you can invite Popcorn into your own server",
    run: async (client, message) => {
        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription("Click on the buttons below to invite Popcorn or get support")

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle("LINK")
                    .setLabel("Invite")
                    .setURL("https://discord.com/api/oauth2/authorize?client_id=848841605876023307&permissions=2617370710&scope=bot%20applications.commands"),

                new MessageButton()
                    .setStyle("LINK")
                    .setLabel("Support")
                    .setURL("https://discord.gg/qAE2chcEn4")
            )
        return message.channel.send({ embeds: [embed], components: [row] });
    }
};