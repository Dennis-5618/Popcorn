const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");

module.exports = {
    name: "leaderboard",
    aliases: ["board"],
    category: "economy",
    description: "shows how much money the richest users in this server have",
    run: async (client, message, args) => {
        let counter = 1;

        const data = await economy.find();
        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setAuthor("Leaderboard", message.guild.iconURL())
        
        for (const info of data) {
            const { User, Wallet, Bank } = info;

            const inGuild = message.guild.members.cache.get(User);
            if (inGuild) embed.addField(`${counter++}. ${inGuild.user.tag}`, `Balance: ${Wallet + Bank}`);
        };

        return message.channel.send({ embeds: [embed] });
    }
};