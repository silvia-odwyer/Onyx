const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
let cmd_info_obj = require(`commands_info.json`); // Provides information on each command, plus examples of each command's usage.
var name = "replace-b"
const sql = require("sqlite");
sql.open("./database.sqlite3");

module.exports = class ReplaceBCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'replace-b',
            aliases: [],
            group: 'message_formatting',
            memberName: 'replace',
            description: "Replaces all b emoji.",
            details: oneLine`
				${cmd_info_obj[name]}
			`,
            examples: ["[cmd_info_obj[`${name}_examples`]]"]
        });
    }

    async run(msg, args) {
        console.log(msg.message.channel.guild.id)
        var guild_id = msg.message.channel.guild.id
        var guild_id1 = "19191"
        var row = await sql.get(`SELECT * FROM settings WHERE guild ="${guild_id}"`);
        var prefix;

        // If undefined, then no special prefixes corresponding to that server were found.
        if (row === undefined){
            prefix = client.commandPrefix;
        }
        else {
            var settings = row.settings;
            var jsonSettings = JSON.parse(settings);
            prefix = jsonSettings.prefix;
        }
        
        // WITHOUT ASYNC/AWAIT
        // sql.get(`SELECT * FROM settings WHERE guild ="${guild_id}"`).then(row => {
        //     if (!row) {
        //         prefix = client.commandPrefix;
        //     } else {
            
        //     }
        // }).catch(() => {
        //     console.error;
        // });
        console.log("PREFIX:" + prefix);

        var msg_content = msg.message.content.toLowerCase();
        var msg_array = msg_content.split(" ");

        var reply = "";
        if (msg_array.length > 1) {
            var string = msg_content.slice(prefix.length + 11, msg.length);

            var letter;
            var emoji_string = ""
            for (var i = 0; i < string.length; i += 1) {
                letter = string[i];
                if (letter === "b") {
                    var b_emoji = `:b:`;
                    emoji_string += b_emoji;
                }
                else {
                    emoji_string += letter;
                }

            }
            reply = emoji_string
        }

        else {
            reply = "You need to include a message along with the command, eg: `-replaceB`"
        }

        return msg.reply(reply);
    }
};
