const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "nickname",
    aliases: ["rename"],
    category: "moderation",
    description: "Changes the nickname of the mentioned user",
    userPermissions: ["CHANGE_NICKNAME", "MANAGE_NICKNAMES"],
    botPermissions: ["CHANGE_NICKNAME", "MANAGE_NICKNAMES"],
    run: async (client, message, args) => {
        const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!User) return message.channel.send("I couldn't find that user, please try again");

        const Nickname = args.slice(1).join(" ");
        if (!Nickname) return message.channel.send("Please also specify a nickname you want to give to that user");

        try {
            await message.channel.send(new MessageEmbed()
                .setColor("#ff6666")
                .setDescription(`${message.author} has changed ${User}'s nickname to: \`${Nickname}\``)
            );

            User.setNickname(Nickname);
        } catch {
            return message.channel.send("An error has occured while trying to change the users nickname, please try again");
        };
    }
};