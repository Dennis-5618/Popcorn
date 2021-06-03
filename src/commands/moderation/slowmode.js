const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "slowmode",
    category: "moderation",
    description: "sets the slowmode timer for that channel on the specified amount of time in seconds",
    userPermissions: ["MANAGE_CHANNELS"],
    botPermissions: ["MANAGE_CHANNELS"],
    run: async (client, message, args) => {
        if (!args.length) return message.channel.send("Please specify the amount of time you want to set the slowmode timer to");
        if (isNaN(args[0])) return message.channel.send("The amount of time needs to be a number");
        if (args[0] > 21600) return message.channel.send("The maximum amount of time you can set the slowmode timer to is 21600 seconds (6 hours)");

        await message.channel.setRateLimitPerUser(args[0]);
        return message.channel.send(new MessageEmbed()
            .setColor("#8989ff")
            .setDescription(`Slowmode has now been set in this channel to ${args[0]} seconds`)
        );
    }
};