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
            examples: ["qr+ 000 fff Hey there!"],

            args: [
                {
                    key: 'text',
                    prompt: 'Make sure to include two hex codes and then text or a link, eg: `qr+ 000 fff Hey there!`',
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, { text }) {
       var xkcd_link;
        var number;
        // Only execute the fetch code if the cmd "xkcd" is entered, or if the msg content is equal to "xkcd today"
        // Otherwise, I'd have the fetch code twice.

        try {
            if (msg_array.length === 1 || msg_content === "-xkcd today") {
                // User wants a random comic.
                if (msg_array.length === 1) {
                    number = getRandomNumber(0, 1995);
                    xkcd_link = `https://xkcd.com/${number}/info.0.json`;
                }
                else {
                    xkcd_link = "http://xkcd.com/info.0.json"
                }

                fetch(xkcd_link)
                    .then(res => res.json())
                    .then((out) => {
                        var xkcd_info = out;
                        console.log(xkcd_info)
                        var image = xkcd_info.img;
                        msg.channel.send(image)
                        var name = xkcd_info.title;
                        var number = xkcd_info.num;
                        msg.channel.send(`Comic #${number} entitled ${name} from XKCD.`)
                    })
                    .catch(err => { throw err });
            }
        }
        catch (error) {
            msg.reply("There was an error; if your command wasn't the issue, then maybe something internally must've gone wrong. \n Silvia (my creator) is getting to work on it!")

        }
    
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
