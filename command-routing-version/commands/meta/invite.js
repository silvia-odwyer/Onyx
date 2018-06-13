const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch')

var name = "invite"
module.exports = class InviteCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            aliases: [],
            group: 'meta',
            memberName: 'invite',
            description: "Get Onyx's invite link, so that she can be invited to other servers.",
            details: oneLine`
            Get Onyx's invite link, so that she can be invited to other servers.
			`,
            examples: ["invite"],

        });
    }

    async run(msg, args) {
        // Necessary for choosing random colours for rich embeds
        var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
        var randomNumber = getRandomNumber(0, colour_array.length - 1);
        var randomColour = colour_array[randomNumber];

        var onyx_invite_link = "https://discordapp.com/oauth2/authorize?&client_id=444948120573313024&scope=bot&permissions=0"
        msg.channel.send(
            {
                embed: {
                    color: randomColour,
                    description: "Use this link to invite me to other servers :eyes:",
                    title: `Onyx Invite Link`,
                    fields: [
                        {
                            name: `Link`,
                            value: `${onyx_invite_link}`
                        }
                    ]
                }
            });

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
