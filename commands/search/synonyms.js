const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const moby = require("moby")

var name = "synonyms"
module.exports = class SynonymsCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'synonyms',
            aliases: [],
            group: 'search',
            memberName: 'synonyms',
            description: "Get all the synonyms for a word.",
            details: oneLine`
            Get all the synonyms for a word.
			`,
            examples: ["synonyms azure"]
        });
    }

    async run(msg, args) {
        var text = args;
        if (args.length < 1) {
            msg.reply("Add a word to your command, so I know what word to get synonyms of.\nEg: `-synonyms azure`");
        }

        else {
            
        // Necessary for choosing random colours for rich embeds
        var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
        var randomNumber = getRandomNumber(0, colour_array.length - 1);
        var randomColour = colour_array[randomNumber];
        var word = text;
        var synonyms = moby.search(word);

        if (synonyms.length === 0) {
            msg.reply("Couldn't find any synonyms related to " + "`" + word + "` Try another maybe? :D")
        }
        else {
            var synonyms_string = synonyms.join(", ");

            if (synonyms_string.length < 2000) {
                msg.channel.send({
                    embed: {
                        color: randomColour,
                        title: `Synonyms for ${word}`,
                        description: synonyms_string
                    }
                });
            }
            else if (synonyms_string.length > 2000) {
                var middle_index = synonyms.length / 2;
                var floored_middle_index = Math.floor(middle_index);
                var synonyms1 = synonyms.slice(0, floored_middle_index);

                var synonyms2 = synonyms.slice(floored_middle_index + 1, synonyms.length - 1);

                var joined_synonyms = synonyms1.join(", ");

                msg.channel.send({
                    embed: {
                        color: randomColour,
                        title: `Synonyms for ${word}`,
                        description: joined_synonyms,
                        fields: [{
                            name: "Even More Synonyms",
                            value: "I have more synonyms to send, but I don't wanna spam this channel xD"
                        }]
                    }
                });
            }
        }
        }
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
};