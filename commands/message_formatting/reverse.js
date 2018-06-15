const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;


var name = "reverse"
module.exports = class ReverseCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'reverse',
            aliases: [],
            group: 'message_formatting',
            memberName: 'reverse',
            description: "Reverse your message. If you received a reversed message, you can apply this command to that message to un-reverse it.",
            details: "Reverse your message. If you received a reversed message, you can apply this command to that message to un-reverse it.",
            examples: ["reverse Hello there, this message is now reversed."],

            args: [
                {
                    key: 'text',
                    prompt: 'Make sure to include text after the reverse command.`',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, { text }) {
        var msg_array = text.split(" ");

        var msg_string = text.split("");

        var reverse_string = "";
        var word;
        var split_word;
        for (var i = msg_string.length - 1; i >= 0; i -= 1) {

            reverse_string += msg_string[i];
        }
        msg.channel.send(reverse_string);


        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
