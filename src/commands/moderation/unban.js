const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "unban",
    category: "moderation",
    description: "unbans a user by ID from the server",
    userPermissions: ["BAN_MEMBERS"],
    botPermissions: ["BAN_MEMBERS"],
    run: async (client, message, args) => {
        const User = message.guild.members.cache.get(args[0]);
        if (!User) return message.channel.send("I couldn't find that user");

        try {
            await message.guild.members.unban(User);

            return message.channel.send(new MessageEmbed()
                .setColor("#ff6666")
                .setDescription(`${User.tag} has been unbanned by ${message.author}`)
            );

        } catch {
            return message.channel.send("An error has occured while trying to unban that user, please try again");
        };
    }
};