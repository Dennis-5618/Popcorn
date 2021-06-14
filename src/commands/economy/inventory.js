const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");

module.exports = {
    name: "inventory",
    aliases: ["inv"],
    category: "economy",
    description: "shows all the items you have in your inventory",
    run: async (client, message, args) => {
        const data = await economy.findOne({ User: message.author.id });
        if (!data) return message.channel.send("I was unable to find your inventory, please try again");

        const embed = new MessageEmbed()
            .setColor("#5865F2")
            .setAuthor(`${message.author.tag}'s inventory`, message.author.avatarURL({ dynamic: true }))
            .addField("Wallet balance:", `${data.Wallet}`, true)
            .addField("Bank balance:", `${data.Bank}`, true)
        ;

        Object.keys(data.userInventory).map((value) => {
            return embed.addField(`Item: \`${value}\``, `Amount: \`${data.userInventory[value]}\``)
        });

        message.channel.send(embed);
    }
};