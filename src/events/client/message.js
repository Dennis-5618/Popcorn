const ms = require("ms");
const economy = require("../../schemas/economy");

module.exports = {
    name: "messageCreate",
    botPermissions: ["MANAGE_SERVER"],
    run: async (client, message) => {
        if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith("p!")) return;

        const data = await economy.findOne({ User: message.author.id });
        if (!data) await economy.create({
            User: message.author.id,
            Wallet: 0,
            Bank: 0,
            Inventory: []
        });

        const [cmd, ...args] = message.content.trim().slice(2).split(/ +/g);
        const command = client.commands.get(cmd.toLowerCase()) || client.commands.get(client.aliases.get(cmd.toLowerCase()));
        if (!command) return;

        if (client.cooldowns.has(`${message.author.id}-${command.name}`)) {
            return message.channel.send(`You will have to wait ${ms(client.cooldowns.get(`${message.author.id}-${command.name}`) - Date.now(), { long: true })} before you can use this command again`);
        };

        if (!message.member.permissions.has(command.userPermissions ?? [])) return message.channel.send(`You need \`${command.userPermissions.map((value) => `${value[0].toUpperCase() + value.slice(1)}`).join(", ")}\` permissions to use this command`);
        if (!message.guild.me.permissions.has(command.botPermissions ?? [])) return message.channel.send(`I need \`${command.botPermissions.map((value) => `${value[0].toUpperCase() + value.slice(1)}`).join(", ")}\` permissions for this command to work`);

        try {
            await command.run(client, message, args);
            if (command.cooldown) {
                client.cooldowns.set(`${message.author.id}-${command.name}`, Date.now() + command.cooldown);
                setTimeout(() => {
                    client.cooldowns.delete(`${message.author.id}-${command.name}`);
                }, command.cooldown);
            };
        } catch (error) {
            return message.channel.send(`An error has occured: \`${error.message}\``);
        };
    }
};