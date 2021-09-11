const { MessageEmbed } = require("discord.js");
const warnings = require("../../schemas/warnings");

module.exports = {
    name: "warns",
    aliases: ["warnings"],
    category: "moderation",
    description: "shows the amount of warnings you or the mentioned user has",
    run: async (client, message, args) => {
        var counter = 1;

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
        if (!user) return message.channel.send("I was unable to find that user, please try again");

        const data = await warnings.findOne({ Guild: message.guild.id, User: user.id });        
        if (!data) return message.channel.send("That user doesn't have any warnings yet");

        const embed = new MessageEmbed().setColor("BLURPLE");

        for (const info of data.Reason) {
            const { Moderator, Reason } = info;
            embed.addField(`${counter++}.`, `Moderator: ${client.users.cache.get(Moderator)} \nReason: \`${Reason}\``)
        };

        return message.channel.send({ embeds: [embed] });
    }
};