const { MessageEmbed } = require("discord.js");
const warnings = require("../../schemas/warnings");

module.exports = {
    name: "warn",
    category: "moderation",
    description: "warns the mentioned member with the specified reason",
    userPermissions: ["MANAGE_MESSAGES"],
    run: async (client, message, args) => {
        const Reason = args.slice(1).join(" ") || "No reason specified";
        const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!User) return message.channel.send("I couldn't find that user, please try again");
        if (User.owner) return message.channel.send("You are unable to warn the owner of this server");
        if (User.id == message.author.id) return message.channel.send("You cannot warn yourself");

        await warnings.updateOne({ Guild: message.guild.id, Member: User.id }, {
            $push: {
                Reason: [{
                    Moderator: message.author.id,
                    Reason
                }]
            }
        }, { upsert: true });

        User.send(new MessageEmbed()
        .setColor("#ff6666")
        .setDescription(`You have been warned in ${message.guild.name} by ${message.author} \nReason: \`${Reason}\``)
        );

        return message.channel.send(new MessageEmbed()
        .setColor("#ff6666")
        .setDescription(`${User} has been warned by ${message.author} \nReason: \`${Reason}\``)
        );
    }
};