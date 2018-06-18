const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');

var giphy_creds_obj = require("giphy_creds.json");
var giphy_api_key = giphy_creds_obj["api_key"];
var name = "gif"
module.exports = class GIFCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'gif',
            aliases: [],
            group: 'media',
            memberName: 'gif',
            description: "Search GIPHY for GIFS!",
            details: "Search GIPHY for GIFS!",
            examples: ["word2gif"],
            args: [
                {
                    key: 'text',
                    prompt: 'Make sure to add some search terms so I know what GIFs to get you :eyes:',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, { text }) {
        var limit = 5;
        var search_term = text;
        var giphy_endpoint = `https://api.giphy.com/v1/gifs/search?rating=g&api_key=${giphy_api_key}&limit=${limit}&s=${search_term}`

        fetch(giphy_endpoint)
            .then(res => res.json())
            .then((out) => {
                if (data.length === 0) {
                    msg.reply("Couldn't find any matching GIFS :(")
                }
                else {
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
                }

            })
            .catch(err => { throw err });

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
