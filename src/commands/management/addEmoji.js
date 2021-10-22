const { Util, MessageEmbed } = require("discord.js");

module.exports = {
    name: "addemoji",
    aliases: ["steal"],
    category: "utility",
    description: "adds the specified emojis to the server",
    userPermissions: ["MANAGE_GUILD"],
    botPermissions: ["MANAGE_GUILD"],
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("You need to specify some emojis that you want to add to the server");

        for (const emoji of args) {
            const parsed = Util.parseEmoji(emoji);
            if (parsed.id) {
                const fileExtention = parsed.animated ? ".gif" : ".png";
                const URL = `https://cdn.discordapp.com/emojis/${parsed.id + fileExtention}`;

                await message.guild.emojis.create(URL, parsed.name).then(newEmoji => {
                    const embed = new MessageEmbed()
                        .setColor("BLURPLE")
                        .setDescription(`You have successfully added the following emojis: \n${newEmoji}`)
                    return message.channel.send({ embeds: [embed] });
                });
            };
        };
    }
};