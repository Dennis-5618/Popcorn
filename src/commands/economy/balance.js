const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy")

module.exports = {
    name: "balance",
    aliases: ["bal"],
    category: "economy",
    description: "shows how much money you have in your wallet and in your bank account",
    run: async (client, message) => {
        const data = await economy.findOne({ User: message.author.id });
        if (!data) return message.channel.send("I was unable to find your wallet, please try again");
        else {
            message.channel.send(new MessageEmbed()
            .setColor("#5865F2")
            .setAuthor(`${message.author.username}'s balance`, message.author.displayAvatarURL())
            .setDescription(`Wallet: \`${data.Wallet}\` \nBank: \`${data.Bank}\``)
            );
        };
    }
};