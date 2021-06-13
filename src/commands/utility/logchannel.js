const { MessageEmbed } = require("discord.js");
const logChannel = require("../../schemas/logChannel");

module.exports = {
    name: "setlogs",
    category: "utility",
    description: "sets the logchannel for the server",
    userPermissions: ["ADMINISTRATOR"],
    run: async (client, message, args) => {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channel) return message.channel.send("I couldn't find that channel, please try again");

        const data = await logChannel.findOne({ Guild: message.guild.id});
        console.log(data)
        if (!data) {
            await logChannel.create({ Guild: message.guild.id, LogChannel: channel.id });
        } else {
            await logChannel.updateOne({ Guild: message.guild.id, LogChannel: channel.id });
        };        

        return message.channel.send(new MessageEmbed()
        .setColor("#5865F2")
        .setDescription(`You have successfully set the logchannel to ${channel}`)
        );
    }
};