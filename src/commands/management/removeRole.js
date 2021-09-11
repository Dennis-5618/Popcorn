const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "removerole",
    category: "server management",
    description: "removes a specified role to the mentioned user",
    userPermissions: ["MANAGE_ROLES"],
    botPermissions: ["MANAGE_ROLES"],
    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send("I was unable to find that user, please try again");

        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.get(r => r.name == args[1]);
        console.log(role);
        if (!role) return message.channel.send("I was unable to find that role, please try again");

        if ((message.member.roles.highest.position <= user.roles.highest.position) && message.guild.ownerId != message.author) return message.channel.send("You are unable to the role from that user due to the role hierarchy");
        if (message.guild.me.roles.highest.position <= user.roles.highest.position) return message.channel.send("I am unable to the role from that user a role due to the role hierarchy");

        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`${message.author} has removed ${role} from ${user}`)
        message.channel.send({ embeds: [embed] });

        return user.roles.remove(role);
    }
};