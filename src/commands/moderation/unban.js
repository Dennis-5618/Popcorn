const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "unban",
    category: "moderation",
    description: "unbans a user by ID from the server",
    userPermissions: ["BAN_MEMBERS"],
    botPermissions: ["BAN_MEMBERS"],
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("You need to provide the ID of the user you want to unban");

        try {
            await message.guild.members.unban(args[0]);

            return message.channel.send(new MessageEmbed()
                .setColor("#8989ff")
                .setDescription(`\`${args[0]}\` has been unbanned by ${message.author}`)
            );

        } catch {
            return message.channel.send("An error has occured while trying to unban that user, please try again");
        };
    }
};