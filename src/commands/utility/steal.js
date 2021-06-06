const { Util } = require("discord.js")

module.exports = {
    name: "steal",
    category: "utility",
    description: "adds the specified emojis to your server",
    userPermissions: ["MANAGE_GUILD"],
    botPermissions: ["MANAGE_GUILD"],
    run: async (client, message, args) => {
        if (!args.length) return message.channel.send("Please specify some emojis that you want to add to this server");

        for (const emoji of args) {
            const parsed = Util.parseEmoji(emoji);

            if (parsed.id) {
                const fileExtention = parsed.animated ? ".gif" : ".png";
                const URL = `https://cdn.discordapp.com/emojis/${parsed.id + fileExtention}`;

                await message.guild.emojis.create(URL, parsed.name).then((added) => message.channel.send(`You have successfully added the following emojis to the server: \n${added}`));
            }
        };
    }
}