const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "serverinfo",
    aliases: ["guildinfo"],
    category: "information",
    description: "sends some information about the current server",
    run: async (client, message) => {
        const emojis = message.guild.emojis.cache;
        const channels = message.guild.channels.cache;
        const roles = message.guild.roles.cache.sort((a, b) => b.position = a.position).map(r => r.toString());
        const verificationLevel = { NONE: "none", LOW: "low", MEDIUM: "medium", HIGH: "high", VERY_HIGH: "very high" };

        message.channel.send(new MessageEmbed()
            .setColor("#5865F2")
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setDescription(`
            > **General information**
            Name: \`${message.guild.name}\`
            ID: \`${message.guild.id}\`
            Owner: \`${message.guild.owner.user.tag}\`
            Region: \`${message.guild.region}\`
            Boost level: \`${message.guild.premiumTier ? `tier: ${message.guild.premiumTier}` : "none"}\`
            Verification level: \`${verificationLevel[message.guild.verificationLevel]}\`

            > **Channels & roles**
            Total channels: \`${channels.size}\`
            Text channels: \`${channels.filter(ch => ch.type == "text").size}\`
            Voice channels: \`${channels.filter(ch => ch.type == "voice").size}\`
            Roles: \`${roles.length}\`

            > **Members**
            Total members: \`${message.guild.memberCount}\`
            Humans: \`${message.guild.members.cache.filter(m => !m.user.bot).size}\`
            Bots: \`${message.guild.members.cache.filter(m => m.user.bot).size}\`

            > **Emojis**
            Standard emojis: \`${emojis.filter(e => !e.animated).size}\`
            Animated emojis: \`${emojis.filter(e => e.animated).size}\`
            `)
            .setFooter(`Server creation date: ${new Date(message.guild.createdTimestamp)}`)
        );
    }
};