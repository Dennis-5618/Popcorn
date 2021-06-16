const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");

module.exports = {
    name: "fish",
    category: "economy",
    description: "use your fishing rod to fish for money",
    run: async (client, message) => {
        const data = await economy.findOne({ User: message.author.id });
        if (!data) return message.channel.send("I couldn't find your inventory, please try again");

        const fishingRod = Object.keys(data.userInventory).includes("rod");
        if (!fishingRod) return message.channel.send("You need a fishing rod in order to be able to fish");

        const money = Math.floor(Math.random() * 350) + 1;
        await economy.findOneAndUpdate({ User: message.author.id }, {
            $inc: { Wallet: money }
        });

        return message.channel.send(new MessageEmbed()
            .setColor("#5865F2")
            .setDescription(`You've caught some fish and sold them for $${money}`)
        );
    }
};