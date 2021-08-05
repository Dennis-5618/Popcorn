const { MessageCollector, MessageEmbed } = require("discord.js");

module.exports = {
    name: "createchannel",
    aliases: ["channelcreate"],
    category: "utility",
    description: "creates a new channel with the specified type and name",
    userPermissions: ["MANAGE_CHANNELS"],
    botPermissions: ["MANAGE_CHANNELS"],
    run: async (client, message) => {
        const embed = new MessageEmbed().setColor("#5865F2");

        message.channel.send(embed
            .setTitle("Channel setup (1/3)")
            .setDescription("Please specify if you want to create a text or voice channel")
        );

        const channelTypeCollector = new MessageCollector(message.channel, (m) => m.author.id == message.author.id, { time: 30000 });
        channelTypeCollector.on("collect", (msg) => {

            const channelType = msg.content.toLowerCase();
            if (channelType != "text" && channelType != "voice") return message.channel.send("Please make sure to specify if you want to create a text or voice channel");

            channelTypeCollector.stop();

            message.channel.send(embed
                .setTitle("Channel setup (2/3)")
                .setDescription("Please specify the category ID where you want to create the channel under")
            );

            const categoryCollector = new MessageCollector(message.channel, (m) => m.author.id == message.author.id, { time: 30000 });
            categoryCollector.on("collect", (msg) => {

                const channelCategory = message.guild.channels.cache.find(c => c.type == "category" && c.id == msg.content);
                if (!channelCategory) return message.channel.send("I couldn't find the category, please try again");

                categoryCollector.stop();

                message.channel.send(embed
                    .setTitle("Channel setup (3/3)")
                    .setDescription("Please specify the name you want to give to the channel")
                );

                const channelNameCollector = new MessageCollector(message.channel, (m) => m.author.id == message.author.id, { time: 30000 });
                channelNameCollector.on("collect", async (msg) => {

                    const newChannel = await message.guild.channels.create(msg.content, {
                        parent: channelCategory,
                        type: channelType
                    });

                    channelNameCollector.stop();

                    message.channel.send(embed
                        .setTitle("Channel created!")
                        .setDescription(`You have successfully created ${newChannel}`)
                    );
                });
            });
        });
    }
};