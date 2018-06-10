const commando = require('discord.js-commando');

const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch')

let cmd_info_obj = require(`commands_info.json`); // Provides information on each command, plus examples of each command's usage.
var name = "earth"
module.exports = class EarthCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'earth',
			aliases: ['earth-photo'],
			group: 'space',
			memberName: 'earth',
			description: "cmd_info_obj[name]",
			details: oneLine`
				${cmd_info_obj[name]}
			`,
			examples: ["[cmd_info_obj[`${name}_examples`]]"],
		});
	}

	async run(msg, args) {
        msg.reply("Pinging the Nasa Database for live earth footage . . .")
        var earth_link = "https://api.nasa.gov/EPIC/api/natural/images?api_key=DEMO_KEY"

        fetch(earth_link)
            .then(res => res.json())
            .then((out) => {
                var earth_output = out;

                var randomNumber = getRandomNumber(0, earth_output.length - 1)
                var image_name = earth_output[randomNumber].image

                var date = earth_output[randomNumber].date;
                var date_split = date.split("-")

                var year = date_split[0];

                var month = date_split[1];

                var day_and_time = date_split[2];
                var sliced_date = day_and_time.slice(0, 2);

                var image_link = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${sliced_date}/png/` + image_name + ".png"
                console.log(image_link)
                msg.channel.send(image_link)
                msg.channel.send(`${earth_output[randomNumber].caption} on ${date}`)
            })
			.catch(err => { throw err });
			
			function getRandomNumber(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}
	}

	
};