const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

var name = "server"
module.exports = class ServerCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'server',
            aliases: [],
            group: 'meta',
            memberName: 'server',
            description: "Get server stats, such as member count, when the server was created, and more...",
            details: "Get server stats, such as member count, when the server was created, and more...",
            examples: ["server"],

        });
    }

    async run(msg, args) {
        // Necessary for choosing random colours for rich embeds
        var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
        var randomNumber = getRandomNumber(0, colour_array.length - 1);
        var randomColour = colour_array[randomNumber];

        var guild = msg.guild;
        msg.channel.send(
            {
                embed: {
                    color: randomColour,
                    author: {
                        name: guild.name,
                        icon_url: guild.iconURL
                    },
                    title: `Server Stats for ${guild.name}`,
                    fields: [
                        {
                            name: `Created At`,
                            value: `${guild.createdAt}`,
                        },
                        {
                            name: "Owner",
                            value: `${guild.owner.user.username}`
                        },
                        {
                            name: "Member Count",
                            value: `${guild.memberCount}`
                        }
                    ]
                }
            });

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};