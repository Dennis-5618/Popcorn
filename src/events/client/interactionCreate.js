const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require("discord.js");
const settings = require("../../schemas/settings");

module.exports = {
    name: "interactionCreate",
    run: async (client, interaction) => {
        const data = await settings.findOne({ Guild: interaction.guild.id });
        if (!data) return;

        for (const info of data.Tickets) {
            var { Parent, Role } = info;
        };

        if (interaction.customId == "Popcorn_OpenTicket") {
            await interaction.deferUpdate();

            const ticketChannel = await interaction.guild.channels.create("ticket", {
                name: "ticket",
                parent: Parent,
                type: "GUILD_TEXT",
                permissionOverwrites: [
                    {
                        id: interaction.user.id,
                        allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                    },
                    {
                        id: Role,
                        allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES]
                    },
                    {
                        id: interaction.guild.id,
                        deny: [Permissions.FLAGS.VIEW_CHANNEL]
                    }
                ]
            });

            const embed = new MessageEmbed()
                .setColor("BLURPLE")
                .setDescription(`A new ticket has been opened by ${interaction.user.user}`)
            const button = new MessageActionRow().addComponents(
                new MessageButton()
                    .setStyle("DANGER")
                    .setLabel("Close ticket")
                    .setCustomId("Popcorn_CloseTicket")
            )
            return ticketChannel.send({ embeds: [embed], components: [button] });
        };

        if (interaction.customId == "Popcorn_CloseTicket") {
            await interaction.deferUpdate();

            interaction.channel.send("This ticket will be closed in 15 seconds...");
            setTimeout(() => {
                interaction.channel.delete()
            }, 15000);
        }
    }
};