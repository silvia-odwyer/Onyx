const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const sqlite = require('sqlite');
sqlite.open("./database.sqlite3");

var name = "help"
module.exports = class HelpCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'help',
            aliases: [],
            group: 'meta',
            memberName: 'help',
            description: "Get a comprehensive list of Onyx's commands.",
            details: oneLine`
            Get a comprehensive list of Onyx's commands.
            `
        });
    }

    async run(msg, args) {
        // Necessary for choosing random colours for rich embeds
        // Might implement rich embeds in the future.
        var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
        var randomNumber = getRandomNumber(0, colour_array.length - 1);
        var randomColour = colour_array[randomNumber];

        // Command Categories
        var search_cmds = " `acronym` `yt` `ask` `photo` `population` `pixabay` `synonyms` `define` `old-define` `bitcoin`  `emoji` `name` "
        var media_cmds = "`gif` `meme` `meme_templates` `qr+` `rsticker` `sticker` `trending-gif` `word2gif` `word2sticker`"
        var space_cmds = "`neo` `earth` `iss` `astronauts` "
        var fun_cmds = " `cats` `ascii-faces` `captcha` `xkcd` `qr`  `identify`  `rhyme`"
        var fmt_cmds = "`reverse` `pyramid` `random-case` `replace-b` `letter-em` `1337` `emojify` `adv1337` `binary`"
        var social_cmds = " `avatar` `wave` `poke`"
        var meta_cmds = "`info` `creator` `idea` `server` `invite`"


		// Check Prefix
		var guild_id = msg.message.channel.guild.id
		console.log(guild_id)
		var row = await sqlite.get(`SELECT * FROM settings WHERE guild ="${guild_id}"`);
		var prefix;

		// If undefined, then no special prefixes corresponding to that server were found.
		if (row === undefined) {
			prefix = client.commandPrefix;
		}
		else {
			var settings = row.settings;
			var jsonSettings = JSON.parse(settings);
			prefix = jsonSettings.prefix;
		}
        msg.channel.send({
            embed: {
                color: randomColour,
                // author: {
                //     name: "../../media/onyx.jpg",
                //     icon_url: "../../media/onyx.jpg"
                // },
                title: `Onyx Commands`,
                description: `Just prepend the prefix ${prefix} before any of the following commands:`,
                fields: [{
                    name: "Search Commands :information_source:",
                    value: search_cmds
                },
                {
                name: "Media Commands :film_frames:",
                value: media_cmds
            },
                {
                    name: "Social Commands :wave: :grinning: ",
                    value: social_cmds
                },
                {
                    name: "Fun Commands ✨",
                    value: fun_cmds
                },
                {
                    name: "Space Commands 🌌🌃",
                    value: space_cmds
                },
                {
                    name: "Message Formatting Commands :incoming_envelope: :speech_balloon:",
                    value: fmt_cmds
                },
                {
                    name: "Meta Commands",
                    value: meta_cmds
                },
                {
                    name: "Get More Info. On A Command",
                    value: `To get more info. on a command, type ${prefix}help` + " `command`" + "\n eg: `" + prefix + "``help word2sticker`"
                }
                ],
                footer: {
                    text: "Coded by Silvia923#9909 <3"
                }
            }

        })

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
}