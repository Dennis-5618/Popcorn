const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "guildBanRemove",
    run: async (client, guild) => {
        const mongoDB = await settings.findOne({ Guild: guild.guild.id });
        if (!mongoDB.Logchannel) return;

        const fetchedAudit = await guild.fetchAuditLogs({ type: "MEMBER_BAN_REMOVE", limit: 1 });
        const audit = fetchedAudit.entries.first();

        const { executor, target, reason } = audit;

        const logs = client.channels.cache.get(mongoDB.Logchannel);
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Member banned")
            .addField("Unbanned user:", target, true)
            .addField("Unbanned by:", executor, true)
            .addField("Reason", reason || "No reason has been specified")
            .setTimestamp()
        return logs.send({ embeds: [embed] });
    }
};