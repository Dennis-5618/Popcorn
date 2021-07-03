const { MessageEmbed } = require("discord.js");
const settings = require("../../schemas/settings");

module.exports = {
    name: "setlogs",
    category: "utility",
    description: "sets the logchannel for the server",
    userPermissions: ["ADMINISTRATOR"],
    run: async (client, message, args) => {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channel) return message.channel.send("I couldn't find that channel, please try again");

        await settings.findOneAndUpdate({ Guild: message.guild.id}, {
            Guild: message.guild.id,
            Logchannel: channel.id
        }, {
            upsert: true
        });

        return message.channel.send(new MessageEmbed()
        .setColor("#5865F2")
        .setDescription(`You have successfully set the logchannel to ${channel}`)
        );
    }
};