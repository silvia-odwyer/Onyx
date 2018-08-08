const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require('node-fetch');
var emoji = require("emojilib/emojis.json") // A JSON file containing emoji and their English meanings.

var youtube_creds = require("youtube-creds.json");
var youtube_api_key = youtube_creds["api_key"];

var name = "yt"
module.exports = class YTCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'yt',
            aliases: [],
            group: 'search',
            memberName: 'yt',
            description: "Search YouTube for videos. Just add a search query after your command.",
            details: "Search YouTube for videos. Just add a search query after your command.",
            examples: ["yt Swedish House Mafia greyhound"]
        });
    }

    async run(msg, args) {
        var text = args;
        if (args.length < 1 ) {
            msg.reply("Make sure to add some search terms so I know what YouTube video to get you :eyes:\nEg: `-yt Swedish House Mafia greyhound`");
        }

        else {

            var search_query = msg.content.slice(4, msg.content.length);

            const { google } = require('googleapis');
    
            const youtube = google.youtube({
                version: 'v3',
                auth: youtube_api_key
            });
    
            // Function is placed here, because I may require calling this function in the future.
            async function searchYouTube(msg, search_term) {
                const res = await youtube.search.list({
                    part: 'id,snippet',
                    q: search_term,
                    type: 'video'
                });
                // console.log(res.data);
                if (res.data.pageInfo.totalResults === 0) {
                    msg.reply("No results found :( Try another search maybe?")
                }
                else {
                    var video_id = res.data.items[0].id.videoId;
                    var video_url = `https://www.youtube.com/watch?v=${video_id}`
                    console.log(video_url)
                    msg.reply(video_url)
                }
            }
            searchYouTube(msg, search_query);
    
        }
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

    }
};
