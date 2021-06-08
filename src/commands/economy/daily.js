const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");

module.exports = {
    name: "daily",
    category: "economy",
    description: "gives you your daily free coins",
    cooldown: 24 * 60 * 60 * 1000,
    run: async (client, message) => {
        const money = Math.floor(Math.random() * 300) + 1;

        await economy.findOneAndUpdate({ User: message.author.id }, {
            $inc: { Wallet: money }
        });

        return message.channel.send(new MessageEmbed()
        .setColor("#5865F2")
        .setDescription(`You have collected your daily free $${money}`)
        );
    }
};