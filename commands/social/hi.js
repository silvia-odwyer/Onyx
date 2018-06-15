const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

var name = "hi"
module.exports = class HiCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'hi',
            aliases: [],
            group: 'fun',
            memberName: 'hi',
            description: "Onyx loves saying hi to people.",
            details: oneLine`
            Onyx loves saying hi to people.
			`,
            examples: ["hi"]
        });
    }

    async run(msg, args) {
        var greetings = ["Hi there! :D ", "Oh, wow, lovely to see you! ", ":wave: Hey there! ", "o/ Hey there! "]
        var randomNumber = getRandomNumber(0, greetings.length - 1)
        msg.channel.send(greetings[randomNumber] + msg.author);
        msg.react("😄");
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
};  