const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

var name = "creator"
module.exports = class CreatorCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'creator',
            aliases: [],
            group: 'meta',
            memberName: 'creator',
            description: "Get info. on who coded Onyx :eyes:",
            details: "Get info. on who coded Onyx :eyes:",
            examples: ["creator"]
        });
    }

    async run(msg, { text }) {
        var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
        var randomNumber = getRandomNumber(0, colour_array.length - 1);
        var randomColour = colour_array[randomNumber];

     msg.channel.send(
            {
                embed: {
                    color: randomColour,
                    title: `About Silvia`,
                    description: "Onyx was coded by Silvia O'Dwyer, a first year Computer Science student. \n If you want to see more of her work, check out her GitHub at github.com/silvia-odwyer",
                    fields: [{
                        name: "How To Make Silvia's Day",
                        value: "If you could star Onyx's GitHub repo, you'd make Silvia's day. :eyes: \n Or, Silvia would really appreciate if you could vote for this bot on discordbots.org, since it'll enable Onyx to be found on more servers, and to help Silvia keep working on it. "
                    }
                    ],
                    footer: {
                        text: "Coded by Silvia923#9909 <3"
                    }
                }
            });

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

};