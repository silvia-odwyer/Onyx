const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');
const wolfram_alpha_obj = require("wolfram_alpha.json");
const wolfram_alpha_id = wolfram_alpha_obj["app_id"];
var name = "name"
module.exports = class AskCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'name',
            aliases: [],
            group: 'search',
            memberName: 'name',
            description: "Get stats on your first name",
            details: oneLine`
            Get stats on your first name
			`,
            examples: ["name silvia"]
        });
    }

    async run(msg, args) {
        var text = args;
        if (args.length < 1) {
            msg.reply("Add a name to your command, so that I know what name to get stats of :eyes:\nEg: -name silvia")
        }

        else {

        // Necessary for choosing random colours for rich embeds
        var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
        var randomNumber = getRandomNumber(0, colour_array.length - 1);
        var randomColour = colour_array[randomNumber];
        var msg_array = text.split(" ")
        var name = msg_array[0];
        
        if (msg_array.length > 2) {
            msg.reply("I can only check one name at a time. ")
        }
        else {
            var name_query = msg.content.slice(1, msg.content.length);
            var name_query_encoded = name_query.split(" ").join("%20");
            console.log(name_query_encoded);

            var ask_link = `http://api.wolframalpha.com/v2/query?appid=${wolfram_alpha_id}&input=${name_query}&output=json`

            fetch(ask_link)
                .then(res => res.json())
                .then((out) => {
                    var num_pods = out.queryresult.numpods;
                    if (num_pods === 0) {
                        msg.reply("Sorry, Wolfram|Alpha doesn't have data on your name :(")
                    }
                    else {

                        var interpretation = out.queryresult.pods[0].subpods[0].plaintext;

                        var basic_details = out.queryresult.pods[1].subpods[0].plaintext;
                        var graph = out.queryresult.pods[0].subpods[0].img.src;

                        var historical_details = out.queryresult.pods[2].subpods[0];

                        var estimates = out.queryresult.pods[3].subpods[0];

                        var age_dist = out.queryresult.pods[4].subpods[0];


                        var alternate_names = out.queryresult.pods[5].subpods[0].plaintext;
                        if (alternate_names === "") {
                            alternate_names = "No alternate names."
                        }
                        // console.log(alternate_names);

                        var notable_ppl = out.queryresult.pods[6].subpods[0].plaintext;
                        // console.log(notable_ppl);

                        msg.channel.send({
                            embed: {
                                color: randomColour,
                                title: `${interpretation}`,
                                description: basic_details,
                                image: {
                                    url: graph
                                },
                                fields: [{
                                    name: "Alternate Names",
                                    value: alternate_names
                                },
                                {
                                    name: `Famous People`,
                                    value: notable_ppl
                                }]
                            }
                        });
                    }
                })
                .catch(err => { throw err });
        }
        }
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};

