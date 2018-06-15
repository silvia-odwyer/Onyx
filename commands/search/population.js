const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require("node-fetch");
var name = "population"
module.exports = class SynonymsCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'population',
            aliases: [],
            group: 'search',
            memberName: 'population',
            description: "Get the total number of humans on Earth right now.",
            details: oneLine`
            Get the total number of humans on Earth right now.
			`,
            examples: ["population"]
        });
    }

    async run(msg, args) {
        // Necessary for choosing random colours for rich embeds
        var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
        var randomNumber = getRandomNumber(0, colour_array.length - 1);
        var randomColour = colour_array[randomNumber];

        msg.reply("Getting you your population stats . . .")
        let url = 'http://api.population.io/1.0/population/World/today-and-tomorrow/?format=json';

        fetch(url)
            .then(res => res.json())
            .then((out) => {
                var total_population = out.total_population[1].population;
                msg.channel.send({
                    embed: {
                        color: randomColour,
                        title: "World Population Stats :earth_africa:",
                        description: `There are ${total_population} humans living on Earth right now.`
                    }
                });
            })
            .catch(err => { throw err })
            .catch(err => { msg.channel.send("I couldn't seem to get the population for you :/") });

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

};