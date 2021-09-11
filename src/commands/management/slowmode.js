const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "slowmode",
    category: "server management",
    description: "sets the slowmode timer for that channel to the specified amount of time",
    userPermissions: ["MANAGE_CHANNELS"],
    botPermissions: ["MANAGE_CHANNELS"],
    run: async (client, message, args) => {
        const time = ms(args[0]);

        if (!args[0] && !args[0].endsWith("s") && !args[0].endsWith("m") && !args[0].endsWith("h")) return message.channel.send("You need to use the correct time format \n example \`p!slowmode 1m\` or \`p!slowmode 2h\`");
        if (time > ms("6h")) return message.channel.send("The maximum amount of time you can set the slowmode timer to is 6 hours (21600 seconds)");

        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`The slowmode timer for this channel has been set to: \`${ms(time, { long: true })}\``)
        message.channel.send({ embeds: [embed] });

        return message.channel.setRateLimitPerUser(ms(args[0]) / 1000);
    }
};