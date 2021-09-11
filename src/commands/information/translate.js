const translate = require("@iamtraction/google-translate");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "translate",
    category: "information",
    description: "translates the provided text to the specified language",
    run: (client, message, args) => {
        const text = args.slice(1).join(" ");

        if (!args[0]) return message.channel.send("Please specify the language ISO code you want to translate to");
        if (!text) return message.channel.send("Please also specify some text to translate");

        translate(text, { to: args[0] }).then(res => {
            const embed = new MessageEmbed()
                .setColor("BLURPLE")
                .setTitle("Translate")
                .addField("Original:", `\`${text}\``)
                .addField("Translated:", `\`${res.text}\``)
                .setFooter(`Translated from: ${(res.from.language.iso).toUpperCase()}`)
            return message.channel.send({ embeds: [embed] });
        }).catch(error => {
            message.channel.send("I couldn't find that language, please try again");
        });
    }
};