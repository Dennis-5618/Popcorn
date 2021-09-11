const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");

module.exports = {
    name: "daily",
    aliases: ["aliases"],
    category: "economy",
    description: "gives you your daily amount of free money",
    cooldown: 86400000, // 1 day
    run: async (client, message) => {
        const money = Math.floor(Math.random() * 750) + 1;
        const embed = new MessageEmbed()
        .setColor("BLURPLE")
        .setDescription(`You have collected your daily free $${money}`)
        message.channel.send({ embeds: [embed] });

        await economy.findOneAndUpdate({ User: message.author.id}, {
            $inc: { Wallet: money }
        });
    }
};