const { MessageEmbed, MessageAttachment } = require("discord.js");
const tickets = require("../../schemas/tickets");
const fs = require("fs");

module.exports = {
    name: "messageReactionAdd",
    run: async (client, reaction, user) => {
        // Fetching the guild ID from the database
        const data = await tickets.findOne({ Guild: reaction.message.guild.id });
        if (!data) return;

        // Fetching the message and reaction
        if (reaction.message.partial) await reaction.message.fetch();
        if (reaction.partial) await reaction.fetch();
        if (user.bot) return;

        // Getting info from the data
        for (const info of data.Info) {
            var { Category, Channel, Role } = info;
        };

        if (reaction.message.channel.id == Channel && reaction.emoji.name == "✉") {
            reaction.users.remove(user.id);

            // Creating the ticket channel
            const ticketChannel = await reaction.message.guild.channels.create("ticket", {
                name: "ticket",
                parent: Category,
                type: "text"
            });

            // Setting the permissions
            ticketChannel.createOverwrite(user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true });
            ticketChannel.createOverwrite(Role, { VIEW_CHANNEL: true, SEND_MESSAGES: true });
            ticketChannel.createOverwrite(reaction.message.guild.id, { VIEW_CHANNEL: false });

            // Sending embed in the ticket
            ticketChannel.send(new MessageEmbed()
                .setColor("#8989ff")
                .setDescription(`A new ticket has been created by ${user}`)
                .setFooter("Use: *p!close* to close this ticket")
            );

            // Creating the transcript
            const transcript = [];

            // Collecting the messages sent in the ticket
            const messageCollector = ticketChannel.createMessageCollector((m) => !m.author.bot);
            messageCollector.on("collect", async msg => {
                // Closing the ticket
                if (msg.content.toLowerCase().startsWith("p!close")) {
                    ticketChannel.send("This ticket will be closed in 15 seconds, sending transcript of this ticket...");
                    messageCollector.stop("done");

                    fs.writeFileSync("./ticket.txt", transcript.join("\n"));

                    const attachment = new MessageAttachment(fs.createReadStream("./ticket.txt"));
                    await ticketChannel.send(attachment);

                    fs.unlinkSync("./ticket.txt");

                    setTimeout(() => { ticketChannel.delete() }, 15000);
                };
            });
        };
    }
};