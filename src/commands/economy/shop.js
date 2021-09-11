const { MessageEmbed } = require("discord.js");
const shopItems = require("../../utils/shopItems")

module.exports = {
    name: "shop",
    aliases: ["items"],
    category: "economy",
    description: "shows all items that are available for purchase",
    run: async (client, message) => {
        const embed = new MessageEmbed()
        .setColor("BLURPLE")
        .setTitle("Shop")

        shopItems.map(res => {
            embed.addField(`${res.item} - $${res.price}`, `ID: \`${res.id}\``)
        });

        return message.channel.send({ embeds: [embed] });
    }
};