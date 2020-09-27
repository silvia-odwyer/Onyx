const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

var imgflip_pass = process.env.IMGFLIP_PASS;
var imgflip_username = process.env.IMGFLIP_USERNAME;

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
        if (args.split(" ").length < 2) {
            msg.reply("To make a meme, the first word is the command, then the template you want (see templates by typing `meme_templates`), then the top text and bottom text separated by a hyphen, eg: -meme waitingskeleton This is top text-This is bottom text")
        }

        else {
            console.log("running meme command ...");
            try {
                var msg_array = text.split(" ");
                console.log("msg array ", msg_array);

                var template = msg_array[0];
                console.log("template: ", template);

                var meme_text = text.slice(template.length + 1, text.length).split("-");
                console.log("meme text", meme_text)

                var top_text = meme_text[0];
                var bottom_text = meme_text[1];

                var meme_type_id = meme_dict[template];

                const params = new URLSearchParams();
                params.append('template_id', meme_type_id);
                params.append("username", imgflip_username)
                params.append("password", imgflip_pass);
                params.append("text0", top_text);
                params.append("text1", bottom_text)
                
                fetch('https://api.imgflip.com/caption_image', { method: 'POST', body: params })
                    .then(res => res.json())
                    .then(json => {
                    console.log('M3me request successful!  Server responded with:', json);
                     var m3me_url = json.data.url;
                     msg.channel.send(`Meme created by ${msg.author} \n ${m3me_url}`)
                    });
        }
        catch (error) {
            msg.reply("Make sure your command is like so: `-meme waitingskeleton This is top text-This is bottom text`\nIf your command wasn't the issue, then maybe something internally must've gone wrong.")
        }

        }
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
