const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "yomama",
    aliases: ["momjoke", "urmom"],
    category: "fun",
    description: "returns a random yo mama joke",
    run: async (client, message) => {
        const { joke } = await fetch("http://api.yomomma.info/").then((res) => res.json());

        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(joke)
            .setFooter("Provided by: api.yomomma.info")
        return message.channel.send({ embeds: [embed] });
    }
};