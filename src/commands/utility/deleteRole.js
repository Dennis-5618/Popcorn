const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "deleterole",
    category: "utility",
    description: "deletes a role by ID",
    userPermissions: ["MANAGE_ROLES"],
    botPermissions: ["MANAGE_ROLES"],
    run: async (client, message, args) => {
        const Role = message.guild.roles.cache.get(args[1]) || message.mentions.roles.first();
        if (!Role) return message.channel.send("I couldn't find that role, please try again");

        await Role.delete();

        return message.channel.send(new MessageEmbed()
            .setColor("#8989ff")
            .setDescription(`You have successfully deleted the role: \`${Role.name}\``)
        );
    }
};