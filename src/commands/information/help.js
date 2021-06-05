const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "help",
    aliases: ["h", "commands", "cmds"],
    category: "information",
    description: "returns a list of all commands or information about a specific one",
    run: async (client, message, args) => {
        const Embed = new MessageEmbed().setColor("#5865F2");

        if (!args.length) {
            message.channel.send(Embed.setDescription(`
                ${[...client.categories].map((value) =>
                `${value[0].toUpperCase() + value.slice(1).toLowerCase()}
                    ${client.commands
                    .filter((cmd) => cmd.category == value.toLowerCase())
                    .map((value) => `\`${value.name}\``)
                    .join(", ")}`
                ).join("\n\n")}
            `));
        } else {
            const Command = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
            if (!Command) return message.channel.send("I couldn't find that command, please try again");

            const Properties = Object.entries(Command);

            message.channel.send(Embed
                .setTitle(Command.name[0].toUpperCase() + Command.name.slice(1).toLowerCase())
                .setDescription(Properties.filter((value) => typeof value[1] != "function").map((value) => {
                    const Key = value[0][0].toUpperCase() + value[0].slice(1).toLowerCase();
                    if (typeof value[1] == "string") {
                        return `${Key}: \`${value[1]}\``
                    } else {
                        return `${Key}: \`${value[1]}\``
                    };
                }))
            );
        };
    }
};

// .setDescription(`
//                 ${[...client.categories].map((value) => {
//                 `${value[0].toUpperCase() + value.slice(1).toLowerCase()}\n
//                     ${client.commands
//                         .filter((cmd) => cmd.category == value.toLowerCase())
//                         .map((value) => `\`${value.name}\``)
//                         .join(", ")}`
//             }).join("\n\n")}`)