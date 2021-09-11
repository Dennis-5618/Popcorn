const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");
const shopItems = require("../../utils/shopItems");

module.exports = {
    name: "buy",
    aliases: ["purchase"],
    category: "economy",
    description: "buys the specified item from the shop",
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("You need to specify the ID of the item you're trying to buy");

        const item = shopItems.find(res => res.id == args[0].toLowerCase());
        if (!item) return message.channel.send("I was unable to find that item, please try again");

        const data = await economy.findOne({ User: message.author.id });
        if (data.Wallet < item.price) return message.channel.send("You currently don't have enough money in your wallet to purchase that item");

        const hasItem = Object.keys(data.Inventory).includes(item.id);
        if (hasItem) return message.channel.send("You already have that item in your inventory");

        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`You have bought the ${item.item} for ${item.price}`)
        message.channel.send({ embeds: [embed] });

        await economy.findOneAndUpdate({ User: message.author.id }, {
            [`Inventory.${[item.id]}`]: 1,
            $inc: {
                Wallet: -[item.price]
            }
        });
    }
};