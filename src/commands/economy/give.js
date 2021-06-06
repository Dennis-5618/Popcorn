const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");

module.exports = {
    name: "give",
    aliases: ["donate", "pay"],
    category: "economy",
    description: "gives a specified amount of coins to the mentioned user",
    run: async (client, message, args) => {
        if (args[1] % 1 != 0 || args[1] <= 0) return message.channel.send("Please specify the amount of money you want to deposit as a valid number above 0");

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send("I couldn't find that user, please try again");
        if (user.id == message.author.id) return message.channel.send("You cannot give yourself money");

        const author = await economy.findOne({ User: message.author.id });
        if (!author) return message.channel.send("I couldn't find your wallet, please try again");
        if (args[1] > author.Wallet) return message.channel.send("You don't have that much money in your wallet to give");

        await economy.findOneAndUpdate({ User: message.author.id }, {
            $inc: { Wallet: -args[1], Bank: 0 }
        });

        const member = await economy.findOne({ User: user.id });
        if (!member) {
            await economy.create({ User: user.id, Wallet: args[1], Bank: 0 });
        } else {
            await economy.findOneAndUpdate({ User: user.id }, {
                $inc: { Wallet: args[1], Bank: 0 }
            });
        };

        return message.channel.send(new MessageEmbed()
        .setColor("#5865F2")
        .setDescription(`You have successfully given $${args[1]} to ${user}`)
        );
    }
};