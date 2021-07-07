const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");

module.exports = {
    name: "mine",
    category: "economy",
    description: "use your pickaxe ",
    cooldown: 60 * 60 * 1000,
    run: async (client, message) => {
        const data = await economy.findOne({ User: message.author.id });
        if (!data) return message.channel.send("I couldn't find your inventory, please try again");

        const pickaxe = Object.keys(data.userInventory).includes("pickaxe");
        if (!pickaxe) return message.channel.send("You need to buy a pickaxe before you can use this command");

        const money = Math.floor(Math.random() * 650) + 1;
        await economy.findOneAndUpdate({ User: message.author.id }, {
            $inc: { Wallet: money }
        });

        return message.channel.send(new MessageEmbed()
            .setColor("#5865F2")
            .setDescription(`You have sold everything you've found for ${money}`)
        );
    }
};