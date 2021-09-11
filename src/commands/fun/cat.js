const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "cat",
    aliases: ["cats", "catto", "cattos"],
    category: "fun",
    description: "sends a random cute image from Reddit",
    run: async (client, message) => {
        const subreddits = ["cats", "Catloaf", "MEOW_IRL", "CatGifs"];
        const selected = subreddits[Math.floor(Math.random() * subreddits.length)];

        const Reddit = await fetch(`https://www.reddit.com/r/${selected}/random/.json`);

        const json = await Reddit.json();
        if (!json[0]) return message.channel.send("Something went wrong while getting your image, please try again");

        const data = await json[0].data.children[0].data;

        const embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setTitle(data.title)
            .setURL(`https://reddit.com/${data.permalink}`)
            .setImage(data.url, { dynamic: true, size: 512 })
            .setFooter(`👍: ${data.ups} | 💬: ${data.num_comments}`)
        return message.channel.send({ embeds: [embed] });
    }
};