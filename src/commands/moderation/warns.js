const { MessageEmbed } = require("discord.js");
const warnings = require("../../schemas/warnings");

module.exports = {
    name: "warns",
    category: "moderation",
    description: "shows the amount of times someone has been warned",
    run: async (client, message, args) => {
        var Counter = 1;
        const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!User) return message.channel.send("I couldn't find that user, please try again");

        const Embed = new MessageEmbed().setColor("#8989ff");

        const Data = await warnings.findOne({ Guild: message.guild.id, Member: User.id });
        if (!Data) return message.channel.send("That user doesn't have any warnings yet");

        for (const info of Data.Reason) {
            const { Moderator, Reason } = info;
            Embed.addField(`${Counter++}.`, `Moderator: ${client.users.cache.get(Moderator)}\n Reason: \`${Reason}\``)
        };

        message.channel.send(Embed.setFooter(`Total about of warnings: ${Data.Reason.length}`));
    }
};