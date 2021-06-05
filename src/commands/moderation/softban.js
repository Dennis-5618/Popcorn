const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "softban",
    aliases: ["tempban"],
    category: "moderation",
    description: "bans and unbans a specified member in order to clear all messages they've send in the past 7 days",
    userPermissions: ["BAN_MEMBERS"],
    botPermissions: ["BAN_MEMBERS"],
    run: async (client, message, args) => {
        const Reason = args.slice(1).join(" ") || "No reason specified";
        const User = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!User) return message.channel.send("I couldn't find that user, please try again");

        if ((message.member.roles.highest.position <= User.roles.highest.position) && message.guild.ownerID != message.author) return message.channel.send("You are unable to ban the mentioned member due to the role hierarchy");
        if (message.guild.me.roles.highest.position <= User.roles.highest.position) return message.channel.send("I am unable to ban the mentioned member due to the role hierarchy");

        try {
            await User.send(new MessageEmbed()
                .setColor("#5865F2")
                .setDescription(`You have been softbanned from \`${message.guild.name}\` by \`${message.author.tag}\` \nReason: \`${Reason}\``)
            );

            await message.channel.send(new MessageEmbed()
                .setColor("#5865F2")
                .setDescription(`\`${User.tag}\` has been softbanned by ${message.author} \nReason: \`${Reason}\``)
            );

            return message.guild.members.ban(User.id, { reason: Reason, days: 7 }).then(message.guild.members.unban(User.id, { reason: Reason }));

        } catch {
            return message.channel.send("An error has occured while trying to softban that user, please try again")
        };
    }
};