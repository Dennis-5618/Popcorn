const { MessageEmbed } = require("discord.js");
const settings = require("../../schemas/settings");

module.exports = {
    name: "guildBanAdd",
    run: async (client, guild) => {
        const data = await settings.findOne({ Guild: guild.id });
        if (!data) return;

        const logChannel = client.channels.cache.get(data.Logchannel);

        const fetchedAudit = await guild.fetchAuditLogs({ type: "MEMBER_BAN_ADD", limit: 1 });
        const audit = fetchedAudit.entries.first();

        const { executor, target, reason } = audit;

        logChannel.send(new MessageEmbed()
            .setColor("#FF4C4C")
            .setTitle("Banned member")
            .addField("Banned user:", target, true)
            .addField("Banned by:", executor, true)
            .addField("Reason:", reason || "No reason specified")
            .setTimestamp()
        );
    }
};