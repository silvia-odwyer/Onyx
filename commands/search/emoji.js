const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');
var emoji = require("emojilib/emojis.json") // A JSON file containing emoji and their English meanings.

var name = "emoji"
module.exports = class GIFCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'emoji',
            aliases: [],
            group: 'search',
            memberName: 'emoji',
            description: "Search for emojis related to a certain search term. Get happy emojis, cute emojis, hearts, etc.",
            details: "Search for emojis related to a certain search term. Get happy emojis, cute emojis, hearts, etc.",
            examples: ["emoji nature", "emoji hearts"]
        });
    }

    async run(msg, args) {
        var text = args;
        if (args.length < 1) {
            msg.reply("Make sure to add some search terms so I know what emojis to get you :eyes:\nEg: -emoji nature");
        }

        else {

            var search_terms = text.split(" ");
            console.log(search_terms)
            for (var j = 0; j < search_terms.length; j += 1) {
                var reply = "";
                var search_term = search_terms[j]
                var char_matched_emojis = getEmoji(search_term, emoji)
    
                if (char_matched_emojis.length > 0) {
                    msg.reply(`${search_term} emoji: ${char_matched_emojis.join(" ")}`)
                }
                else {
                    reply = `No emoji found for ${search_term}`
                }
            }
    
        }

        function getEmoji(search_term, emoji) {
            var keys = Object.keys(emoji);

            var matched_emojis = [];
            var char_matched_emojis = [];
            for (var k = 0; k < keys.length; k += 1) {
                var keywords = emoji[keys[k]]["keywords"];
                if (keys[k] === search_term) {
                    matched_emojis.push(keys[k])
                    char_matched_emojis.push(emoji[keys[k]]["char"])
                }
                else {
                    for (var j = 0; j < keywords.length; j += 1) {

                        if (keywords[j] === search_term) {
                            matched_emojis.push(keys[k])
                            char_matched_emojis.push(emoji[keys[k]]["char"])
                        }
                    }
                }
            }
            return char_matched_emojis;
        }

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
