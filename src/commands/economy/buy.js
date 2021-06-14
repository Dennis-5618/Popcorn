const economy = require("../../schemas/economy");
const shopItems = require("../../utils/shopItems");

module.exports = {
    name: "buy",
    category: "economy",
    description: "buys the specified item and adds it to your inventory",
    run: async (client, message, args) => {
        const item = shopItems.find((value) => value.id == args[0].toLowerCase());
        if (!item) return message.channel.send("I couldn't find that item, please make sure to provide the item ID");

        const data = await economy.findOne({ User: message.author.id });
        if (data.Wallet < item.price) return message.channel.send(`You currently don't have enough money in your wallet to buy the ${item.item}`);

        const hasItem = Object.keys(data.userInventory).includes(item.id);
        if (hasItem) return message.channel.send("You already have that item in your inventory");
        
        await economy.findOneAndUpdate({ User: message.author.id }, {
            userInventory: { [item.id]: 1 },
            $inc: { Wallet: -[item.price] }
        });
    }
};