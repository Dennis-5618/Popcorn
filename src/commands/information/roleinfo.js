const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "roleinfo",
    aliases: ["perms"],
    category: "information",
    description: "shows some information about a role by ID or mention",
    run: async (client, message, args) => {
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if (!role) return message.channel.send("I was unable to find that role, please try again");

        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`
            > **Role information**
            Name: \`${role.name}\`
            ID: \`${role.id}\`
            Members: \`${role.members.size}\`
            
            > **Permissions**
            \`${role.permissions.toArray().join(", ").toLowerCase()}\`
            `)
        return message.channel.send({ embeds: [embed] });

    }
};