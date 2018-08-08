const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

var name = "qr"
module.exports = class QRCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'qr',
            aliases: [],
            group: 'search',
            memberName: 'qr',
            description: "Generate a QR code to share links/text easily. Any text after the qr command will be encoded in the QR code. \n For multi-coloured QR codes, use the qr+ command instead.",
            details: oneLine`
            Generate a QR code to share links/text easily. Any text after the qr command will be encoded in the QR code. \n For multi-coloured QR codes, use the qr+ command instead.
			`,
            examples: ["qr Hey there!"]
        });
    }

    async run(msg, args) {

        var text = args;
        if (args.length < 2 ) { 
            msg.reply("You must add text to your command, so I can convert it to a QR code.\nEg: `-qr This message is now encoded as a QR code` ")
        }

        else {
            // Necessary for choosing random colours for rich embeds
            var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
            var randomNumber = getRandomNumber(0, colour_array.length - 1);
            var randomColour = colour_array[randomNumber];

            var user_text = text.split(" ").join("%20")

            var qr_generator = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${user_text}`;
            msg.reply(qr_generator);

        }
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }

};   