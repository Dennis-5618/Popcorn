const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");

module.exports = {
    name: "work",
    aliases: ["aliases"],
    category: "economy",
    description: "description",
    cooldown: 1800000, // 30 minutes
    run: async (client, message) => {
        const money = Math.floor(Math.random() * 150) + 1;
        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`You were paid $${money} for your work`)
        message.channel.send({ embeds: [embed] });

        await economy.findOneAndUpdate({ User: message.author.id }, {
            $inc: { Wallet: money }
        });
    }
};