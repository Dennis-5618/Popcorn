const { MessageEmbed } = require("discord.js");
const settings = require("../../schemas/settings");

module.exports = {
    name: "setlogs",
    category: "server management",
    description: "sets the logchannel for this server",
    userPermissions: ["ADMINISTRATOR"],
    run: async (client, message, args) => {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channel) return message.channel.send("I was unable to find that channel, please try again");

        await settings.findOneAndUpdate({ Guild: message.guild.id }, {
            Guild: message.guild.id,
            Logchannel: channel.id
        }, { upsert: true });

        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`You have successfully set the logchannel for this server to ${channel}`)
        return message.channel.send({ embeds: [embed] });
    }
};