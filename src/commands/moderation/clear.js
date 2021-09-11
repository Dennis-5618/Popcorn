const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "clear",
    aliases: ["purge", "clean"],
    category: "moderation",
    description: "clears a specified amount of messages from the channel or mentioned user",
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["MANAGE_MESSAGES"],
    run: async (client, message, args) => {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!user) {
            if (isNaN[args[0]] || args[0] > 99 || args[0] <= 0) return message.channel.send("You need to specify the amount of messages to be deleted as a valid number between 1 and 99");

            const messages = await message.channel.messages.fetch({ limit: args[0] });
            const filteredMessages = await messages.filter(res => (res.createdTimestamp - Date.now()) < ms("14d") && !res.pinned);

            message.delete();
            await message.channel.bulkDelete(filteredMessages);

            const embed = new MessageEmbed()
                .setColor("BLURPLE")
                .setDescription(`You have successfully deleted ${args[0]} messages`)
            message.channel.send({ embeds: [embed] });
        } else {
            if (!args[1]) return message.channel.send("You also need to specify the amount of messages you want to delete from that user");
            if (isNaN[args[1]] || args[1] > 99 || args[1] <= 0) return message.channel.send("You need to specify the amount of messages to be deleted as a valid number between 1 and 99");

            let deletedMessages = 0;
            const messages = await message.channel.messages.fetch();
            const filteredMessages = await messages.filter(res => (res.author.id == user.id) && !res.pinned);

            filteredMessages.forEach(msg => {
                if (deletedMessages >= args[1]) return;
                msg.delete();
                deletedMessages++;
            });

            const embed = new MessageEmbed()
                .setColor("BLURPLE")
                .setDescription(`You have successfully deleted ${args[1]} messages sent by ${user}`)
            return message.channel.send({ embeds: [embed] });
        };
    }
};