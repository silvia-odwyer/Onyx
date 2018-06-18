const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');


var name = "avatar"
var happy_emoji = ["😃", "🤣", "👌", "😍", "👌", "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "😗", "😙", "😚", "🙂", "🤗", "🤩", "🤔", "😮", "🤐", "😯", "😪", "😫", "😴", "😌", "😛", "😜", "😝", "👀"]

module.exports = class AvatarCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'avatar',
            aliases: [],
            group: 'social',
            memberName: 'avatar',
            description: "View your avatar, or someone else's avatar. Just type -avatar for your avatar, or mention someone for their avatar.",
            details: "View your avatar, or someone else's avatar. Just type -avatar for your avatar, or mention someone for their avatar.",
            examples: ["avatar @somebody \n avatar"]
        });
    }

    async run(msg, args) {
        console.log(args.length)
        var msg_array = args.split(" ");
     
        var user = ""

        // User Wants Their Avatar
        if (args.length === 0) {
            user = msg.author.username;
            console.log("User " + user)
            var avatar_compliments = [`:eyes: Nice avatar by the way :)`, `Hey everyone! Check out ${user}s neat profile pic :eyes:`, "Oooh, I like this profile pic of yours... :eyes:", "B) Love this profile pic :eyes:"];
            var randomNumber = getRandomNumber(0, avatar_compliments.length - 1);
            var randomCompliment = avatar_compliments[randomNumber];

            msg.channel.send(randomCompliment + "\n" + msg.author.avatarURL);
            for (var i = 0; i < 10; i += 1) {
                var randomNumber = getRandomNumber(0, happy_emoji.length - 1);
                var randomEmoji = happy_emoji[randomNumber];
                msg.react(randomEmoji)
            }
        }
        // User Wants Someone Else's Avatar
        else if (msg_array.length === 1) {
            // Need to check if the user is actually in the server

                // map returns a list, in which I get the first element, then remove the last four chars of the link, so that the size can be changed.
                var avatar_link = msg.message.mentions.users.map(u => u.avatarURL)[0]
                avatar_link = avatar_link.substring(0, avatar_link.length - 4);
                avatar_link += "1024" // Photo can only be 1024 in size.
                msg.channel.send(avatar_link);
            
            // catch (error) {
            //     msg.channel.send("404: That User Doesn't Exist :(")
            // }
        }
        else {
            msg.reply("I can only send one avatar per command.")
        }

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
