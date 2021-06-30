const { MessageEmbed } = require("discord.js");
const settings = require("../../schemas/settings");

module.exports = {
    name: "messageUpdate",
    run: async (client, oldMessage, newMessage) => {
        const data = await settings.findOne({ Guild: newMessage.guild.id });
        if (!data || message.system || message.author.bot) return;

        const logChannel = client.channels.cache.get(data.LogChannel);
        
        const embed = new MessageEmbed()
            .setColor("#5865F2")
            .setAuthor(newMessage.author.tag, newMessage.author.avatarURL({ dynamic: true }))
            .addField("Before:", oldMessage.content)
            .addField("After:", newMessage.content)
            .setFooter(`Message ID: ${newMessage.id}`)
            .setTimestamp()

        logChannel.send(embed);
    }
};