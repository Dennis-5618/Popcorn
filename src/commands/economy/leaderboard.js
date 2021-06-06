const { MessageEmbed } = require("discord.js");
const economy = require("../../schemas/economy");

module.exports = {
    name: "leaderboard",
    category: "economy",
    description: "shows the amount of money the richest people in the server have",
    run: async (client, message, args) => {
        let counter = 1;
        const data = await economy.find()
        const embed = new MessageEmbed().setColor("#5865F2").setAuthor("Leaderboard", message.guild.iconURL());

        for (const user of data) {
            const { User, Wallet, Bank } = user;

            const isInGuild = message.guild.members.cache.get(User);
            if (isInGuild) {
                embed.addField(`${counter++}. ${isInGuild.user.tag}`, `Balance: ${Wallet + Bank}`)
            };
        };

        message.channel.send(embed)
    }
};