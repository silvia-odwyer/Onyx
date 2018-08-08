const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');

var giphy_creds_obj = require("giphy_creds.json");
var giphy_api_key = giphy_creds_obj["api_key"];
var name = "word2gif"
module.exports = class WordToGIFCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'word2gif',
            aliases: [],
            group: 'media',
            memberName: 'word2gif',
            description: "Translate words to GIPHY GIFS! Use the power of GIFS to convey your message.",
            details: "Translate words to GIPHY GIFS! Use the power of GIFS to convey your message.",
            examples: ["word2gif"]
        });
    }

    async run(msg, args) {
        var text = args;

        if (args.length < 2) {
            msg.reply("Add some search terms to your command, so I know what word(s) you'd like to translate into GIPHY GIFs.\nEg: -word2gif hi there");
        }

        else {
            var limit = 5;
            var search_term = text;
            var giphy_endpoint = `https://api.giphy.com/v1/gifs/translate?rating=g&api_key=${giphy_api_key}&limit=${limit}&s=${search_term}`
    
            fetch(giphy_endpoint)
                .then(res => res.json())
                .then((out) => {
                    console.log(out)
                    var randomNumber = getRandomNumber(0, limit - 1)
                    var giphy_link = out.data.bitly_gif_url
                    console.log(giphy_link)
                    msg.reply(giphy_link)
    
                    // Send an embed with a local image inside
                    msg.channel.send({
                        files: [
                            "media/powered_by_giphy.png",
                        ]
                    })
                        .catch(console.error);
    
                })
                .catch(err => { throw err });
        }

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
