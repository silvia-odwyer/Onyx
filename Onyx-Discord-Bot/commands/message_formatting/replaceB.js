const commando = require('../../../src');
const oneLine = require('common-tags').oneLine;
let cmd_info_obj = require(`commands_info.json`); // Provides information on each command, plus examples of each command's usage.
var examples_appendor = "_examples"
module.exports = class ReplaceBCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'replaceB',
			aliases: ['replaceb', 'replace-b'],
			group: 'message_formatting',
			memberName: 'replaceB',
			description: cmd_info_obj[name],
			details: oneLine`
				${cmd_info_obj[name]}
			`,
			examples: [cmd_info_obj[`${name}_examples`]],

			args: [
				{
					key: 'text',
					label: 'text',
					prompt: cmd_info_obj[name],
					type: 'text',
					infinite: true
				}
			]
		});
	}

	async run(msg, args) {
        var msg_array = msg.split(" ");
        var msg_content = msg.content;
        var reply = "";
        if (msg_array.length > 1) {
            var string = msg_content.slice(10, msg_content.length);

            var letter;
            emoji_string = ""
            for (var i = 0; i < string.length; i += 1) {
                letter = string[i];
                if ((letter === "b") || (letter === "B")) {
                    b_emoji = `:b:`;
                    emoji_string += b_emoji;
                }
                else {
                    emoji_string += letter;
                }

            }
            reply = emoji_string
        }

        else {
            reply = "You need to include a message along with the command, eg: `" + `${bot_prefix}` + "replaceB`"
        }

		return msg.reply(reply);
	}
};
