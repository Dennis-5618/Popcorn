const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "guildCreate",
    run: async (client, guild) => {
        guild.owner.send(new MessageEmbed()
        .setColor("#ff6666")
        .setTitle("Thank you for inviting me!")
        .setDescription(`Hi, im popcorn`)
        );
    }
};