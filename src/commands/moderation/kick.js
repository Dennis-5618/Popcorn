const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "kick",
    category: "moderation",
    description: "kick the mentioned user from the server with the specified reason",
    userPermissions: ["KICK_MEMBERS"],
    botPermissions: ["KICK_MEMBERS"],
    run: async (client, message, args) => {
        const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!User) return message.channel.send("I couldn't find that user");

        const Reason = args.slice(1).join(" ") || "No reason specified";

        if ((message.member.roles.highest.position <= User.roles.highest.position) && message.guild.ownerID != message.author) return message.channel.send("You are unable to ban the mentioned user due to the role hierarchy");
        if (message.guild.me.roles.highest.position <= User.roles.highest.position) return message.channel.send("I am unable to ban the mentioned user due to the role hierarchy");

        try {
            await User.send(new MessageEmbed()
                .setColor("#8989ff")
                .setDescription(`You have been kicked from \`${message.guild.name}\` \nReason: \`${Reason}\``)
            );

            await User.kick(Reason);

            return message.channel.send(new MessageEmbed()
                .setColor("#8989ff")
                .setDescription(`\`${User.tag}\` has been kicked by ${message.author} \nReason: \`${Reason}\``)
            );

        } catch {
            message.channel.send("An error has occured while trying to kick the mentioned user, please try again");
        };
    }
};