const { MessageEmbed } = require("discord.js");
const settings = require("../../schemas/settings");

module.exports = {
    name: "channelCreate",
    run: async (client, data) => {
        const mongoDB = await settings.findOne({ Guild: data.guild.id });
        if (!mongoDB.Logchannel) return;

        const logs = client.channels.cache.get(mongoDB.Logchannel);
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(data.guild.name, data.guild.iconURL({ dynamic: true }))
            .setTitle("New channel created")
            .addField("Name:", data.name)
            .addField("Type:", data.type)
            .setFooter(`Channel ID: ${data.id}`)
            .setTimestamp()
        logs.send({ embeds: [embed] });
    }
};