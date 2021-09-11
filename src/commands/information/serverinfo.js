const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "serverinfo",
    aliases: ["guildinfo"],
    category: "information",
    description: "returns some information about the current server",
    run: async (client, message) => {
        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setDescription(`
            > **General information**
            Name: \`${message.guild.name}\`
            ID: \`${message.guild.id}\`
            Owner: \`${message.guild.members.cache.get(message.guild.ownerId).user.tag}\`
            Region: \`${message.guild.region}\`
            Boost level: \`${message.guild.premiumTier}\`
            Boost count: \`${message.guild.premiumSubscriptionCount}\`
            Verification level: \`${message.guild.verificationLevel}\`
            
            > **Roles and channels**
            Roles: \`${(message.guild.roles.cache.sort((a, b) => b.position = a.position).map(r => r.toString())).length}\`
            Total channels: \`${message.guild.channels.cache.size}\`
            Categories: \`${message.guild.channels.cache.filter(ch => ch.type == "GUILD_CATEGORY").size}\`
            Text channels: \`${message.guild.channels.cache.filter(ch => ch.type == "GUILD_TEXT").size}\`
            Voice channels: \`${message.guild.channels.cache.filter(ch => ch.type == "GUILD_VOICE").size}\`

            > **Members**
            Total members: \`${message.guild.memberCount}\`
            Humans: \`${message.guild.members.cache.filter(m => !m.user.bot).size}\`
            Bots: \`${message.guild.members.cache.filter(m => m.user.bot).size}\`

            > **Emojis**
            Total emojis: \`${message.guild.emojis.cache.size}\`
            Standard emojis: \`${message.guild.emojis.cache.filter(e => !e.animated).size}\`
            Animated emojis: \`${message.guild.emojis.cache.filter(e => e.animated).size}\`
            `)
        return message.channel.send({ embeds: [embed] });
    }
};