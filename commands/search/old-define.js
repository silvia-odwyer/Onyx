const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

var name = "old-define"
module.exports = class OldDefineCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'old-define',
            aliases: [],
            group: 'search',
            memberName: 'old-define',
            description: "Get an old-style definition of a word like it's ~~1857~~ 1657.",
            details: oneLine`
            Get an old-style definition of a word like it's ~~1857~~ 1657.
			`,
            examples: ["old-define universe"]
        });
    }

    async run(msg, args) {
        var ancient_dictionary = require("../../assets/dictionary.json"); // This is a JSON dictionary of words, with ancient definitions from the 19th and 20th Century.

        var text = args;
        if (args.length < 1) {
            msg.reply("Add a word to your command, so I know what word to get an old-style definition of.\nEg: -old-define universe");
        }

        else {
            var colour_array = ["11996", "47003", "189792", "16858", "1063", "16851", "6152"]
            var randomNumber = getRandomNumber(0, colour_array.length - 1);
            var randomColour = colour_array[randomNumber];
    
            var word = text;
            word = word.toUpperCase();
            var lowercase_word = word.toLowerCase();
            var definition = ancient_dictionary[word];
            if (definition != undefined) {
                msg.reply("Found a definition")
    
                msg.channel.send({
                    embed: {
                        color: randomColour,
                        title: "Ancient Definition for`" + `${lowercase_word}` + "`",
                        description: definition,
                    }
                });
            }
            else {
                msg.channel.send("Couldn't find a definition :( Try another word, maybe? :D")
            }
        }
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

};  