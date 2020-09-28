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
        console.log("array", msg_array);
        var user = ""

        // User Wants Their Avatar
        if (args.length === 0) {
            user = msg.author.username;
            console.log("User " + user)
            var avatar_compliments = [`:eyes: Nice avatar by the way :)`, `Hey everyone! Check out ${user}s neat profile pic :eyes:`, "Oooh, I like this profile pic of yours... :eyes:", "B) Love this profile pic :eyes:"];
            var randomNumber = getRandomNumber(0, avatar_compliments.length - 1);
            var randomCompliment = avatar_compliments[randomNumber];

            msg.channel.send(randomCompliment + "\n" + msg.author.displayAvatarURL());
            for (var i = 0; i < 3; i += 1) {
                var randomNumber = getRandomNumber(0, happy_emoji.length - 1);
                var randomEmoji = happy_emoji[randomNumber];
                msg.react(randomEmoji)
            }
        }
        // User Wants Someone Else's Avatar
        else if (msg_array.length === 1) {
            let name = String(msg_array[0]);
            console.log(name);
			if ( name.startsWith('<@') && name.endsWith('>')){
			    // get avatar by @mention
				console.log("mention");
				// map returns a list, in which I get the first element, then remove the last four chars of the link, so that the size can be changed.
                var avatar_link = msg.mentions.users.map(u => u.avatarURL())[1];

				}
				else {
					// get avatar by userid
                    let userid = name;
                
                    if (userid.startsWith('!')) {
                        userid = userid.slice(1);
                    }
                    console.log("user id", userid);

					user = await this.client.fetchUser(userid, true)
						  .catch(error => console.log(error) );                    

                          avatar_link = (user !== null && user !== undefined) ? user.displayAvatarURL : "Invalid user id \"" + userid + "\".";
				}
				msg.channel.send(avatar_link);
        }
        else {
            msg.reply("I can only send one avatar per command.")
        }

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
