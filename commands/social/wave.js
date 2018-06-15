const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');
const request = require("request");

var name = "wave"
module.exports = class WaveCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'wave',
            aliases: [],
            group: 'social',
            memberName: 'wave',
            description: "Wave at another user! :wave:",
            details: "Wave at another user! :wave:",
            examples: ["wave @Silvia923#9909"],

            args: [
                {
                    key: 'text',
                    prompt: "Tee hee, you never told me who you wanted to wave at ^.^ Did you actually want to wave at me instead? :wave: Guess I'll wave to you toooo \n Try mentioning someone along with your command :eyes:",
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, { text }) {
        // Necessary for choosing random colours for rich embeds
        var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
        var randomNumber = getRandomNumber(0, colour_array.length - 1);
        var randomColour = colour_array[randomNumber];

        var sender = msg.message.author;
        var receiver = text.split(" ")[0];

        msg.channel.send(`${sender} just waved at ${receiver} :wave:`)

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
