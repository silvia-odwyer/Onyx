const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');
const request = require("request");

var name = "pyramid"
module.exports = class PyramidCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'pyramid',
            aliases: [],
            group: 'message_formatting',
            memberName: 'pyramid',
            description: "Convert a sentence into a word pyramid.",
            details: "Convert a sentence into a word pyramid.",
            examples: ["pyramid This sentence is now a word pyramid"],

            args: [
                {
                    key: 'text',
                    prompt: 'Make sure to include text after the pyramid command.`',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, { text }) {
        var msg_char_length = text.split("");
        var msg_array = text.split(" ");

        if (msg_char_length > 15) {
            var word_pyramid = "";
            var pyramid2 = " ";
            for (var i = 0; i < msg_array.length; i += 1) {
                var word = msg_array[i];
                word_pyramid += ` ${word}`;

                pyramid2 += `\n${word_pyramid}`;
            }

            if (msg_array.length < 4 && msg_array.length > 2) {
                pyramid2 += "\nTry adding more words to your pyramid to make it more impressive :eyes:"
            }
            msg.channel.send(pyramid2);
        }

        else if (msg_char_length < 15) {
            msg.reply("Try including more text with your command, eg: `pyramid Hello there`")

        }

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
