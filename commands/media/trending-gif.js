const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');
const request = require("request");
const formData = require('form-data'); // Needed for sending POST requests to servers.

var giphy_creds_obj = require("giphy_creds.json");
var giphy_api_key = giphy_creds_obj["api_key"];
var name = "trending-gif"
module.exports = class TrendingGIFCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'trending-gif',
            aliases: [],
            group: 'media',
            memberName: 'trending-gif',
            description: "Get a trending GIPHY GIF that's hot online now.",
            details: "Get a trending GIPHY GIF that's hot online now.",
            examples: ["trending-gif"]
        });
    }

    async run(msg, args) {
        var limit = 10;
        msg.channel.send("This GIF is trending on GIPHY right now :eyes:")
        var giphy_endpoint = `https://api.giphy.com/v1/gifs/trending?rating=g&api_key=${giphy_api_key}&limit=${limit}`

        fetch(giphy_endpoint)
            .then(res => res.json())
            .then((out) => {
                console.log(out)
                var randomNumber = getRandomNumber(0, limit - 1)
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

            })
            .catch(err => { throw err });

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
