const { MessageButton, MessageActionRow } = require("discord-buttons");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "invite",
    aliases: ["inv", "support"],
    category: "utility",
    description: "sends a link for inviting Popcorn to your server",
    run: async (client, message) => {
        const embed = new MessageEmbed()
        .setColor("#5865F2")
        .setAuthor("Click on the button below to invite Popcorn or get support")

        const inviteButton = new MessageButton()
        .setStyle("url")
        .setLabel("Invite Popcorn")
        .setURL("https://discord.com/api/oauth2/authorize?client_id=848841605876023307&permissions=2617370710&scope=bot%20applications.commands")

        const supportButton = new MessageButton()
        .setStyle("url")
        .setLabel("Support server")
        .setURL("https://discord.gg/U43ty2vA4y")

        const buttonRow = new MessageActionRow()
            .addComponent(inviteButton)
            .addComponent(supportButton)

        message.channel.send({ embed, component: buttonRow})
    }
};