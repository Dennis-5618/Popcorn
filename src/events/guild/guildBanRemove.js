const { MessageEmbed } = require("discord.js");
const settings = require("../../schemas/settings");

module.exports = {
    name: "guildBanRemove",
    run: async (client, guild, user) => {
        const data = await settings.findOne({ Guild: guild.id });
        if (!data) return;

        const logChannel = client.channels.cache.get(data.Logchannel);

        const fetchedAudit = await guild.fetchAuditLogs({ type: "MEMBER_BAN_ADD", limit: 1 });
        const audit = fetchedAudit.entries.first();

        const { executor, target, reason } = audit;

        logChannel.send(new MessageEmbed()
            .setColor("#5865F2")
            .setTitle("Unbanned member")
            .addField("Unbanned user:", target, true)
            .addField("Unbanned by:", executor, true)
            .addField("Reason:", reason || "No reason specified")
            .setTimestamp()
        );
    }
};