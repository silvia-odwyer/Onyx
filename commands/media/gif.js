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
            examples: ["gif"]
        });
    }

    async run(msg, args) {
        var text = args;
        if (args.length < 2) {
            msg.reply("Add some search terms to your command, so I know what GIFS to get you. :grin:");
        }

        else {
            var limit = 5;
            var search_term = text;
            var giphy_endpoint = `https://api.giphy.com/v1/gifs/search?rating=g&api_key=${giphy_api_key}&limit=${limit}&q=${search_term}`
            console.log(giphy_endpoint)
            fetch(giphy_endpoint)
                .then(res => res.json())
                .then((out) => {
                    console.log(out)
                     if (out.data.length === 0) {
                         msg.reply("Couldn't find any matching GIFS :(")
                    }
                    else {
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
                    }
    
                })
                .catch(err => { throw err });
        }

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
