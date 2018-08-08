const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const request = require('request'); 

var name = "acronym"
module.exports = class CaptchaCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'acronym',
            aliases: [],
            group: 'search',
            memberName: 'acronym',
            description: "Get the meaning of an acronym or abbreviation.",
            details: oneLine`
            Get the meaning of an acronym or abbreviation.
			`,
            examples: ["acronym"]
        });
    }

    async run(msg, args) {
        var text = args;
        if (args.length < 1) {
            msg.reply("Please add an acronym to your command, so I know what acronym to get the meaning of. ^^\nEg: -acronym rofl");
        }

        else {

            // Necessary for choosing random colours for rich embeds
            var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
            var randomNumber = getRandomNumber(0, colour_array.length - 1);
            var randomColour = colour_array[randomNumber];

                var acronym = text;
            
                msg.reply("Pinging Acronym Database for the meaning(s) of `" + `${acronym}` + "`")
                var acronym_uri = `http://acronyms.silmaril.ie/cgi-bin/xaa?${acronym}`;
                var acronym_meanings = [];

                request(acronym_uri, { json: true }, (err, res, body) => {
                    if (err) { return console.log(err); }
                    //console.log(body);
                    var split_body = body.split("\n");
                    //console.log(split_body)
                    var num_acronyms = split_body[4];
                    if (num_acronyms.includes("0")) {
                        msg.reply("No acronyms exist with this abbreviation.")
                    }
                    else {
                        var header = "```ml" + "\n" +
                            "Acronym Meanings for " + acronym + "👀 \n" +
                            "```"
                        for (var i = 6; i < split_body.length - 1; i += 4) {
                            var line = split_body[i]
                            line = line.trim()

                            var split_acr_array = line.split(" ");

                            var first_item = split_acr_array[0]

                            if (split_acr_array.length === 1) {
                                first_item = first_item.slice(7, first_item.length - 8)
                                split_acr_array[0] = first_item
                            }
                            else {
                                var strpd_item = first_item.slice(7, first_item.length + 5);
                                split_acr_array[0] = strpd_item;

                                var last_item = split_acr_array[split_acr_array.length - 1];
                                var strpd_last_item = last_item.slice(0, split_acr_array.length - 11);
                                split_acr_array[split_acr_array.length - 1] = strpd_last_item;
                            }

                            var final_acronym = split_acr_array.toString()
                            final_acronym = final_acronym.split(",").join(" ")
                            acronym_meanings.push(final_acronym)


                        }

                        msg.channel.send({
                            embed: {
                                color: randomColour,
                                title: `Acronym Meaning(s) for ${acronym}`,
                                description: acronym_meanings.join("\n")
                            }
                        });
                    }
                });
        }

            function getRandomNumber(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

        }
    };