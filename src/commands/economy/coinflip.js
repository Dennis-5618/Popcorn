const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");

module.exports = {
    name: "coinflip",
    aliases: ["cf"],
    category: "economy",
    description: "flips a coin with the specified amount of money",
    run: async (client, message, args) => {
        if (args[0] % 1 != 0 || args[0] <= 0) return message.channel.send("Please specify the amount of money you want to bet as a valid number above 0");

        const data = await economy.findOne({ User: message.author.id });
        if (!data) return message.channel.send("I couldn't find your wallet, please try again");
        if (args[0] > data.Wallet) return message.channel.send("You don't have that much money in your wallet");
        if (args[0] > 10000) return message.channel.send("The maximum amount of money you can bet at once is $10,000");

        const coin = Math.floor(Math.random() * 2);
        if (coin == 0) {
            await economy.findOneAndUpdate({ User: message.author.id }, {
                $inc: { Wallet: -args[0], Bank: 0}
            });
            return message.channel.send(new MessageEmbed()
            .setColor("#5865F2")
            .setDescription("You lost")
            );
        } else {
            await economy.findOneAndUpdate({ User: message.author.id }, {
                $inc: { Wallet: args[0], Bank: 0}
            });
            return message.channel.send(new MessageEmbed()
            .setColor("#5865F2")
            .setDescription("You won")
            );
        }
    }
};