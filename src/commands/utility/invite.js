const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "invite",
    aliases: ["inv"],
    category: "utility",
    description: "sends a link for inviting Popcorn to your server",
    run: async (client, message) => {
        return message.channel.send(new MessageEmbed()
            .setColor("#5865F2")
            .setDescription("Click [here](https://discord.com/api/oauth2/authorize?client_id=848841605876023307&permissions=2617370710&scope=bot%20applications.commands) to invite Popcorn into your server")
        );
    }
};