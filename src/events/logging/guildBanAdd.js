const { MessageEmbed } = require("discord.js");
const settings = require("../../schemas/settings");

module.exports = {
    name: "guildBanAdd",
    run: async (client, guild) => {
        const mongoDB = await settings.findOne({ Guild: guild.guild.id });
        if (!mongoDB.Logchannel) return;

        const fetchedAudit = await guild.fetchAuditLogs({ type: "MEMBER_BAN_ADD", limit: 1 });
        const audit = fetchedAudit.entries.first();

        const { executor, target, reason } = audit;

        const logs = client.channels.cache.get(mongoDB.Logchannel);
        const embed = new MessageEmbed()
            .setColor("RED")
            .setTitle("Member banned")
            .addField("Banned user:", target, true)
            .addField("Banned by:", executor, true)
            .addField("Reason", reason || "No reason has been specified")
            .setTimestamp()
        return logs.send({ embeds: [embed] });
    }
};