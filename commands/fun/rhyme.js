
const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');

const wolfram_alpha_obj = require("wolfram_alpha.json");
const wolfram_alpha_id = wolfram_alpha_obj["app_id"];

var name = "rhyme"
module.exports = class RhymeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'rhyme',
            aliases: [],
            group: 'media',
            memberName: 'rhyme',
            description: "Get words that rhyme with a word of your choice",
            details: "Get words that rhyme with a word of your choice",
            examples: ["rhyme code"]
        });
    }

    async run(msg, args) {
        var text = args;

        if (args.length < 2) {
            msg.reply("Make sure to include any word after your command to see what rhymes with it.\nEg: -rhyme code");
        }

        else {

            var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
            var randomNumber = getRandomNumber(0, colour_array.length - 1);
            var randomColour = colour_array[randomNumber];
            var msg_array = text.split(" ");
    
            if (msg_array.length > 1) {
                msg.reply("It's recommended you add only one word with your command.")
            }
            else {
                var search_term = msg_array[0];
                var ask_link = `http://api.wolframalpha.com/v2/query?appid=${wolfram_alpha_id}&input=rhymes%20with%20${search_term}&output=json`
                console.log(ask_link)
                fetch(ask_link)
                    .then(res => res.json())
                    .then((out) => {
    
                        if (out.queryresult.success === false) {
                            msg.reply("Couldn't find any rhyming words :( ")
                        }
                        else {
    
                            var rhyming_words = out.queryresult.pods[1].subpods[0].plaintext
    
                            msg.channel.send({
                                embed: {
                                    color: randomColour,
                                    title: `Rhymes With`,
                                    description: rhyming_words
                                }
                            });
                        }
                    })
                    .catch(err => { throw err });
        }
    
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
}
};