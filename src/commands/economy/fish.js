const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");

module.exports = {
    name: "hunt",
    category: "economy",
    description: "use your hunting rifle and hunt for some animals",
    cooldown: 1800000, // 30 minutes
    run: async (client, message) => {
        const data = await economy.findOne({ User: message.author.id });
        if (!data) return message.channel.send("I was unable to find your inventory, please try again");

        const rod = Object.keys(data.Inventory).includes("rod");
        if (!rod) return message.channel.send("You need to buy a fishing rod before you can fish");

        const money = Math.floor(Math.random() * 350) + 1;
        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`You have gathered a total of $${money} worth of fish`)
        message.channel.send({ embeds: [embed] });

        await economy.findOneAndUpdate({ user: message.author.id }, {
            $inc: { Wallet: money }
        });
    }
};