const { MessageEmbed } = require("discord.js");
const settings = require("../../schemas/settings");

module.exports = {
    name: "channelDelete",
    run: async (client, data) => {
        const mongoDB = await settings.findOne({ Guild: data.guild.id });
        if (!mongoDB.Logchannel) return;

        const logs = client.channels.cache.get(mongoDB.Logchannel);
        const embed = new MessageEmbed()
        .setColor("RED")
        .setAuthor(data.guild.name, data.guild.iconURL({ dynamic: true }))
        .setTitle("Channel deleted")
        .addField("Name:", data.name)
        .addField("Type:", data.type)
        .setFooter(`Channel ID: ${data.id}`)
        .setTimestamp()
    logs.send({ embeds: [embed] });
    }
};