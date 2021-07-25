const translate = require("@iamtraction/google-translate");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "translate",
    category: "information",
    description: "translates the provided text to a specified language",
    run: async (client, message, args) => {
        const text = args.slice(1).join(" ");

        if (!args[0]) return message.channel.send("Please specify the ISO code of the language you want to translate to");
        if (!text) return message.channel.send("Please also provide some text for me to translate");

        translate(text, { to: args[0] }).then(res => {
            message.channel.send(new MessageEmbed()
                .setColor("#5865F2")
                .setTitle("Translate")
                .setDescription(res.text)
                .setFooter(`Translated from: ${(res.from.language.iso).toUpperCase()}`)
            );
        }).catch(error => {
            message.channel.send("I couldn't find that language, please try again");
        });
    }
};