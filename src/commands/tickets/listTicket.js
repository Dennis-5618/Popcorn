const { MessageEmbed } = require("discord.js");
const settings = require("../../schemas/settings");

module.exports = {
    name: "ticketlist",
    aliases: ["listtickets", "ticket-list", "tickets"],
    category: "tickets",
    description: "lists all the tickets that are currently created in this server",
    userPermissions: ["ADMINISTRATOR"],
    run: async (client, message, args) => {
        let counter = 1;

        const data = await settings.findOne({ Guild: message.guild.id });
        if (!data || !data.Tickets) return message.channel.send("There are currently no tickets created in this server");

        const embed = new MessageEmbed().setColor("BLURPLE");

        for (const info of data.Tickets) {
            const { Parent, Channel, Role, MessageID } = info;

            embed.addField(`${counter++}.`, `
            Ticket ID: \`${MessageID}\`
            Category: \`${client.channels.cache.get(Parent).name}\`
            Channel: \`${client.channels.cache.get(Channel).name}\`
            Support role: ${message.guild.roles.cache.find(r => r.id == Role)}
            `);
        };

        return message.channel.send({ embeds: [embed] });
    }
};