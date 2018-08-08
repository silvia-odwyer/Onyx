const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');
const request = require("request");

var name = "qr+"
module.exports = class MemeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'qr+',
            aliases: [],
            group: 'media',
            memberName: 'qr+',
            description: "Generate a multi-coloured QR code, using two hex values: -qr+ [hex code] [hex code] Text \n Sample Hex Codes: 572, 828, 0ff, 6a6, 909, fff, 000",
            details: "Generate a multi-coloured QR code, using two hex values: -qr+ [hex code] [hex code] Text \n Sample Hex Codes: 572, 828, 0ff, 6a6, 909, fff, 000",
            examples: ["qr+ 000 fff Hey there!"]
        });
    }

    async run(msg, args) {
        var text = args;
        console.log(args);
        if (args.split(" ").length < 4) {

            msg.reply("Make sure to include two hex codes and then text or a link, eg: `qr+ 000 fff Hey there!`");
        }
        else {
            // Necessary for choosing random colours for rich embeds
            var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
            var randomNumber = getRandomNumber(0, colour_array.length - 1);
            var randomColour = colour_array[randomNumber];
            try {
                var user_text = text;
                
                var user_text_array = user_text.split(" ")

                var fg_color = user_text_array[0]

                var bg_color = user_text_array[1]

                var amt_slice = fg_color.length + bg_color.length + 2
                user_text = user_text.slice(amt_slice, text.length);

                user_text = user_text.split(" ").join("%20");
                console.log(user_text)

                var qr_generator = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=${fg_color}&bgcolor=${bg_color}&data=${user_text}`;
                msg.reply(qr_generator)

        }
        catch (error) {
            msg.reply("Make sure to include two hex codes and then text or a link, eg: `qr+ 000 fff Hey there!`\nIf your command wasn't the issue, then maybe something internally must've gone wrong. \n Silvia (my creator) is getting to work on it!")
        }
        }
    
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
