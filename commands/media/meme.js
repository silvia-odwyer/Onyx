const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');
const request = require("request");

var imgflip_pass_obj = require("imgflip_pass.json");
var imgflip_pass = imgflip_pass_obj["pass"];
var meme_dict = { "Idon'talways": "61532", "waitingskeleton": "4087833", "onedoesnotsimply": "61579", "braceyourselves": "61546", "party": "5496396", "fwp": "61539", "oprah": "28251713", "office": "563423", "wonka": "61582", "bf": "112126428", "yodawg": "101716", "spongebob": "102156234", "rollsafe": "89370399", "wtf": "245898", "toodamnhigh": "61580", "spongebob": "61581", "car": "124822590", "skeptical": "61520", "allthethings": "61533", "whatif": "100947", "grandma": "61556", "thenisaid": "922147" }

var name = "meme"
module.exports = class MemeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'meme',
            aliases: [],
            group: 'media',
            memberName: 'meme',
            description: "Make a meme, using a variety of templates, in the following way: \n -meme [template] Top text - Bottom text. \n Replace [template] with a template from -meme_templates. \n Separate the meme's top and bottom text using a hyphen. \n To see templates, type `-meme_templates`",
            details: "Make a meme, using a variety of templates, in the following way: \n -meme [template] Top text - Bottom text. \n Replace [template] with a template from -meme_templates. \n Separate the meme's top and bottom text using a hyphen. \n To see templates, type `-meme_templates`",
            examples: ["meme waitingskeleton This is top text-This is bottom text"]
        });
    }

    async run(msg, args) {
        var text = args;
        if (args.split(" ").length < 3) {
            msg.reply("To make a meme, the first word is the command, then the template you want (see templates by typing `meme_templates`), then the top text and bottom text separated by a hyphen, eg: -meme waitingskeleton This is top text-This is bottom text")
        }

        else {
                
            // Necessary for choosing random colours for rich embeds
            var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
            var randomNumber = getRandomNumber(0, colour_array.length - 1);
            var randomColour = colour_array[randomNumber];
            try {
                var msg_array = text.split(" ");
                var msg_content = msg.message.content;

                // var first_words_length = msg_array[0].length + msg_array[1].length + 2;
                // console.log(first_words_length)
                // var text = msg_content.slice(first_words_length, msg_content.length);
                // console.log(text)

                var template = msg_array[0]

                var meme_text = text.slice(template.length + 1, text.length).split("-");
                console.log(meme_text)

                var top_text = meme_text[0]
                var bottom_text = meme_text[1]

                var meme_type_id = meme_dict[template];

                var formData = {
                    // Pass a simple key-value pair
                    template_id: meme_type_id,
                    username: 'silvod9',
                    password: imgflip_pass,
                    text0: top_text,
                    text1: bottom_text
                };
                request.post({ url: 'https://api.imgflip.com/caption_image', formData: formData }, function optionalCallback(err, httpResponse, body) {
                    if (err) {
                        return console.error('upload failed:', err);
                    }
                    console.log('M3me request successful!  Server responded with:', body);
                    var json_m3me_obj = JSON.parse(body);
                    var m3me_url = json_m3me_obj.data.url;
                    console.log(m3me_url)
                    msg.channel.send(`Meme created by ${msg.author} \n ${m3me_url}`)
                });
        }
        catch (error) {
            msg.reply("Make sure your command is like so: `-meme waitingskeleton This is top text-This is bottom text`\nIf your command wasn't the issue, then maybe something internally must've gone wrong. \n Silvia (my creator) is getting to work on it!")
        }

        }
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
