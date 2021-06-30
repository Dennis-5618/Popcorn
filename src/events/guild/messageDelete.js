const { MessageEmbed } = require("discord.js");
const settings = require("../../schemas/settings");

module.exports = {
    name: "messageDelete",
    run: async (client, message) => {
        const data = await settings.findOne({ Guild: message.guild.id });
        if (!data || message.partial || message.system) return;

        const logChannel = client.channels.cache.get(data.LogChannel);

        const embed = new MessageEmbed()
            .setColor("#FF4C4C")
            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
            .addField("Channel:", message.channel)
            .addField("Content:", message.content)
            .setFooter(`Message ID: ${message.id}`)
            .setTimestamp()

        logChannel.send(embed);
    }
};