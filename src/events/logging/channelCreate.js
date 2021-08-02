const { MessageEmbed } = require("discord.js");
const settings = require("../../schemas/settings")

module.exports = {
    name: "channelCreate",
    run: async (client, data) => {
        const database = await settings.findOne({ Guild: data.guild.id });
        if (!database) return;

        const logChannel = data.guild.channels.cache.get(database.Logchannel);
        logChannel.send(new MessageEmbed()
            .setColor("#2ecc71")
            .setAuthor(data.guild.name, data.guild.iconURL({ dynamic: true }))
            .setTitle("Channel created")
            .addField("Name:", data.name)
            .addField("Type:", data.type)
            .setFooter(`Channel ID: ${data.id}`)
            .setTimestamp()
        );
    }
};