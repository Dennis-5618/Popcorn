const { MessageEmbed } = require("discord.js");
const settings = require("../../schemas/settings");

module.exports = {
    name: "messageDelete",
    run: async (client, message) => {
        const mongoDB = await settings.findOne({ Guild: message.guild.id });
        if (!mongoDB.Logchannel || message.partial || message.system || message.author.bot) return;
        
        const logs = client.channels.cache.get(mongoDB.Logchannel);
        const embed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Message deleted")
            .addField("Channel:", message.channelId)
            .addField("Content:", message.content)
            .setFooter(`Message ID: ${message.id}`)
            .setTimestamp()
        return logs.send({ embeds: [embed] });
    }
};