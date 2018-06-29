const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

var name = "idea"
module.exports = class IdeaCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'idea',
            aliases: [],
            group: 'meta',
            memberName: 'idea',
            description: "Submit an idea for a new bot feature :eyes: \nTips: Try to be specific, if you can. No NSFW commands can be accepted. \n I'm looking forward to seeing what you come up with. Who knows, your idea just might become reality someday.",
            details: "Submit an idea for a new bot feature :eyes: \nTips: Try to be specific, if you can. No NSFW commands can be accepted. \n I'm looking forward to seeing what you come up with. Who knows, your idea just might become reality someday.",
            examples: ["idea New image filters please! Would love to see some sepia filters :eyes:"]
        });
    }

    async run(msg, { text }) {
        var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
        var randomNumber = getRandomNumber(0, colour_array.length - 1);
        var randomColour = colour_array[randomNumber];

        msg.channel.send(
            {
                embed: {
                    color: randomColour,
                    author: {
                        name: this.client.user.username,
                        icon_url : this.client.user.avatarURL
                    },
                    title: `Thanks So Much!`,
                    description: "Your feature request has been submitted successfully :eyes: \nSilvia will review it very soon, and you never know, it just might become a new feature. \n (Keep in mind that Silvia won't accept NSFW commands, however.)",
                }
            });

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

}; 