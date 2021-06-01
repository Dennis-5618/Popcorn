const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "createrole",
    category: "utility",
    description: "Adds a new role to the server",
    userPermissions: ["MANAGE_ROLES"],
    botPermissions: ["MANAGE_ROLES"],
    run: async (client, message, args) => {
        const Role = args.join(" ");
        if (!Role) return message.channel.send("Please specify the name you want to give to the role");

        await message.guild.roles.create({
            data: {
                name: Role,
                permissions: false
            }
        });

        return message.channel.send(new MessageEmbed()
            .setColor("#ff6666")
            .setDescription(`You have successfully created ${message.guild.roles.cache.find(r => r.name == Role)}`)
        );
    }
};