const ms = require("ms");

module.exports = {
    name: "clear",
    aliases: ["purge"],
    category: "moderation",
    description: "clears a specified amount of messages from the that it is used in",
    userPermissions: ["MANAGE_MESSAGES"],
    botPermissions: ["MANAGE_MESSAGES"],
    run: async (client, message, args) => {
        if (!args.length || isNaN[args[0]] || parseInt(args[0]) > 100 || parseInt(args[0]) < 0) return message.channel.send("Please specify the amount of messages to be deleted as a number between 1 and 100");

        const messages = await message.channel.messages.fetch({ limit: parseInt(args[0]) });
        const usable = messages.filter((m) => (m.createdTimestamp - Date.now()) < ms("14d") && !m.pinned);

        await message.delete();
        await message.channel.bulkDelete(usable);

        message.channel.send(`Successfully deleted \`${args[0]}\` messages`).then(msg => { msg.delete({ timeout: 5000 }) });
    }
}