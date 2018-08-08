const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const sqlite = require('sqlite');
sqlite.open("./database.sqlite3");
const commands_info = require("commands_info.json")

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
        console.log("args" + args);
        var channel_type = msg.message.channel.type;

        var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
        var randomNumber = getRandomNumber(0, colour_array.length - 1);
        var randomColour = colour_array[randomNumber];

        var prefix;
        var prefix_message = "";
        if (channel_type === "dm") {
            prefix = ""
        }
        else if (channel_type === "group") {
            prefix = "@Onyx#4347"
        }
        else {
            // Check Prefix
            var guild_id = msg.channel.guild.id
            console.log(guild_id)
            var row = await sqlite.get(`SELECT * FROM settings WHERE guild ="${guild_id}"`);


            // If undefined, then no special prefixes corresponding to that server were found.
            if (row === undefined) {
                prefix = this.client.commandPrefix;
            }
            else {
                var settings = row.settings;
                var jsonSettings = JSON.parse(settings);
                prefix = jsonSettings.prefix;
            }

            prefix_message = `Just prepend the prefix ${prefix} before any of the following commands:`
        }

        if (args.length === 0) {

            // Command Categories
            var search_cmds = " `acronym` `yt` `ask` `photo` `population` `pixabay` `synonyms` `define` `old-define` `bitcoin`  `emoji` `name` "
            var media_cmds = "`gif` `meme` `meme_templates` `qr+` `rsticker` `sticker` `trending-gif` `word2gif` `word2sticker`"
            var space_cmds = "`neo` `earth` `iss` `astronauts` "
            var fun_cmds = " `cats` `ascii-faces` `captcha` `xkcd` `qr` `rhyme`"
            var fmt_cmds = "`reverse` `pyramid` `random-case` `replace-b` `letter-em` `1337` `emojify` `adv1337` `binary`"
            var social_cmds = " `avatar` `wave` `poke`"
            var meta_cmds = "`info` `creator` `idea` `server` `invite`"

         

            msg.channel.send({
                embed: {
                    color: randomColour,
                    title: `Onyx Commands`,
                    description: prefix_message,
                    author: {
                        name: "Onyx",
                        icon_url: this.client.user.avatarURL
                    },
                    thumbnail: {
                        url: this.client.user.avatarURL
                    },
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
                        value: "To get more info. on a command, type `" + `${prefix}help` + " command`" + "\n\neg: `" + prefix + "help word2sticker`"
                    },
                    {
                        name: "Prepend My Prefix - Before A Command",
                        value : "Prepend - before any of the commands, or mention me before a command.\nEg: -sticker tropical\n@Onyx sticker lol"
                    }
                    ],
                    footer: {
                        text: "Coded by Silvia923#9909 <3"
                    }
                }
            })

        }

        // Else, they want detailed info on a command.
        else {
            console.log(args);

            var cmd_info = commands_info.commands[0][args];

            console.log(cmd_info)
            if (cmd_info === undefined) {
                msg.reply("Command not found. :(")
            }
            else {
                var args_example_lookup = args + "_examples"
                var examples = commands_info.examples[0][args_example_lookup];
                msg.channel.send({
                    embed: {
                        color: randomColour,
                        author: {
                            name: "Onyx",
                            icon_url: this.client.user.avatarURL
                        },
                        title: `Command Info: ${args}`,
                        description: `${cmd_info}`,
                        fields: [{
                            name: "Examples",
                            value: "`" + `${prefix}${examples}` + "`"
                            
                        },
                        {
                            name: "Custom Prefix ",
                            value: `My custom prefix is ${prefix} so prepend this before the command.`
                        }
                        ],
                        footer: {
                            icon_url: this.client.user.avatarURL,
                            text: "Coded by Silvia923#9909 <3"
                        }
                    }
                });
            }
        }

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
}