const { MessageButton } = require("discord-buttons");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "vote",
    aliases: ["aliases"],
    category: "information",
    description: "allows you to vote on Popcorns top.gg page",
    run: async (client, message, args) => {
        const vote = new MessageButton()
        .setStyle("url")
        .setLabel("Vote")
        .setURL("https://top.gg/bot/848841605876023307/vote")

        const embed = new MessageEmbed()
        .setColor("#5865F2")
        .setDescription("Click the button below to vote on Popcorn")

        message.channel.send({ embed, button: vote });
    }
};