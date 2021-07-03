const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");

module.exports = {
    name: "hunt",
    category: "economy",
    description: "go hunt for some animals with your hunting rifle",
    cooldown: 15 * 60 * 1000,
    run: async (client, message) => {
        const data = await economy.findOne({ User: message.author.id });
        if (!data) return message.channel.send("I couldn't find your inventory, please try again");

        const huntingRifle = Object.keys(data.userInventory).includes("rifle");
        if (!huntingRifle) return message.channel.send("You need to have a hunting rifle in order to be able to hunt");

        const money = Math.floor(Math.random() * 500) + 1;
        await economy.findOneAndUpdate({ User: message.author.id }, {
            $inc: { Wallet: money }
        });

        return message.channel.send(new MessageEmbed()
            .setColor("#5865F2")
            .setDescription(`You've spent all day hunting and have sold everything for $${money}`)
        );
    }
};