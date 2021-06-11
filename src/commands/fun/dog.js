const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "dog",
    aliases: ["dogs", "doggo", "doggos"],
    category: "fun",
    description: "sends a random dog image from Reddit",
    run: async (client, message) => {
        const subreddits = ["WiggleButs", "dogswithjobs", "DogShowerThoughts", "blop", "puppysmiles", "lookatmydog"];
        const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];

        const Reddit = await fetch(`https://www.reddit.com/r/${subreddit}/random/.json`);
        
        const json = await Reddit.json();
        if (!json[0]) return message.channel.send("Something went wrong, please try again");

        const data = json[0].data.children[0].data;

        message.channel.send(new MessageEmbed()
        .setColor("#5865F2")
        .setTitle(data.title)
        .setURL(`https://reddit.com${data.permalink}`)
        .setImage(data.url)
        .setFooter(`👍 ${data.ups} | 💬 ${data.num_comments}`)
        );
    }
};