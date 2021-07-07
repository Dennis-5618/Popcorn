const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");

module.exports = {
    name: "deposit",
    aliases: ["dep"],
    category: "economy",
    description: "deposits your money from your wallet to your bank account, keeping it safe from other users",
    run: async (client, message, args) => {
        const data = await economy.findOne({ User: message.author.id });
        if (!data) return message.channel.send("I was unable to locate your wallet, please try again");

        if (args[0].toLowerCase() == "all") { 
            args[0] = data.Wallet;
        } else if (args[0] % 1 != 0 || args[0] <= 0) {
            return message.channel.send("Please specify the amount of money you want to deposit as a valid number above 0");
        };

        await economy.findOneAndUpdate({ User: message.author.id }, {
            $inc: {
                Wallet: -args[0],
                Bank: args[0]
            }
        });

        return message.channel.send(new MessageEmbed()
            .setColor("#5865F2")
            .setDescription(`You have successfully deposited $${args[0]} to your bank account`)
        );
    }
};