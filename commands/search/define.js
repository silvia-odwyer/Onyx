const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require("node-fetch");
const wolfram_alpha_obj = require("wolfram_alpha.json");
const wolfram_alpha_id = wolfram_alpha_obj["app_id"];

var name = "define"
module.exports = class DefineCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'define',
            aliases: [],
            group: 'search',
            memberName: 'define',
            description: "Get a definition of a word.",
            details: oneLine`
            Get a definition of a word.
			`,
            examples: ["define technology"],
        });
    }

    async run(msg, args) {
        var text = args;
        if (args.length < 1) {
            msg.reply("Add a word(s) to your command, so I know what word(s) you'd like the definition of.\nEg: `-define technology`")
        }

        else {

            // Necessary for choosing random colours for rich embeds
            var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
            var randomNumber = getRandomNumber(0, colour_array.length - 1);
            var randomColour = colour_array[randomNumber];

            var search_term = text;
            search_term = "define" + search_term;
            var url_encoded_search_term = search_term.split(" ").join("%20")
            var ask_link = `http://api.wolframalpha.com/v2/query?appid=${wolfram_alpha_id}&input=${url_encoded_search_term}&output=json`

            fetch(ask_link)
                .then(res => res.json())
                .then((out) => {
                    var num_pods = out.queryresult.numpods;
                    if (num_pods === 0) {
                        msg.reply("Sorry, Wolfram|Alpha doesn't have a definition for that word. Try again maybe? :D")
                    }
                    else {
                        var interpretation = out.queryresult.pods[0].subpods[0].plaintext;
                        console.log(interpretation)

                        var answer = out.queryresult.pods[1].subpods[0].plaintext;
                        console.log(answer)

                        msg.channel.send({
                            embed: {
                                color: randomColour,
                                title: `${interpretation}`,
                                description: answer
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
};