const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');
const unsplash_client_id = process.env.UNSPLASH_API_KEY;
const Discord = require('discord.js');

var name = "photo"
module.exports = class PhotoCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'photo',
            aliases: [],
            group: 'search',
            memberName: 'photo',
            description: "Get public domain, stunning images from Unsplash.",
            details: oneLine`
            Get public domain, stunning images from Unsplash.			`,
            examples: ["photo"]
        });
    }

    async run(msg, args) {
        var text = args;
        if (args.length < 1) {
            msg.reply("Add some search terms to your command, so I know what photos to get you ^^\nEg: -photo night sky");
        }

        else {  
            // Necessary for choosing random colours for rich embeds
            var colour_array = ["12119", "344700", "13089", "167118", "108816", "16098", "61509"]
            var randomNumber = getRandomNumber(0, colour_array.length - 1);
            var randomColour = colour_array[randomNumber];

            var search_query = text;

            var photo_link = `https://api.unsplash.com/search/photos/?client_id=${unsplash_client_id}&query=${search_query}`
            fetch(photo_link)
                .then(res => res.json())
                .then((out) => {
                    if (out.total == 0) {
                        msg.reply(`I couldn't find any Unsplash images related to ${search_query}`)
                    }
                    else {
                        var randomImageIndex;
                        if (out.total < 10) {
                            randomImageIndex = getRandomNumber(0, out.total - 1)
                        }
                        else {
                            randomImageIndex = getRandomNumber(0, 9)
                        }
                        var first_img_link = out.results[0].urls.raw
                        var first_img_user = out.results[0].user.username
                        var random_img_link = out.results[randomImageIndex].urls.raw;

                        console.log("random img link, ", out.results[randomImageIndex]);
                        var random_img_user = out.results[randomImageIndex].user.username

                        const photoEmbed = new Discord.MessageEmbed()
                        .setColor(randomColour)
                        .setTitle(`Images From Unsplash Related To ${search_query}`)
                        .setURL('https://silvia-odwyer.github.io/Onyx-Discord-Bot-Website/')
                        .setAuthor('Onyx', this.client.user.avatarURL, 'https://silvia-odwyer.github.io/Onyx-Discord-Bot-Website')
                        .setDescription(`[${random_img_user}](https://unsplash.com/@${random_img_user}) on [Unsplash](https://unsplash.com)`)
                        .setImage(random_img_link)
                        .setThumbnail(this.client.user.avatarURL)
                        .addFields(
                            { name: 'Original Image', value: `[Original image found here](${out.results[randomImageIndex].links.html})`},
                           )
                        msg.channel.send({
                            embed: photoEmbed
                        });
                        
                    }

                })
                .catch(err => { throw err });

        }

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
