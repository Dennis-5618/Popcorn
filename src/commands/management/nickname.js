const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "nickname",
    aliases: ["rename"],
    category: "server management",
    description: "changes the nickname of the mentioned user",
    userPermissions: ["CHANGE_NICKNAMES", "MANAGE_NICKNAMES"],
    botPermissions: ["CHANGE_NICKNAMES", "MANAGE_NICKNAMES"],
    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send("You need to mention or provide the ID of the user you want to change the nickname of");

        const nickname = args.slice(1).join(" ");
        if (!nickname) return message.channel.send("Please also provide a nickname you want to give to the user");

        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`${message.author} has changed ${user}'s nickname to: ${nickname}`)
        message.channel.send({ embeds: [embed] });

        return user.setNickname(nickname);
    }
};