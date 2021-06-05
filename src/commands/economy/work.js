const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");

module.exports = {
    name: "work",
    category: "economy",
    description: "gets you some money, can only be used once per 30 minutes",
    cooldown: 30 * 60 * 1000,
    run: async (client, message) => {
        const money = Math.floor(Math.random() * 100) + 1;
        
        await economy.findOneAndUpdate({ User: message.author.id }, {
            $inc: { Wallet: money }
        });

        message.channel.send(new MessageEmbed()
        .setColor("#5865F2")
        .setDescription(`You have worked tirelessly the entire day, here is $${money} for your hard work`)
        );
    }
};