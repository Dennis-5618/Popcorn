const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "deleterole",
    category: "server management",
    description: "deletes a role with the specified name or by mention",
    userPermissions: ["MANAGE_ROLES"],
    botPermissions: ["MANAGE_ROLES"],
    run: async (client, message, args) => {
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`You have successfully deleted the role \`${role.name}\``)
        message.channel.send({ embeds: [embed] });

        return role.delete();
    }
};