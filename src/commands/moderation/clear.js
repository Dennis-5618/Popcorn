const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "clear",
    aliases: ["purge"],
    category: "moderation",
    description: "clears a specified amount of messages from the that it is used in",
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["MANAGE_MESSAGES"],
    run: async (client, message, args) => {
        const user = message.mentions.members.first();

        if (user) {
            const messages = await message.channel.messages.fetch({ limit: args[1] });
            const usable = messages.filter((m) => (m.author.id == user.id) && !m.pinned);

            await message.delete()
            await message.channel.bulkDelete(usable);

            return message.channel.send(new MessageEmbed()
                .setColor("#5865F2")
                .setDescription(`Successfully deleted ${usable.size} messages of ${user}`)
            );

        } else {
            if (!args.length || isNaN[args[0]] || parseInt(args[0]) > 100 || parseInt(args[0]) < 0) return message.channel.send("Please specify the amount of messages you want to delete as a number above 0");

            const messages = await message.channel.messages.fetch({ limit: args[0] });
            const usable = messages.filter((m) => (m.createdTimestamp - Date.now()) < ms("14d") && !m.pinned)

            await message.delete();
            await message.channel.bulkDelete(usable);

            return message.channel.send(new MessageEmbed()
                .setColor("#5865F2")
                .setDescription(`Successfully deleted ${usable.size} messages`)
            );
        };
    }
};