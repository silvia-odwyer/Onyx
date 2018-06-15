const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch')
let cmd_info_obj = require(`commands_info.json`); // Provides information on each command, plus examples of each command's usage.
var name = "astronauts"
module.exports = class AstronautsCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'astronauts',
            aliases: [],
            group: 'space',
            memberName: 'astronauts',
            description: "Find out how many astronauts are aboard the International Space Station.",
            details: oneLine`
            Find out how many astronauts are aboard the International Space Station.
			`,
            examples: ["astronauts"],

        });
    }

    async run(msg, args) {

        var reply;
        var astro_link = "http://api.open-notify.org/astros.json";

        // Necessary for choosing random colours for rich embeds
        var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
        var randomNumber = getRandomNumber(0, colour_array.length - 1);
        var randomColour = colour_array[randomNumber];


        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        fetch(astro_link)
            .then(res => res.json())
            .then((out) => {
                var astro_list = out;
                var number_astronauts = astro_list["number"];

                var astro_output = `There are ${number_astronauts} astronauts aboard the International Space Station right now.`

                msg.channel.send( {
                    embed: {
                        color: randomColour,
                        title: "Number of Astronauts In Space Right Now",
                        description: astro_output
                    }
                });
            })
            .catch(err => { throw err });

    }
};
