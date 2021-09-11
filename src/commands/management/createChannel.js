const { MessageEmbed, MessageCollector } = require("discord.js");

module.exports = {
    name: "createchannel",
    aliases: ["channelcreate"],
    category: "server management",
    description: "creates a new channel with the specified type and name",
    userPermissions: ["MANAGE_CHANNELS"],
    botPermissions: ["MANAGE_CHANNELS"],
    run: async (client, message) => {
        const embed = new MessageEmbed().setColor("BLURPLE");

        const step1 = embed
            .setTitle("Channel setup (1/3)")
            .setDescription("Do you want to create a \`text\` or \`voice\` channel?")
        message.channel.send({ embeds: [step1] });

        const filter = m => m.author.id == message.author.id;

        // Step 1
        const typeCollector = new MessageCollector(message.channel, { filter, time: 30000 });
        typeCollector.on("collect", msg => {

            const type = msg.content.toLowerCase();
            if (type != "text" && type != "voice") return message.channel.send("Invalid channel type, please select \`text\` or \`voice\`");

            const step2 = embed
                .setTitle("Channel setup (2/3)")
                .setDescription("Specify the category ID which you want to create the channel under")
            message.channel.send({ embeds: [step2] });

            typeCollector.stop();

            // Step 2
            const categoryCollector = new MessageCollector(message.channel, { filter, time: 30000 });
            categoryCollector.on("collect", msg => {

                const parent = message.guild.channels.cache.find(c => c.type == "GUILD_CATEGORY" && c.id == msg.content);
                if (!parent) return message.channel.send("I was unable to find the category, please try again");

                const step3 = embed
                    .setTitle("Channel setup (3/3)")
                    .setDescription("What name do you want to give to the channel?")
                message.channel.send({ embeds: [step3] });

                categoryCollector.stop();

                // Step 3
                const nameCollector = new MessageCollector(message.channel, { filter, time: 30000 });
                nameCollector.on("collect", async msg => {

                    const createdChannel = await message.guild.channels.create(msg.content, { parent, type });

                    const finished = embed
                        .setDescription(`You have successfully created ${createdChannel}`)
                    return message.channel.send({ embeds: [finished] });
                });
            });
        });
    }
};