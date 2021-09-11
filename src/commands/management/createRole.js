const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "createrole",
    category: "server management",
    description: "creates a new role with the specified name or by mention",
    userPermissions: ["MANAGE_ROLES"],
    botPermissions: ["MANAGE_ROLES"],
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("You need to specify the name you want to give to the role");

        const role = await message.guild.roles.create({
            name: args.join(" "),
            permissions: [],
            reason: `${message.author.tag} created a new role`
        });

        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`You have successfully created ${role}`)
        return message.channel.send({ embeds: [embed] });
    }
};