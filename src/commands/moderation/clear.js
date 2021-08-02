const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "clear",
    aliases: ["purge", "clean"],
    category: "moderation",
    description: "clears a specified amount of messages from the channel or user",
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["MANAGE_MESSAGES"],
    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!user) {
            if (isNaN[args[0]] || parseInt(args[0]) > 99 || parseInt(args[0]) <= 0) return message.channel.send("Please provide the amount of messages to be deleted as a number between 1 and 99");

            const messages = await message.channel.messages.fetch({ limit: args[0] });
            const filteredMessages = await messages.filter((res) => (res.createdTimestamp - Date.now()) < ms("14d") && !res.pinned);

            message.delete();
            await message.channel.bulkDelete(filteredMessages);

            message.channel.send(new MessageEmbed()
            .setColor("#5865F2")
            .setDescription(`You have successfully deleted ${args[0]} messages`))

        } else {
            if (!args[1]) return message.channel.send("Please also provide the amount of messages you want to delete of the mentioned user");
            if (isNaN[args[1]] || parseInt(args[1]) > 99 || parseInt(args[1]) <= 0) return message.channel.send("Please provide the amount of messages to be deleted as a number between 1 and 99");

            let deletedMessages = 0;
            const messages = await message.channel.messages.fetch();
            const filteredMessages = await messages.filter(res => res.author.id == user.id);

            filteredMessages.forEach(msg => {
                if (deletedMessages >= args[1]) return;
                msg.delete();
                deletedMessages++;
            });

            message.channel.send(new MessageEmbed()
                .setColor("#5865F2")
                .setDescription(`You have successfully deleted ${args[1]} messages sent by ${user}`)
            );
        };
    }
};