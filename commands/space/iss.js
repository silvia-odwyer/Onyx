const commando = require('discord.js-commando');

const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch')

let cmd_info_obj = require(`commands_info.json`); // Provides information on each command, plus examples of each command's usage.

module.exports = class IntlSpaceStationCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'iss',
			aliases: [],
			group: 'space',
			memberName: 'iss',
			description: "Get the location of the International Space Station. \n Updates every second.",
			details: oneLine`
            Get the location of the International Space Station. \n Updates every second.
			`,
			examples: ["iss"],
		});
	}

	async run(msg, args) {
        var iss_link = "http://api.open-notify.org/iss-now.json"
        fetch(iss_link)
            .then(res => res.json())
            .then((out) => {
                var iss_info = out;
                var position = iss_info["iss_position"];
                var latitude = position["latitude"];
                var longitude = position["longitude"];

                var iss_output = `Latitude: ${latitude}\nLongitude: ${longitude}`

                var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
                var randomNumber = getRandomNumber(0, colour_array.length - 1);
                var randomColour = colour_array[randomNumber];
            
                msg.channel.send({
                    embed: {
                        color: randomColour,
                        title: "Location of the International Space Station 🌌🌠🌃",
                        description: iss_output
                    }
                });
            })
            .catch(err => { throw err });

            function getRandomNumber(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}
	}

	
};