const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "ban",
    aliases: ["banish"],
    category: "moderation",
    description: "ban the mentioned user from the server with specified reason",
    userPermissions: ["BAN_MEMBERS"],
    botPermissions: ["BAN_MEMBERS"],
    run: async (client, message, args) => {
        const reason = args.slice(1).join(" ") || "There was no reason specified";
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send("I was unable to find that user, please try again");

        if ((message.member.roles.highest.position <= user.roles.highest.position) && message.guild.ownerId != message.author) return message.channel.send("You are unable to ban that user due to the role hierarchy");
        if (message.guild.me.roles.highest.position <= user.roles.highest.position) return message.channel.send("I am unable to ban that user due to the role hierarchy");

        const userEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`You have been banned from \`${message.guild.name}\` \nReason: \`${reason}\``)
        await user.send({ embeds: [userEmbed] }).catch(() => null);

        const guildEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .addField("Banned user:", user.user.tag, true)
            .addField("Banned by:", message.author.tag, true)
            .addField("Reason:", `\`${reason}\``)
        message.channel.send({ embeds: [guildEmbed] });

        return message.guild.members.ban(user.id, { reason, days: 7 });
    }
};