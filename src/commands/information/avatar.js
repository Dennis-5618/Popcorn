const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    aliases: ["av", "icon"],
    category: "information",
    description: "sends the avatar of yourself or the mentioned user",
    run: async (client, message, args) => {
        const Embed = new MessageEmbed().setColor("#ff6666");
        const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!args.length) {
            return message.channel.send(Embed
                .setTitle(`${message.author.username}'s avatar`)
                .setImage(message.author.avatarURL({ format: "png", size: 512 }))
            );
        } else {
            return message.channel.send(Embed
                .setTitle(`${User.user.username}'s avatar`)
                .setImage(User.user.avatarURL({ format: "png", size: 512 }))
            );
        };
    }
};