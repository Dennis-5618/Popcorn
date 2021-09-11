const { MessageCollector, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const tickets = require("../../schemas/settings");

module.exports = {
    name: "createticket",
    aliases: ["ticketcreate", "ticket-setup", "ticket-create"],
    category: "tickets",
    description: "creates a new ticket with the specified category, channel, support role and message",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["MANAGE_CHANNELS"],
    run: async (client, message, args) => {
        const data = await tickets.findOne({ Guild: message.guild.id });
        if (data && data.Tickets?.length >= 10) return message.channel.send("You have reached the maximum amount of tickets you can have at once");

        const embed = new MessageEmbed().setColor("BLURPLE");
        const step1 = embed
            .setTitle("Ticket setup (1/3)")
            .setDescription("Specify the category ID which you want to create the tickets under");
        message.channel.send({ embeds: [step1] });

        const filter = m => m.author.id == message.author.id;

        // Step 1
        const categoryCollector = new MessageCollector(message.channel, { filter, time: 30000 });
        categoryCollector.on("collect", msg => {

            const parent = message.guild.channels.cache.find(c => c.type == "GUILD_CATEGORY" && c.id == msg.content);
            if (!parent) return message.channel.send("I was unable to find the category, please try again");

            const step2 = embed
                .setTitle("Ticket setup (2/3)")
                .setDescription("In which channel do you want to send the ticket embed?");
            message.channel.send({ embeds: [step2] });

            categoryCollector.stop();

            // Step 2
            const channelCollector = new MessageCollector(message.channel, { filter, time: 30000 });
            channelCollector.on("collect", msg => {

                const channel = msg.mentions.channels.first() || message.guild.channels.cache.find(c => c.type == "GUILD_TEXT" & c.id == msg.content);
                if (!channel) return message.channel.send("I was unable to find that channel, please try again");

                const step3 = embed
                    .setTitle("Ticket setup (3/3)")
                    .setDescription("Which role is allowed to see and reply to tickets?");
                message.channel.send({ embeds: [step3] });

                channelCollector.stop();

                // Step 3
                const roleCollector = new MessageCollector(message.channel, { filter, time: 30000 });
                roleCollector.on("collect", async msg => {

                    const role = msg.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == msg.content);
                    if (!role) return message.channel.send("I was unable to find that role, please try again");

                    roleCollector.stop();

                    const complete = embed
                        .setDescription(" ")
                        .addField("Ticket category:", `\`${parent.name}\``)
                        .addField("Ticket channel:", `\`${channel}\``)
                        .addField("Support role:", `\`${role}\``)
                    message.channel.send({ embeds: [complete] });

                    const ticket = new MessageEmbed()
                        .setColor("BLURPLE")
                        .setDescription("React to this message to open a ticket")

                    const button = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setStyle("PRIMARY")
                                .setLabel("Open ticket")
                                .setCustomId("Popcorn_OpenTicket")
                        );
                    const ticketEmbed = await message.channel.send({ embeds: [ticket], components: [button] });

                    await tickets.updateOne({ Guild: message.guild.id }, {
                        $push: {
                            Tickets: [{
                                Parent: parent.id,
                                Channel: channel.id,
                                Role: role.id,
                                MessageID: ticketEmbed.id
                            }]
                        }
                    }, { upsert: true });
                });
            });
        });
    }
};