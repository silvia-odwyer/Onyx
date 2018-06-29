const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');
const request = require("request");
const formData = require('form-data'); // Needed for sending POST requests to servers.
var giphy_creds_obj = require("giphy_creds.json");
var giphy_api_key = giphy_creds_obj["api_key"];
var name = "sticker"
module.exports = class StickerCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'sticker',
            aliases: [],
            group: 'media',
            memberName: 'sticker',
            description: "Search GIPHY for stickers.",
            details: "Search GIPHY for stickers.",
            examples: ["sticker retro vibes"],

            args: [
                {
                    key: 'text',
                    prompt: 'What stickers would you like me to get you? Your next message will be included as search terms so I know what stickers to get you :eyes:',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, { text }) {
        var search_term = text.split(" ").join("%20");
        var limit = 3
        var giphy_endpoint = `https://api.giphy.com/v1/stickers/search?q=${search_term}&limit=${limit}&api_key=${giphy_api_key}`

        fetch(giphy_endpoint)
            .then(res => res.json())
            .then((out) => {

                if (out.data.length === 0) {
                    msg.reply("Couldn't find any matching stickers :(")
                }
                else {
                    console.log(out)
                    var randomNumber = getRandomNumber(0, limit - 1);
                    var giphy_link = out.data[randomNumber].bitly_gif_url
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
