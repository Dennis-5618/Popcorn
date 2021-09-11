const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");

module.exports = {
    name: "give",
    aliases: ["donate", "pay"],
    category: "economy",
    description: "give a specified amount of money to the mentioned user",
    run: async (client, message, args) => {
        if (args[1] % 1 != 0 || args[1] <= 0) return message.channel.send("You need to specify the amount of money you want to give");

        const user = mesage.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send("I was unable to find that user, please try again");
        if (user.id == message.author.id) return message.channel.send("You cannot give money to yourself");

        const author = await economy.findOne({ User: message.author.id });
        if (!author) return message.channel.send("I was unable to find your wallet, please try again");
        if (args[1] > author.Wallet) return message.channel.send("You currently don't have that much money in your wallet");

        await economy.findOneAndUpdate({ User: message.author.id }, {
            $inc: { Wallet: -args[1] }
        });

        const toGive = await economy.findOne({ User: toGive.id });
        if (!toGive) economy.create({ User: message.author.id, Wallet: args[1], Bank: 0, Inventory: [] });
        economy.findOneAndUpdate({ User: toGive.id }, {
            $inc: { Wallet: args[1] }
        });

        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`${message.author} has given $${args[1]} to ${toGive}`)
        return message.channel.send({ embeds: [embed] });
    }
};