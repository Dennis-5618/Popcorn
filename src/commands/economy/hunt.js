const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");

module.exports = {
    name: "hunt",
    category: "economy",
    description: "use your hunting rifle and hunt for some animals",
    cooldown: 2700000, // 45 minutes
    run: async (client, message) => {
        const data = await economy.findOne({ User: message.author.id });
        if (!data) return message.channel.send("I was unable to find your inventory, please try again");

        const rifle = Object.keys(data.Inventory).includes("rifle");
        if (!rifle) return message.channel.send("You need to buy a hunting rifle before you can hunt");

        const money = Math.floor(Math.random() * 500) + 1;
        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`You have gathered a total of $${money} worth of animals`)
        message.channel.send({ embeds: [embed] });

        await economy.findOneAndUpdate({ user: message.author.id }, {
            $inc: { Wallet: money }
        });
    }
};