const fs = require("fs");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const { MessageButton } = require("discord-buttons");

const tickets = require("../../schemas/tickets")

module.exports = {
    name: "clickButton",
    run: async (client, button) => {
        const data = await tickets.findOne({ Guild: button.guild.id });
        if (!data) return;

        for (const info of data.Info) {
            var { Category, Role } = info;
        };

        if (button.id == "OpenTicket") {
            await button.defer();

            const ticketChannel = await button.guild.channels.create("ticket", {
                name: "ticket",
                parent: Category,
                type: "text"
            });

            ticketChannel.createOverwrite(button.clicker.user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true });
            ticketChannel.createOverwrite(Role, { VIEW_CHANNEL: true, SEND_MESSAGES: true });
            ticketChannel.createOverwrite(button.guild.id, { VIEW_CHANNEL: false });

            const ticketEmbed = new MessageEmbed().setColor("#5865F2").setDescription(`A new ticket has been opened by ${button.clicker.user}`);
            const ticketButton = new MessageButton().setStyle("red").setLabel("Close ticket").setID("CloseTicket");
            ticketChannel.send({ embed: ticketEmbed, button: ticketButton });
        };

        if (button.id == "CloseTicket") {
            await button.defer();
            button.channel.send("This ticket will be closed in 15 seconds...");

            // fs.writeFileSync("./ticket.txt", transcript.join("\n"));

            // const attachment = new MessageAttachment(fs.createReadStream("./ticket.txt"));
            // await button.channel.send(attachment);

            // fs.unlinkSync("./ticket.txt");

            setTimeout(() => { button.channel.delete() }, 15000);
        };
    }
};