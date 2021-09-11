const { MessageEmbed } = require("discord.js");
const { hugs } = require("../../utils/gifs.json");

module.exports = {
    name: "hug",
    category: "interactions",
    descriptions: "hug the mentioned user",
    run: async (client, message, args) => {
        const user = message.mentions.members.first();
        if (!user) return message.channel.send("I was unable to find that user, please try again");

        const hug = hugs[Math.floor(Math.random() * hugs.length)];

        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`${message.author} gave ${user} a hug`)
            .setImage(hug)
        return message.channel.send({ embeds: [embed] });
    }
};