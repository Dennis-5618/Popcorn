const { MessageEmbed, Util } = require("discord.js");

module.exports = {
    name: "removeemoji",
    aliases: ["deleteemoji"],
    category: "server management",
    description: "removes the specified emojis from the server",
    userPermissions: ["MANAGE_GUILD"],
    botPermissions: ["MANAGE_GUILD"],
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("You need to specify some emojis you want to remove from the server");

        for (const emoji of args) {
            const parsed = Util.parseEmoji(emoji);
            
            const selected = await message.guild.emojis.cache.get(parsed.id);
            selected.delete();

            const embed = new MessageEmbed()
                .setColor("BLURPLE")
                .setDescription(`You have successfully removed ${args.length} emoji(s)`)
            return message.channel.send({ embeds: [embed] });
        };
    }
};