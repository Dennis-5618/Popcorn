const { MessageEmbed } = require("discord.js");
const settings = require("../../schemas/settings");

module.exports = {
    name: "messageDelete",
    run: async (client, message) => {
        const data = await settings.findOne({ Guild: message.guild.id });
        if (!data || message.partial || message.system || message.author.bot) return;

        const logChannel = client.channels.cache.get(data.Logchannel);

        const embed = new MessageEmbed()
            .setColor("#FF4C4C")
            .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
            .setTitle("Message deleted")
            .addField("Channel:", message.channel)
            .addField("Content:", message.content)
            .setFooter(`Message ID: ${message.id}`)
            .setTimestamp()

        logChannel.send(embed);
    }
};