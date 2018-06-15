const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const emoji = require("emojilib/emojis.json") // A JSON file containing emoji and their English meanings.

var name = "emojify"
module.exports = class EmojifyCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'emojify',
            aliases: [],
            group: 'message_formatting',
            memberName: 'emojify',
            description: "Convert your message into an emojipasta. Adds emojis related to words found within the message.",
            details: oneLine`
            Get all the synonyms for a word.
			`,
            examples: ["emojify I love emojis, they're pretty fun to use."],

            args: [
                {
                    key: 'text',
                    prompt: 'What text would you like to convert to emoji?',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, { text }) {

        var word = text;
        var keys = Object.keys(emoji);

        var msg_array = text.split(" ");
        
        var msg_array_length = msg_array.length;

        var emojified_msg = "";
        var char_matched_emojis = [];

        for (var i = 0; i < msg_array.length; i += 1) {
            char_matched_emojis = [];
            var word = msg_array[i];

            char_matched_emojis = getEmoji(word, emoji, msg);

            if (char_matched_emojis.length > 0) {
                // Get random matched emojis
                var randomNumber = getRandomNumber(0, char_matched_emojis.length - 1);
                var randomEmoji = char_matched_emojis[randomNumber]
                emojified_msg += ` ${word} ${randomEmoji}`
            }
            else {
                emojified_msg += ` ${word}`
            }
        }
        msg.channel.send(emojified_msg);

        function getEmoji(search_term, emoji, msg) {
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