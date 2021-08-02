const settings = require("../../schemas/settings");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "channelDelete",
    run: async (client, data) => {
        const database = await settings.findOne({ Guild: data.guild.id });
        if (!database) return;

        const logChannel = data.guild.channels.cache.get(database.Logchannel);
        logChannel.send(new MessageEmbed()
            .setColor("#FF4C4C")
            .setAuthor(data.guild.name, data.guild.iconURL({ dynamic: true }))
            .setTitle("Channel created")
            .addField("Name:", data.name)
            .addField("Type:", data.type)
            .setFooter(`Channel ID: ${data.id}`)
            .setTimestamp()
        );
    }
};