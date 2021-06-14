const { MessageEmbed } = require("discord.js");
const shopItems = require("../../utils/shopItems");

module.exports = {
    name: "shop",
    aliases: ["items"],
    category: "economy",
    description: "shows the items that are up for sale",
    run: async (client, message) => {
        const embed = new MessageEmbed().setColor("#5865F2").setTitle("Shop");

        message.channel.send(shopItems.map((value) => {
            return embed.addField(`${value.item} - $${value.price}`, `ID: \`${value.id}\``)
        }));
    }
};