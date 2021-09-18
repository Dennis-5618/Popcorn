const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "help",
    aliases: ["h", "commands", "cmds"],
    category: "information",
    description: "displays all available commands",
    run: async (client, message, args) => {
        const embed = new MessageEmbed().setColor("BLURPLE");

        // General help menu
        if (!args[0]) {
            embed.setDescription(`
            ${[...client.categories]
                    .map(value =>
                        `> **${value[0].toUpperCase() + value.slice(1).toLowerCase()}**
            ${client.commands
                            .filter(cmd => cmd.category == value.toLowerCase())
                            .map(value => `\`${value.name}\``)
                            .join(", ")}`
                    ).join("\n\n")}
            `);

        } // Help with specific command
        else {
            const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
            if (!cmd) return message.channel.send("I was unable to find that command, please try again");

            const properties = Object.entries(cmd);
            properties
                .filter(value => typeof value[1] != "function")
                .map(value => {
                    const key = value[0][0].toUpperCase() + value[0].slice(1).toLowerCase();

                    if (typeof value[1] == "string") {
                        return embed.addField(`${key}:`, `\`${value[1]}\``);
                    }

                    else if (typeof value[1] == "number") {
                        return embed.addField(`${key}:`, `\`${ms(value[1], { long: true })}\``);
                    }

                    else if (typeof value[1].map == "function") {
                        return embed.addField(`${key}:`, `\`${value[1].join(", ")}\``);
                    };
                });
        };
        return message.channel.send({ embeds: [embed] });
    }
};