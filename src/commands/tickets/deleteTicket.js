const tickets = require("../../schemas/tickets");

module.exports = {
    name: "deleteticket",
    aliases: ["ticketdelete", "ticket-delete"],
    category: "tickets",
    description: "delets a ticket from the database, allowing you to create a new one",
    userPermissions: ["ADMINISTRATOR"],
    run: async (client, message, args) => {
        const msg = await message.channel.messages.fetch(args[0]);
        if (!msg) return message.channel.send("I couldn't find that message, please use this command in the channel the embed is in");

        await tickets.updateOne({ Guild: message.guild.id }, {
            $pull: {
                Info: { Message: args[0] }
            }
        });

        message.channel.send("You have successfully deleted a ticket");
        msg.delete();
    }
};