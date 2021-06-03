const { MessageEmbed, MessageCollector } = require("discord.js");
const tickets = require("../../schemas/tickets")

module.exports = {
    name: "createticket",
    aliases: ["ticketcreate", "ticket-setup", "ticket-create"],
    category: "tickets",
    description: "creates a new ticket with specified category, channel and role",
    userPermissions: ["ADMINISTRATOR"],
    botPermissions: ["MANAGE_CHANNELS"],
    run: async (client, message) => {
        const data = await tickets.findOne({ Guild: message.guild.id });
        if (data && data.Info?.length >= 10) return message.channel.send("You have reached the maximum amount of tickets allowed");

        const embed = new MessageEmbed().setColor("#8989ff");

        message.channel.send(embed
            .setTitle("Ticket setup (1/3)")
            .setDescription("Please specify the category ID where you want to create the tickets")
        );

        const categoryCollector = new MessageCollector(message.channel, m => m.author.id == message.author.id, { time: 30000 });
        categoryCollector.on("collect", async msg => {

            const category = message.guild.channels.cache.find(c => c.type == "category" && c.id == msg.content);
            if (!category) return message.channel.send("I couldn't find that category, please try again");
            else {
                categoryCollector.stop();

                message.channel.send(embed
                    .setTitle("Ticket setup (2/3)")
                    .setDescription("Please specify the channel where you want to create the ticket embed in")
                );

                const channelCollector = new MessageCollector(message.channel, m => m.author.id == message.author.id, { time: 30000 });
                channelCollector.on("collect", async msg => {

                    const channel = message.mentions.channels.first() || message.guild.channels.cache.find(c => c.type == "text" && c.id == msg.content);
                    if (!channel) return message.channel.send("I couldn't find that channel, please try again");
                    else {
                        channelCollector.stop();

                        message.channel.send(embed
                            .setTitle("Ticket setup (3/3)")
                            .setDescription("Please specify the role that is allowed to respond to the tickets")
                        );

                        const roleCollector = new MessageCollector(message.channel, m => m.author.id == message.author.id, { time: 30000 });
                        roleCollector.on("collect", async msg => {

                            const role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == msg.content);
                            if (!role) return message.channel.send("I coudn't find that role, please try again");
                            else {
                                roleCollector.stop();

                                await tickets.updateOne({ Guild: message.guild.id }, {
                                    $push: {
                                        Info: [{
                                            Category: category.id,
                                            Channel: channel.id,
                                            Role: role.id
                                        }]
                                    }
                                }, { upsert: true });

                                await message.channel.send(embed
                                    .setTitle("Setup complete!")
                                    .setDescription(`Ticket category: \`${category.name}\` \nTicket channel: ${channel} \nTicket role: ${role}`)
                                );

                                const ticket = await channel.send(embed.setDescription("React with ✉ below to open a ticket"));
                                ticket.react("✉");
                            };
                        });
                    };
                });
            };
        });
    }
};