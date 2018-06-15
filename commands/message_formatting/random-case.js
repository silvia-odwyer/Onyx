const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;


var name = "random-case"
module.exports = class RandomCaseCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'random-case',
            aliases: [],
            group: 'message_formatting',
            memberName: 'random-case',
            description: "Randomize every letter in a sentence's case, so iT tUrnS oUt lIke ThIS.",
            details: "Randomize every letter in a sentence's case, so iT tUrnS oUt lIke ThIS.",
            examples: ["randomCase this is a sample sentence"],

            args: [
                {
                    key: 'text',
                    prompt: 'Make sure to include text after the random-case command.`',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, { text }) {
        var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

        var msg_string = text.toLowerCase();

        var randomCaseString = "";

        var word, letter;

        for (var i = 0; i < msg_string.length; i += 1) {

            if (alphabet.indexOf(msg_string[i])) {
                var randomNumber = getRandomNumber(0, 1);

                switch (randomNumber) {

                    case 0:
                        letter = msg_string[i].toLowerCase();
                        break;
                    case 1:
                        letter = msg_string[i].toUpperCase();
                }
            }
            else {
                letter = msg_string[i];
            }
            randomCaseString += letter;
        }
        msg.channel.send(randomCaseString);

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
