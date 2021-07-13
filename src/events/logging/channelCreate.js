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
            .setTitle("Channel created")
            .addField("Channel name:", data.name, true)
            .addField("Channel type:", data.type, true)
        );
    }
};