const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "kick",
    category: "moderation",
    description: "kick the mentioned user from the server with a specified reason",
    userPermissions: ["KICK_MEMBERS"],
    botPermissions: ["KICK_MEMBERS"],
    run: async (client, message, args) => {
        const reason = args.slice(1).join(" ") || "No reason has been specified";
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send("I was unable to find that user, please try again");

        if ((message.member.roles.highest.position <= user.roles.highest.position) && message.guild.ownerId != message.author) return message.channel.send("You are unable to kick that user due to the role hierarchy");
        if (message.guild.me.roles.highest.position <= user.roles.highest.position) return message.channel.send("I am unable to kick that user due to the role hierarchy");

        const userEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`You have been kicked from \`${message.guild.name}\` \nReason: \`${reason}\``)
        await user.send({ embeds: [userEmbed] }).catch(() => null);

        const guildEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .addField("Kicked user:", user.user.tag, true)
            .addField("Kicked by:", message.author.tag, true)
            .addField("Reason:", `\`${reason}\``)
        message.channel.send({ embeds: [guildEmbed] });

        return message.guild.members.kick(user.id, { reason });
    }
};