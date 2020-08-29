const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch')
const Discord = require('discord.js');

var name = "neo"
module.exports = class NEOCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'neo',
            aliases: [],
            group: 'space',
            memberName: 'neo',
            description: "Find out how many Near-Earth objects are near Earth right now.",
            details: oneLine`
            Find out how many Near-Earth objects are near Earth right now.
			`,
            examples: ["neo"],

        });
    }

    async run(msg, args) {

        var reply;
        var astro_link = "http://api.open-notify.org/astros.json";

        // Necessary for choosing random colours for rich embeds
        var colour_array = ["96", "344", "132", "1671", "1063", "16851", "6962"]
        var randomNumber = getRandomNumber(0, colour_array.length - 1);
        var randomColour = colour_array[randomNumber];
        msg.reply("Pinging the Nasa Database for live near-earth info . . .")
        var nasa_neo_checker = "https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=DEMO_KEY"

        fetch(nasa_neo_checker)
            .then(res => res.json())
            .then((out) => {
                var total_near_earth_objects = out.element_count;
                var neo_message = "There are a total of " + total_near_earth_objects + " near-earth objects circulating around Earth right now."
                // inside a command, event listener, etc.
                const neoEmbed = new Discord.MessageEmbed()
                .setColor(randomColour)
                .setTitle('Near Earth Objects')
                .setDescription(neo_message)
                .setTimestamp()

                msg.channel.send({
                    embed: neoEmbed,
                });

            })
            .catch(err => { throw err });

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
      
    }
};
