const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "deletechannel",
    aliases: ["channeldelete"],
    category: "server management",
    description: "deletes a channel by mention or ID",
    userPermissions: ["MANAGE_CHANNELS"],
    botPermissions: ["MANAGE_CHANNELS"],
    run: async (client, message, args) => {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channel) return message.channel.send("I was unable to find that channel, please try again");

        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`You have successfully deleted \`${channel.name}\``)
        message.channel.send({ embeds: [embed] });

        return channel.delete();
    }
};