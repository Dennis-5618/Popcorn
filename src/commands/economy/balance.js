const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");

module.exports = {
    name: "balance",
    aliases: ["bal", "inventory", "inv"],
    category: "economy",
    description: "displays how much money you have in your wallet and bank account",
    run: async (client, message) => {
        const data = await economy.findOne({ User: message.author.id });
        if (!data) return message.channel.send("I was unable to find you wallet, please try again");

        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setAuthor(`${message.author.username}'s inventory`, message.author.displayAvatarURL())
            .addField("Wallet:", `\`${data.Wallet}\``, true)
            .addField("Bank:", `\`${data.Bank}\``, true)

        Object.keys(data.Inventory).map(res => {
            console.log(res)
            embed.addField(`Item: \`${res}\``, `Amount: \`${data.Inventory[res]}\``)
        });

        return message.channel.send({ embeds: [embed] });
    }
};