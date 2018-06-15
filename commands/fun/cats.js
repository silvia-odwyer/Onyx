const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch')
var cats = require("cat-ascii-faces");

var name = "cats"
module.exports = class CatsCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'cats',
            aliases: [],
            group: 'fun',
            memberName: 'cats',
            description: "Get a ton of super cute cat ascii faces (*^ω^*) (^人^)",
            details: oneLine`
            Get a ton of super cute cat ascii faces (*^ω^*) (^人^)			`,
            examples: ["cats"],

        });
    }

    async run(msg, args) {
        var randomSet = getRandomNumber(0, cats.cats.length - 11)
        var cat_reply = cats.cats.slice(randomSet, randomSet + 10).join("     ");
        msg.reply("Here are some copy-and-paste cat ascii faces\n")
        msg.channel.send(cat_reply)
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
      
    }
};
