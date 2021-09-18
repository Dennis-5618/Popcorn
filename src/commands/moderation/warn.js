const { MessageEmbed } = require("discord.js");
const warnings = require("../../schemas/warnings");

module.exports = {
    name: "warn",
    aliases: ["warning"],
    category: "moderation",
    description: "gives the mentioned user a warning with a specified reason",
    userPermissions: ["MANAGE_MESSAGES"],
    run: async (client, message, args) => {
        const reason = args.slice(1).join(" ") || "There was no reason specified";
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send("I was unable to find that user, please try again");
        if (user.owner) return message.channel.send("You cannot warn the owner if this server");
        if (user.id == message.author.id) return message.channel.send("You cannot warn yourself");

        await warnings.updateOne({ Guild: message.guild.id, User: user.id }, {
            $push: {
                Reason: [{
                    Moderator: message.author.id,
                    Reason: reason
                }]
            }
        }, { upsert: true });

        const userEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`You have been given a warning in ${message.guild.name} \nReason: \`${reason}\``)
        await user.send({ embeds: [userEmbed] }).catch(() => null);

        const guildEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .addField("Warned user:", user.user.tag, true)
            .addField("Warned by:", message.author.tag, true)
            .addField("Reason:", `\`${reason}\``)
        return message.channel.send({ embeds: [guildEmbed] });
    }
};