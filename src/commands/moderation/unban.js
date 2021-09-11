const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "unban",
    aliases: ["aliases"],
    category: "moderation",
    description: "unbans a user from the server by ID",
    userPermissions: ["BAN_MEMBERS"],
    botPermissions: ["BAN_MEMBERS"],
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("You need to specify the ID of the user you want to unban");

        const reason = args.slice(1).join(" ") || "There was no reason specified";

        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .addField("Unbanned user:", `\`${args[0]}\``, true)
            .addField("Unbanned by:", message.author.tag, true)
            .addField("Reason:", `\`${reason}\``)
        message.channel.send({ embeds: [embed] });

        return message.guild.members.unban(args[0]);
    }
};