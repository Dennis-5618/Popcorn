module.exports = {
    name: "channelDelete",
    run: async (client, data) => {
        const database = await settings.findOne({ Guild: data.guild.id });
        if (!database) return;

        const logChannel = data.guild.channels.cache.get(database.Logchannel);
        logChannel.send(new MessageEmbed()
            .setColor("#FF4C4C")
            .setTitle("Channel deleted")
            .addField("Channel name:", data.name, true)
            .addField("Channel type:", data.type, true)
        );
    }
};