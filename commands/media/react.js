const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');

var giphy_creds_obj = require("giphy_creds.json");
var giphy_api_key = giphy_creds_obj["api_key"];
var name = "react"
var reactions = ["wow", "love", "haha", "lol", "rofl", "lmao"]
module.exports = class ReactCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'react',
            aliases: [],
            group: 'media',
            memberName: 'react',
            description: "Get classic GIF reaction stickers. If you want to react to someone's statement with a classic react sticker, then add one of the following emotions: wow, love, haha, lol, rofl, lmao",
            details: "Get classic GIF reaction stickers. If you want to react to someone's statement with a classic react sticker, then add one of the following emotions: ",
            examples: ["react wow\nreact love\nreact angry"],
            args: [
                {
                    key: 'text',
                    prompt: 'Make sure to add a reaction after your command from the list: ' + reactions.join(", "),
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, { text }) {
        var limit = 5;
        var search_term = text;
        var giphy_endpoint = `https://api.giphy.com/v1/stickers/packs/reactions/stickers/?api_key=${giphy_api_key}`

        fetch(giphy_endpoint)
            .then(res => res.json())
            .then((out) => {
                console.log(out)
                var randomNumber = getRandomNumber(0, limit - 1)


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
