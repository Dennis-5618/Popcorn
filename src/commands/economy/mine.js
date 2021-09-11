const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");

module.exports = {
    name: "mine",
    category: "economy",
    description: "use your pickaxe to mine for some gold",
    cooldown: 3600000, // 1 hour
    run: async (client, message) => {
        const data = await economy.findOne({ User: message.author.id });
        if (!data) return message.channel.send("I was unable to find your inventory, please try again");

        const pickaxe = Object.keys(data.Inventory).includes("pickaxe");
        if (!pickaxe) return message.channel.send("You need to buy a pickaxe before you can mine");

        const money = Math.floor(Math.random() * 1000) + 1;
        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`You have gathered a total of $${money} worth of gold`)
        message.channel.send({ embeds: [embed] });

        await economy.findOneAndUpdate({ user: message.author.id }, {
            $inc: { Wallet: money }
        });
    }
};