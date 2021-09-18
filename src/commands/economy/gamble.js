const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");

module.exports = {
    name: "gamble",
    category: "economy",
    description: "gamble your money and have a 50% chance to double it",
    run: async (client, message, args) => {
        if (args[0] % 1 != 0 || args[0] <= 0) return message.channel.send("You need to specify the amount of money you want to gamble");

        const data = await economy.findOne({ User: message.author.id });
        if (!data) return message.channel.send("I was unable to find your wallet, please try again");
        if (args[0] > data.Wallet) return message.channel.send("You currently don't have enough money in your wallet");
        if (args[0]) return message.channel.send("You've reached the maximum amount of money allowed to be gambled at once, the maximum you can bet is $10000");

        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`Your new balance is: ${data.Wallet}`)

        const rng = Math.floor(Math.random() * 2);
        if (rng == 0) {
            embed.setTitle("You've lost");
            message.channel.send({ embeds: [embed] });

            await economy.findOneAndUpdate({ User: message.author.id }, {
                $inc: {
                    Wallet: -args[0]
                }
            });

        } else {
            embed.setTitle("You've won");
            message.channel.send({ embeds: [embed] });

            await economy.findOneAndUpdate({ User: message.author.id }, {
                $inc: {
                    Wallet: args[0]
                }
            });
        }
    }
};