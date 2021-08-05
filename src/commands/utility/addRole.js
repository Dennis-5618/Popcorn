const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "addrole",
    aliases: ["giverole"],
    category: "utility",
    description: "adds a role to the specified user",
    userPermissions: ["MANAGE_ROLES"],
    botPermissions: ["MANAGE_ROLES"],
    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send("I couldn't find that user, please try again");

        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name == args[1]);
        if (!role) return message.channel.send("I couldn't find that role, please try again");

        if ((message.member.roles.highest.position <= User.roles.highest.position) && message.guild.ownerID != message.author) return message.channel.send("You are unable to give that role to the mentioned user due to the role hierarchy");
        if (message.guild.me.roles.highest.position <= User.roles.highest.position) return message.channel.send("I am unable to give that role to the mentioned user due to the role hierarchy");

        await user.roles.add(role);

        return message.channel.send(new MessageEmbed()
            .setColor("#5865F2")
            .setDescription(`${message.author} has given ${user} the role: ${role}`)
        );
    }
};