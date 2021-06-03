const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "addrole",
    aliases: ["giverole"],
    category: "utility",
    description: "adds a role to the specified user",
    userPermissions: ["MANAGE_ROLES"],
    botPermissions: ["MANAGE_ROLES"],
    run: async (client, message, args) => {
        const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!User) return message.channel.send("I couldn't find that user, please try again");

        const Role = message.mentions.roles.first() || message.guild.roles.cache.get(args.slice(1)) || message.guild.roles.cache.find(r => r.name == args[1]);
        if (!Role) return message.channel.send("I coulnd't find that role, please make sure that you've spelled the name correctly or provided a valid ID");

        if ((message.member.roles.highest.position <= User.roles.highest.position) && message.guild.ownerID != message.author) return message.channel.send("You are unable to give that role to the mentioned user due to the role hierarchy");
        if (message.guild.me.roles.highest.position <= User.roles.highest.position) return message.channel.send("I am unable to give that role to the mentioned user due to the role hierarchy");

        await User.roles.add(Role);

        return message.channel.send(new MessageEmbed()
            .setColor("#8989ff")
            .setDescription(`${message.author} has given ${User} the role ${Role}`)
        );
    }
};