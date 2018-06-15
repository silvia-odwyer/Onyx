const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');
const request = require("request");

var name = "poke"
module.exports = class PokeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'poke',
            aliases: [],
            group: 'social',
            memberName: 'poke',
            description: "Poke another user! :point_right:",
            details: "Poke another user! :point_right:",
            examples: ["poke @Silvia923#9909"],

            args: [
                {
                    key: 'text',
                    prompt: "Tee hee, you never told me who you wanted to poke ^.^ Did you actually want to poke me instead? :grin: \nTry mentioning someone along with your command :eyes:",
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

        var poker = msg.message.author;
        var pokee = text.split(" ")[0];
        msg.channel.send(`${poker} just poked :point_right: ${pokee} :eyes:`)

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
