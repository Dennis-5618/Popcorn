const { MessageEmbed } = require("discord.js");
const settings = require("../../schemas/settings");

module.exports = {
    name: "deleteticket",
    aliases: ["ticketdelete"],
    category: "tickets",
    description: "deletes a ticket from the database",
    userPermissions: ["ADMINISTRATOR"],
    run: async (client, message, args) => {
        const data = await settings.findOne({ Guild: message.guild.id, MessageID: args[0] });
        if (!data) return message.channel.send("I was unable to find that ticket, please try again");

        await settings.updateOne({ Guild: message.guild.id }, {
            $pull: {
                Tickets: { MessageID: args[0] }
            }
        });

        for (const info of data.Tickets) {
            const { Channel } = info;
            const channel = message.guild.channels.cache.find(c => c.id == Channel);
            const msg = await channel.messages.fetch(args[0]);
            msg.delete();
        };

        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription("You have successfully deleted a ticket")
        return message.channel.send({ embeds: [embed] });
    }
};