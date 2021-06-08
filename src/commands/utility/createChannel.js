const { MessageEmbed, MessageCollector } = require("discord.js");

module.exports = {
    name: "createchannel",
    aliases: ["channelcreate"],
    category: "utility",
    description: "creates a new channel with the specified type and name",
    userPermissions: ["MANAGE_CHANNELS"],
    botPermissions: ["MANAGE_CHANNELS"],
    run: async (client, message, args) => {
        const Embed = new MessageEmbed().setColor("#5865F2");

        message.channel.send(Embed
            .setTitle("Channel setup (1/3)")
            .setDescription(`Please specify if you want to create either a text or voice channel`)
        );

        const channelCollector = new MessageCollector(message.channel, m => m.author.id == message.author.id, { time: 30000 });
        channelCollector.on("collect", async msg => {

            const Type = msg.content.toLowerCase();
            if (Type != "text" && Type != "voice") return message.channel.send("Invalid channel type, please specify if you want to create either a text or voice channel");
            else {
                channelCollector.stop();

                message.channel.send(Embed
                    .setTitle("Channel setup (2/3)")
                    .setDescription("Please specify the category ID where you want to create the channel under")
                );

                const categoryCollector = new MessageCollector(message.channel, m => m.author.id == message.author.id, { time: 30000 });
                categoryCollector.on("collect", async msg => {

                    const Category = message.guild.channels.cache.find(ch => ch.type == "category" && ch.id == msg.content);
                    if (!Category) return message.channel.send("I couldn't find that category, please try again");
                    else {
                        categoryCollector.stop();

                        message.channel.send(Embed
                            .setTitle("Channel setup (3/3)")
                            .setDescription("Please specify the name you want to give to the channel")
                        );

                        const nameCollector = new MessageCollector(message.channel, m => m.author.id == message.author.id, { time: 30000 });
                        nameCollector.on("collect", async msg => {
                            nameCollector.stop();

                            const created = await message.guild.channels.create(msg.content, {
                                parent: Category,
                                type: Type
                            });

                            message.channel.send(Embed
                                .setTitle("Channel created!")
                                .setDescription(`You have successfully created ${created}`)
                            );
                        });
                    };
                });
            };
        });
    }
};