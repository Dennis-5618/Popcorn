const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    aliases: ["av", "icon"],
    category: "information",
    description: "returns your or the mentioned users avatar",
    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args[0]) {
            const embed = new MessageEmbed()
                .setColor("BLURPLE")
                .setTitle(`${message.author.username}'s avatar`)
                .setImage(message.author.avatarURL({ dynamic: true, format: "png", size: 512 }))
            return message.channel.send({ embeds: [embed] });
        } else {
            const embed = new MessageEmbed()
                .setColor("BLURPLE")
                .setTitle(`${user.user.username}'s avatar`)
                .setImage(user.user.avatarURL({ dynamic: true, format: "png", size: 512 }))
            return message.channel.send({ embeds: [embed] });
        };
    }
};