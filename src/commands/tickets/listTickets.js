const { MessageEmbed } = require("discord.js");
const tickets = require("../../schemas/tickets");

module.exports = {
    name: "ticketlist",
    aliases: ["listtickets", "ticket-list"],
    category: "tickets",
    description: "lists all of the created tickets in this server",
    userPermissions: ["MANAGE_MESSAGES"],
    run: async (client, message) => {
        let count = 1;

        // Fetching the data from MongoDB
        const data = await tickets.findOne({ Guild: message.guild.id });
        if (!data || !data.Info) return message.channel.send("There are no active tickets in this server, you can create one using \`p!createticket\`");
        else {
            const embed = new MessageEmbed().setColor("8989ff").setTitle("Ticket list");

            // Looping through all of the tickets
            for (const info of data.Info) {
                const { Category, Channel, Role } = info;
                embed.addField(`${count++}.`, `Category: \`${client.channels.cache.get(Category).name}\` \nChannel: ${client.channels.cache.get(Channel)} \n Support role: ${message.guild.roles.cache.find(r => r.id == Role)}`);
            };

            message.channel.send(embed)
        }
    }
}