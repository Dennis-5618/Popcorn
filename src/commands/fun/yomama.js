const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "yomama",
    aliases: ["momjoke"],
    category: "fun",
    description: "sends a random yo mama joke",
    run: async (client, message) => {
        const { joke } = await fetch("http://api.yomomma.info/").then((res) => res.json());

        message.channel.send(new MessageEmbed().setColor("#5865F2").setDescription(joke).setFooter("provided by: http://api.yomomma.info/"));
    }
};