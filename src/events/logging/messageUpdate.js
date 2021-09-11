const { MessageEmbed } = require("discord.js");
const settings = require("../../schemas/settings");

module.exports = {
    name: "messageUpdate",
    run: async (client, oldMessage, newMessage) => {
        const mongoDB = await settings.findOne({ Guild: newMessage.guild.id });
        if (!mongoDB.Logchannel) return;

        const logs = client.channels.cache.get(mongoDB.Logchannel);
        const embed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Message updated")
            .addField("Channel:", message.channelId)
            .addField("Before", oldMessage.content)
            .addField("After:", newMessage.content)
            .setFooter(`Message ID: ${newMessage.id}`)
            .setTimestamp()
        return logs.send({ embeds: [embed] });
    }
};