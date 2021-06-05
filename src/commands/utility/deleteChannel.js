const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "deletechannel",
    aliases: ["channeldelete"],
    category: "utility",
    description: "deletes a channel by mention or ID",
    userPermissions: ["MANAGE_CHANNELS"],
    botPermissions: ["MANAGE_CHANNELS"],
    run: async (client, message, args) => {
        const Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        try {
            await Channel.delete();
            message.channel.send(new MessageEmbed()
                .setColor("#5865F2")
                .setTitle("Channel deleted")
                .setDescription(`You have succesfully deleted \`${Channel.name}\``))
        } catch {
            return message.channel.send("An error has occured while trying to delete that channel, please try again");
        };
    }
};