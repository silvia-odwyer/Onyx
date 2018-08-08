const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');
const request = require("request");

module.exports = class PyramidCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'gitrepos',
            aliases: [],
            group: 'search',
            memberName: 'gitrepos',
            description: "See how many repos a user has on GitHub.",
            details: "See how many repos a user has on GitHub.",
            examples: ["gitrepos silvia-odwyer"]
        });
    }

    async run(msg, args) {
        var msg_array = args.split(" ");

        if (msg_array.length > 0) {
            let username = msg_array[0];
            let link = `https://api.github.com/users/${username}/repos`;

            fetch(link)
            .then(res => res.json())
            .then((out) => {
                console.log(out);
                console.log(out.length);
                let total_repos = out.length;
                msg.reply(`${username} has ${total_repos} public repositories on GitHub.`)
            })
            .catch(err => { throw err });
            // msg.channel.send(pyramid2);
        }

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
