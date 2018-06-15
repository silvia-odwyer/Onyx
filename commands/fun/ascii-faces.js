const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch')
var asciiFaces = require("cool-ascii-faces");

var name = "ascii-faces"
module.exports = class CatsCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'ascii-faces',
            aliases: [],
            group: 'fun',
            memberName: 'ascii-faces',
            description: "Get a ton of super cute copy-and-paste Ascii Faces (◕‿◕)  ʕ´•ᴥ•`ʔ ",
            details: "Get a ton of super cute copy-and-paste Ascii Faces (◕‿◕)  ʕ´•ᴥ•`ʔ",
            examples: ["ascii-faces"]

        });
    }

    async run(msg, args) {
        var randomSet = getRandomNumber(0, asciiFaces.faces.length - 11)
        var faces = asciiFaces.faces.slice(randomSet, randomSet + 10).join("     ")
        msg.reply("Here are some copy-and-paste :clipboard: ascii faces :eyes:\n" + faces)
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        } 
    }
};
