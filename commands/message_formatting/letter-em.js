const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

var name = "letter-em"
module.exports = class LetterEmCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'letter-em',
            aliases: [],
            group: 'message_formatting',
            memberName: 'letter-em',
            description: "Convert all the letters in a message to emoji letters.",
            details: oneLine`
            Convert all the letters in a message to emoji letters.
			`,
            examples: ["letter-em hello there"],

            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like to convert to emoji letters?',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, { text }) {
        var emoji_letter;
        var numbers = { "1": "one", "2": "two", "3": "three", "4": "four", "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine" };
        var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

        var number_keys = Object.keys(numbers);

        var string = text.toLowerCase();

        var letter;
        var emoji_string = ""
        for (var i = 0; i < string.length; i += 1) {
            letter = string[i];
            if (alphabet.includes(letter) === true) {
                if (letter != "b") {
                    emoji_letter = `:regional_indicator_${letter}:   `;
                }
                else {
                    emoji_letter = ":b:   "
                }
                emoji_string += emoji_letter;
            }
            else if (number_keys.includes(letter) === true) {
                var num_string = numbers[letter];
                emoji_letter = `:${num_string}: `
                emoji_string += emoji_letter
            }
            else if (letter === " ") {
                emoji_string += "      ";
            }
            else {
                emoji_string += letter;
            }

        }
        msg.channel.send(emoji_string)
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

};    