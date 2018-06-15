const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');
const request = require("request");

var imgflip_pass_obj = require("imgflip_pass.json");
var imgflip_pass = imgflip_pass_obj["pass"];
var meme_dict = { "Idon'talways": "61532", "waitingskeleton": "4087833", "onedoesnotsimply": "61579", "braceyourselves": "61546", "party": "5496396", "fwp": "61539", "oprah": "28251713", "office": "563423", "wonka": "61582", "bf": "112126428", "yodawg": "101716", "spongebob": "102156234", "rollsafe": "89370399", "wtf": "245898", "toodamnhigh": "61580", "spongebob": "61581", "car": "124822590", "skeptical": "61520", "allthethings": "61533", "whatif": "100947", "grandma": "61556", "thenisaid": "922147" }

var name = "meme_templates"
module.exports = class MemeTemplatesCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'meme_templates',
            aliases: [],
            group: 'media',
            memberName: 'meme_templates',
            description: "Get a list of all meme templates.",
            details: "Get a list of all meme templates.",
            examples: ["meme_templates"]
        });
    }

    async run(msg, args) {
        // Necessary for choosing random colours for rich embeds
        var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
        var randomNumber = getRandomNumber(0, colour_array.length - 1);
        var randomColour = colour_array[randomNumber];

        var meme_templates = Object.keys(meme_dict).join(", ")

        msg.channel.send({
            embed: {
                color: randomColour,
                title: "Meme Templates",
                description: meme_templates
            }
        });
        msg.channel.send("To create a meme, type meme [template] top text-bottom text \n \n eg: `meme office Top text-bottom text`")
  
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
