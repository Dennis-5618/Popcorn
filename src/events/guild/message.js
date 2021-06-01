module.exports = {
    name: "message",
    run: async (client, message) => {
        if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith("p!")) return;

        const [cmd, ...args] = message.content.trim().slice("p!".length).split(/ +/g);
        const command = client.commands.get(cmd.toLowerCase()) || client.commands.get(client.aliases.get(cmd.toLowerCase()));
        if (!command) return;

        if (!message.member.permissions.has(command.userPermissions ?? [])) return message.channel.send(`You don't have sufficient permissions, you need \`${command.userPermissions.map((value) => `${value[0].toUpperCase() + value.slice(1)}`).join(", ")}\` permissions for this command`);
        if (!message.guild.me.permissions.has(command.botPermissions ?? [])) return message.channel.send(`I currently don't have sufficient permissions for this command, I need the \`${command.botPermissions.map((value) => `${value[0].toUpperCase() + value.slice(1)}`).join(", ")}\` permission for this command to function properly`);

        try {
            await command.run(client, message, args);
        } catch (error) {
            return message.channel.send(`An error has occured: \`${error.message}\``);
        };

    }
};