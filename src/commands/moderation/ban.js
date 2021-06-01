const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ban",
    category: "moderation",
    description: "bans the mentioned user from the server with the specified reason",
    userPermissions: ["BAN_MEMBERS"],
    botPermissions: ["BAN_MEMBERS"],
    run: async (client, message, args) => {
        const Reason = args.slice(1).join(" ") || "No reason specified";
        const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!User) return message.channel.send("I couldn't find that user, please mention the user or provide their ID");

        if (!args.length) return message.channel.send("Please specify who you want to ban by mentioning them or providing their ID");

        if ((message.member.roles.highest.position <= User.roles.highest.position) && message.guild.ownerID != message.author) return message.channel.send("You are unable to ban the mentioned member due to the role hierarchy");
        if (message.guild.me.roles.highest.position <= User.roles.highest.position) return message.channel.send("I am unable to ban the mentioned member due to the role hierarchy");

        try {
            await User.send(new MessageEmbed()
                .setColor("#ff6666")
                .setDescription(`You have been banned from \`${message.guild.name}\` \nReason: \`${Reason}\``)
            ).catch(() => null);

            await message.guild.members.ban(User.id, { reason: Reason, days: 7 });

            return message.channel.send(new MessageEmbed()
                .setColor("#ff6666")
                .setDescription(`\`${User.tag}\` has been banned by \`${message.author.tag}\` \nReason: \`${Reason}\``)
            );

        } catch {
            message.channel.send("An error has occured while trying to ban the mentioned user, please try again")
        };
    }
};