const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');
var giphy_api_key = process.env.GIPHY_API_KEY;

var name = "wave"
module.exports = class WaveCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'wave',
            aliases: [],
            group: 'social',
            memberName: 'wave',
            description: "Wave at another user! :wave:",
            details: "Wave at another user! :wave:",
            examples: ["wave @Silvia923#9909"],

            args: [
                {
                    key: 'text',
                    prompt: "Tee hee, you never told me who you wanted to wave at ^.^ Did you actually want to wave at me instead? :wave: Guess I'll wave to you toooo \n Try mentioning someone along with your command :eyes:",
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, { text }) {
        var sender = msg.author;
        var receiver = text.split(" ")[0];

        msg.channel.send(`${sender} just waved at ${receiver} :wave:`);

        let limit = 5;
        let search_terms = ["wave", "hello", "hi", "greeting"];
        let randomNumber = getRandomNumber(0, search_terms.length - 1);
        let search_term = search_terms[randomNumber];

        var giphy_endpoint = `https://api.giphy.com/v1/gifs/translate?rating=g&api_key=${giphy_api_key}&limit=${limit}&s=${search_term}`

        fetch(giphy_endpoint)
        .then(res => res.json())
        .then((out) => {
            console.log(out)
            var giphy_link = out.data.bitly_gif_url
            console.log(giphy_link)
            msg.channel.send(giphy_link)

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
