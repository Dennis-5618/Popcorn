const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "who",
    aliases: ["whois", "userinfo"],
    category: "information",
    description: "sends information about yourself or the mentioned users account",
    run: async (client, message) => {
        const User = message.mentions.members.first() || message.guild.members.cache.get(message.author.id);
        const Roles = User.roles.cache.sort((a, b) => b.position - a.position).map(r => r.toString()).slice(0, -1);

        return message.channel.send(new MessageEmbed()
            .setColor("#5865F2")
            .setThumbnail(User.user.avatarURL({ dynamic: true, size: 512 }))
            .setDescription(`
            > **User information**
            Username: \`${User.user.tag}\`
            ID: \`${User.id}\`
            Avatar: [click here](${User.user.avatarURL({ dynamic: true })})

            > **Role information**
            Highest role: ${User.roles.highest.id == message.guild.id ? "none" : User.roles.highest.name}
            All roles: ${Roles.join(", ")}
            `)
        );
    }
};