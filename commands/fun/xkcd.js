const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');

var name = "xkcd"

module.exports = class XKCDCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'xkcd',
            aliases: [],
            group: 'fun',
            memberName: 'xkcd',
            description: "Get a randomized XKCD comic or today's comic by appending `today` onto your command.",
            details: "Get a randomized XKCD comic or today's comic by appending `today` onto your command.",
            examples: ["xkcd\nxkcd today"]
        });
    }

    async run(msg, args) {
        var msg_array = args.split(" ");
        console.log(args);
        var xkcd_link;
        var number;
            try {

                if (args.length === 0) {
                    number = getRandomNumber(0, 2000);
                    xkcd_link = `https://xkcd.com/${number}/info.0.json`;
                }
                else if (args === "today"){
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
        catch (error) {
            msg.reply("There was an error; if your command wasn't the issue, then maybe something internally must've gone wrong. \n Silvia (my creator) is getting to work on it!")

        }
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
