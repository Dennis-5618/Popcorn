const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "deletechannel",
    aliases: ["channeldelete"],
    category: "utility",
    description: "deletes a channel by mention or ID",
    userPermissions: ["MANAGE_CHANNELS"],
    botPermissions: ["MANAGE_CHANNELS"],
    run: async (client, message, args) => {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channel) return message.channel.send("Please mention or provide the ID of the channel you're trying to delete");

        await channel.delete();
        return message.channel.send(new MessageEmbed()
            .setColor("#5865F2")
            .setTitle("Channel deleted")
            .setDescription(`You have successfully deleted \`${channel.name}\``)
        );
    }
};