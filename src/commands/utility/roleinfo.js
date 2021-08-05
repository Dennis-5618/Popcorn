const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "roleinfo",
    aliases: ["perms"],
    category: "utility",
    description: "shows information about a mentioned role or by ID",
    run: async (client, message, args) => {
        const role = message.mentions.roles.first() || await message.guild.roles.cache.get(args[0]);
        if (!role) return message.channel.send("Please mention or provide the ID of the role");

        message.channel.send(new MessageEmbed()
        .setColor(role.color)
        .setDescription(`
        > **Role information**
        Name: \`${role.name}\`
        ID: \`${role.id}\`
        Members: \`${role.members.size}\`

        > **Permissions**
        \`${role.permissions.toArray().join("\n").toLowerCase() || "None"}\`
        `)
        )
    }
}