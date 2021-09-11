const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    aliases: ["h", "commands", "cmds"],
    category: "information",
    description: "displays all available commands",
    run: async (client, message, args) => {

        const embed = new MessageEmbed().setColor("BLURPLE");

        if (!args[0]) {
            embed.setDescription(` ${[...client.categories].map((value) =>
                `${value[0].toUpperCase() + value.slice(1).toLowerCase()}
                ${client.commands
                    .filter((cmd) => cmd.category == value.toLowerCase())
                    .map((value) => `\`${value.name}\``)
                    .join(", ")}`
            ).join("\n\n")}
            `)
            return message.channel.send({ embeds: [embed] });
        } else {
            const Command = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
            if (!Command) return message.channel.send("I couldn't find that command, please try again");

            const Properties = Object.entries(Command);

            embed
                .setTitle(Command.name[0].toUpperCase() + Command.name.slice(1).toLowerCase())
                .setDescription(Properties.filter((value) => typeof value[1] != "function").map((value) => {
                    const Key = value[0][0].toUpperCase() + value[0].slice(1).toLowerCase();
                    if (typeof value[1] == "string") {
                        return `${Key}: \`${value[1]}\``
                    } else {
                        return `${Key}: \`${value[1]}\``
                    };
                }))
            message.channel.send({ embeds: [embed] });
        };
    }
};