const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");

module.exports = {
    name: "withdraw",
    aliases: ["with"],
    category: "economy",
    description: "withdraws money from your bank account to your wallet",
    run: async (client, message, args) => {
        if (args[0] % 1 != 0 || args[0] <= 0) return message.channel.send("Please specify the amount of money you want to withdraw as a valid number above 0");

        const data = await economy.findOne({ User: message.author.id });
        if (!data) return message.channel.send("I couldn't find your bank account, please try again");
        if (args[0] > data.Bank) return message.channel.send(`You don't have that much money on your bank account, your current balance is: $${data.Bank}`);

        await economy.findOneAndUpdate({ User: message.author.id }, {
            $inc: { Wallet: args[0], Bank: -args[0] }
        });

        return message.channel.send(new MessageEmbed()
            .setColor("#5865F2")
            .setDescription(`You have successfully withdrawn $${args[0]} from your bank account`)
        );
    }
}