const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");

module.exports = {
    name: "deposit",
    aliases: ["dep"],
    category: "economy",
    description: "deposits your money to your bank account",
    run: async (client, message, args) => {
        const data = await economy.findOne({ User: message.author.id });
        if (!data) return message.channel.send("I was unable to find your wallet, please try again");

        if (args[0].toLowerCase() == "all") {
            args[0] = data.Wallet;
        } else if (args[0] % 1 != 0 || args[0] <= 0) {
            return message.channel.send("You have to specify the amount you want to deposit as a valid number");
        };

        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`You have deposited $${args[0]} to your bank account`)
        message.channel.send({ embeds: [embed] });

        await economy.findOneAndUpdate({ User: message.author.id }, {
            $inc: {
                Wallet: -args[0],
                Bank: args[0]
            }
        });
    }
};