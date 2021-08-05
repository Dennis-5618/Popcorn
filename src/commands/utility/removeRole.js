const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "removerole",
    category: "utility",
    description: "removes a role from the specified user",
    userPermissions: ["MANAGE_ROLES"],
    botPermissions: ["MANAGE_ROLES"],
    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send("Please mention or provide the ID of the person you're trying to remove the role from");

        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name == args[1]);
        if (!role) return message.channel.send("Please mention or provide the role you're trying to remove");

        if ((message.member.roles.highest.position <= User.roles.highest.position) && message.guild.ownerID != message.author) return message.channel.send("You are unable to remove that role from the mentioned user due to the role hierarchy");
        if (message.guild.me.roles.highest.position <= User.roles.highest.position) return message.channel.send("I am unable to remove that role from the mentioned user due to the role hierarchy");

        await user.roles.remove(role);

        return message.channel.send(new MessageEmbed()
            .setColor("#5865F2")
            .setDescription(`${message.author} has removed the role ${role} from ${user}`)
        );
    }
};