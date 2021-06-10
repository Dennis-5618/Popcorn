const { MessageEmbed } = require("discord.js");
const { hugs } = require("../../utils/gifs.json");

module.exports = {
    name: "hug",
    category: "fun",
    description: "hugs the mentioned user",
    run: async (client, message, args) => {
        const user = message.mentions.members.first();
        if (!user) return message.channel.send("I couldn't find that user, please try again");

        const hug = hugs[Math.floor(Math.random() * (hugs.length))];

        message.channel.send(new MessageEmbed()
        .setColor("#5865F2")
        .setDescription(`${message.author} gave ${user} a hug`)
        .setImage(hug)
        );
    }
};