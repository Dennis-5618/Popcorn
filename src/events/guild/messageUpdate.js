const { MessageEmbed } = require("discord.js");
const settings = require("../../schemas/settings");

module.exports = {
    name: "messageUpdate",
    run: async (client, oldMessage, message) => {
        const data = await settings.findOne({ Guild: message.guild.id });
        if (!data && !data.Logchannel || message.system ) return;

        const logChannel = client.channels.cache.get(data.Logchannel);
        const embed = new MessageEmbed()
            .setColor("#5865F2")
            .setAuthor(`${oldMessage.author.username}#${oldMessage.author.discriminator}`, oldMessage.author.avatarURL({ dynamic: true }))
            .setTitle("Message updated")
            .addField("Before:", oldMessage.content)
            .addField("After:", message.content)
            .setFooter(`Message ID: ${message.id}`)
            .setTimestamp()

        logChannel.send(embed);
    }
};