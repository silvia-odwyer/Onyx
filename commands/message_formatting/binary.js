const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

var name = "binary"
module.exports = class BinaryCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'binary',
            aliases: [],
            group: 'message_formatting',
            memberName: 'binary',
            description: "Translate a message to binary.",
            details: oneLine`
            Translate a message to binary.
			`,
            examples: ["binary Hello there, how are you?"],
            
            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like to convert to binary?',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, { text }) {
        // Necessary for choosing random colours for rich embeds
        // Might implement rich embeds in the future.
        var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
        var randomNumber = getRandomNumber(0, colour_array.length - 1);
        var randomColour = colour_array[randomNumber];
        var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

        var fmt_array = text.split("");

        var binaryMessage = translateMessage(fmt_array, "binary", alphabet)
        console.log(binaryMessage)
        msg.reply(binaryMessage)

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function translateMessage(fmt_array, fontList, alphabet) {
            var convertedFontMessage = "";
            var translatedLetter = "";
        
            // EXTRACTING THE APPROPRIATE CHARACTER LIST.
            var font_cmds_object = require('../../assets/font_lists.json');
            var characterList = font_cmds_object[fontList];
        
            for (var i = 0; i < fmt_array.length; i += 1) {
                var letter = fmt_array[i];
        
                if (alphabet.indexOf(letter) >= 0) {
                    translatedLetter = characterList[letter] // Need the list where the converted characters are.
                }
                else {
                    translatedLetter = letter
                }
                convertedFontMessage += translatedLetter;
            }
            console.log(`Before: ${fmt_array} After: ${convertedFontMessage}`);
            return convertedFontMessage;
        
        }
    }
};