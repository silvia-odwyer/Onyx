const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');
const wolfram_alpha_id = process.env.WOLFRAM_ALPHA_APP_ID;

var name = "captcha"
module.exports = class CaptchaCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'captcha',
            aliases: [],
            group: 'search',
            memberName: 'captcha',
            description: "Transform a piece of plaintext into a captcha. :eyes:",
            details: oneLine`
            Transform a piece of plaintext into a captcha. :eyes:
			`,
            examples: ["captcha"]
        });
    }

    async run(msg, args) {
        // Necessary for choosing random colours for rich embeds
        if (args.length < 2) {
            msg.reply("You need to add some text to your command, so I can convert it into a captcha. :eyes:\nEg: `-captcha hi there`");
        } 
        else {

            console.log(args);
            var text = args;
            console.log(text);
            var colour_array = ["12119", "34403", "13082", "16758", "10863", "16098", "6162"]
            var randomNumber = getRandomNumber(0, colour_array.length - 1);
            var randomColour = colour_array[randomNumber];
            text = "captcha " + text;
    
            var captcha_encoded = text.split(" ").join("%20");
            console.log(captcha_encoded)
            var ask_link = `http://api.wolframalpha.com/v2/query?appid=${wolfram_alpha_id}&input=${captcha_encoded}&output=json`
            fetch(ask_link)
                .then(res => res.json())
                .then((out) => {
                    var img_link = out.queryresult.pods[1].subpods[0].img.src;
    
                    msg.channel.send({
                        embed: {
                            image: {
                                url: img_link
                            },
                            color: randomColour,
                            title: `Captcha`,
                            description: "Text -> Captcha"
                        }
                    });
    
                })
                .catch(err => { throw err });
        }

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
