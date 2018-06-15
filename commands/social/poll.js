const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

var name = "poll"
module.exports = class PollCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'poll',
            aliases: [],
            group: 'social',
            memberName: 'poll',
            description: "Create a poll. Just append a question onto your command, and the reactions will symbolise votes.",
            details: oneLine`
            Create a poll. Just append a question onto your command, and the reactions will symbolise votes.
			`,
            examples: ["poll Do you want more text channels?"],

            args: [
                {
                    key: 'text',
                    prompt: 'What question would you like to convert into a poll?',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, { text }) {
        var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
        var randomNumber = getRandomNumber(0, colour_array.length - 1);
        var randomColour = colour_array[randomNumber];

        var poll_question = text;
        msg.channel.send("POLL");
        
        msg.channel.send(
            {
                embed: {
                    color: randomColour,
                    author: {
                        name: "msg.message.author,",
                        icon_url: "msg.message.author.avatarURL"
                    },
                    title: `Poll: ${poll_question}`,
                    description: `React below!`
                }
            })
            .then(function (poll_message) {
                poll_message.react("👍")
                poll_message.react("👎")
            }).catch(function () {
                console.log("ERROR: Couldn't make poll.")
            });
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

};