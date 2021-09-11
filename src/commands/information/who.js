const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "who",
    aliases: ["whois", "userinfo", "userinformation"],
    category: "information",
    description: "returns information about your or a mentioned users account",
    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(message.author.id);

        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setThumbnail(user.user.avatarURL({ dynamic: true, size: 512 }))
            .setDescription(`
            > **User information**
            Username: \`${user.user.tag}\`
            ID: \`${user.id}\`
            Flags: \`${user.user.flags.toArray()}\`
            Joined: \`${ms((new Date - user.joinedTimestamp), { long: true})} ago\`
            
            > **Role information**
            Highest role: ${user.roles.highest.id == message.guild.id ? "none" : user.roles.highest}
            All roles: ${user.roles.cache.sort((a, b) => b.position - a.position).map(r => r.toString()).slice(0, -1).join(", ")}
            `)
        return message.channel.send({ embeds: [embed] });
    }
};