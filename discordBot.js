// 30+ Commands, Multi-lingual, 24/7, Fun Commands, Meme and Image Generator, Crypto, Economy/Currency, Fun commands
// Multi-lingual support, get acronym and word meanings, receive live footage from NASA,
// Generate QR codes, get XKCD comics, 
// get trending YouTube videos, breaking news, bitcoin prices, 
// make memes, and more! 

const Discord = require('discord.js');
const client = new Discord.Client();

let token_obj = require(`token.json`);
var token = token_obj["token"];
let imgflip_pass_obj = require(`imgflip_pass.json`);
var imgflip_pass = imgflip_pass_obj["pass"];
let translate_creds_obj = require(`translate-creds.json`);
let wolfram_alpha_creds = require(`wolfram_alpha.json`)
var wolfram_alpha_id = wolfram_alpha_creds["app_id"]
var cloudinary_creds = require("cloudinary.json")
var unsplash_creds = require("unsplash_creds.json")
var unsplash_client_id = unsplash_creds["client_id"]
var oxford_creds = require("oxford_creds.json")
var oxford_app_key = oxford_creds["app_key"]
var oxford_app_id = oxford_creds["app_id"]

var youtube_creds = require("youtube-creds.json")
var youtube_api_key = youtube_creds["api_key"]
// TO DO
// DMming function for synonym searching


// RESOURCES
var emoji_list = ["😃", "🤣", "👌", "😍", "👌", "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "😗", "😙", "😚", "🙂", "🤗", "🤩", "🤔", "🤨", "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "😴", "😌", "😛", "😜", "😝", "🤤", "😒", "😓", "😔", "😕", "🙃", "🤑", "😲", "☹️", "🙁", "😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧", "😨", "😩", "🤯", "😬", "😰", "😱", "😳", "🤪", "😵", "😡", "😠", "🤬", "😷", "🤒", "🤕", "😇", "🤠", "🤥", "🤫", "🤭", "🧐", "🤓", "👀"]
var happy_emoji = ["😃", "🤣", "👌", "😍", "👌", "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "😗", "😙", "😚", "🙂", "🤗", "🤩", "🤔", "😮", "🤐", "😯", "😪", "😫", "😴", "😌", "😛", "😜", "😝", "👀"]

var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var emoji = require("emojilib/emojis.json") // A JSON file containing emoji and their English meanings.
var music_cmds = ["futurebass", "riser", "build", "deepbass", "trapdrums", "edmbuild", "trapbass", "edmbeat", "snare", "skybuild"];
var loop_dict = require('loop_dict.json')
let json1 = require(`dictionary.json`); // This is an old-style JSON dictionary, with ancient definitions from the 19th and 20th Century.
let cmd_info_obj = require(`commands_info.json`); // Provides information on each command, plus examples of each command's usage.
var meme_dict = { "Idon'talways": "61532", "waitingskeleton": "4087833", "onedoesnotsimply": "61579", "braceyourselves": "61546", "party": "5496396", "fwp": "61539", "oprah": "28251713", "office": "563423", "wonka": "61582", "bf": "112126428", "yodawg": "101716", "spongebob": "102156234", "rollsafe": "89370399", "wtf": "245898", "toodamnhigh": "61580", "spongebob": "61581", "car": "124822590", "skeptical": "61520", "allthethings": "61533", "whatif": "100947", "grandma": "61556", "thenisaid": "922147" }
var meme_templates = Object.keys(meme_dict).join(", ")
// NPM PACKAGES
const request = require('request'); // NodeJS request sending.
const fetch = require('node-fetch')
const formData = require('form-data'); // Needed for sending POST requests to servers.
var fs = require('fs'); // Core Node.JS package required for writing to files.
var moby = require('moby') // This is an NPM package which allows for communication with The Moby Project's database of words.

var Jimp = require("jimp"); // Image Manipulation with JS.
var ffmpeg = require('ffmpeg'); // Required for playing sound via Discord.
var cloudinary = require('cloudinary')
// Global Variables
var new_image_name = "test56.jpg"
var bot_prefix = "-"


// Machine Learning
// const brain = require('brain.js');

// const trainingData = [
//     'I am here to talk :eyes:',
//     'I am pretty great actually',
//     'I am doing well really',
//     'I love talking to you ahaha.'
// ];

// const lstm = new brain.recurrent.LSTM();
// const result = lstm.train(trainingData, { iterations: 1500 });
// Functions

function sendImage(msg, image) {

    // Send an embed with a local image inside
    msg.channel.send('Here is your edited image!', {
        embed: {
            thumbnail: {
                url: 'attachment://file.jpg'
            }
        },
        files: [{
            attachment: image,
            name: image
        }]
    })
        .then(console.log)
        .catch(console.error);
}

// Gets Image and Video Assets From NASA
function getAsset(msg, nasa_id, randomColour) {
    var asset_link = `https://images-api.nasa.gov/asset/${nasa_id}`;
    fetch(asset_link)
        .then(res => res.json())
        .then((out) => {
            console.log(out.collection)
            var image = out.collection.items[2].href;
            console.log(image)

            msg.channel.send({
                embed: {
                    image: {
                        url: image
                    },
                    thumbnail: {
                        url: image
                    },
                    color: randomColour,
                    title: `Image Result`
                }
            });

            console.log(out.collection.items)
        })
        .catch(err => { throw err });
}

function playSound(msg, file, cmd) {
    var voiceChannel = msg.member.voiceChannel;
    console.log(cmd)
    if (voiceChannel === undefined) {
        msg.reply("You need to join a Voice Channel first. Then type your command again.")
    }
    else {
        voiceChannel.join().then(connection => {
            const dispatcher = connection.playFile(file);

        }).catch(err => console.log(err));

    }
}

function checkInServer(msg, username) {
    var guild = msg.guild.members;

    console.log(guild)
    var guild_members = msg.guild.members.map(u => u.id)
    console.log(guild_members)
    if (guild_members.includes(username)) {
        console.log("Returning TRUE")
        return true;
    }
    else {
        console.log("Returning FALSE")
        return false;
    }

    console.log(guild_members);
}

function printCountry(latitude, longitude) {
    var geonames_link = `http://api.geonames.org/countryCode?lat=${latitude}&lng=${longitude}&username=demo`
    fetch(geonames_link)
        .then((out) => {
            console.log(out)

        })
        .catch(err => { throw err });

}

client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(`${bot_prefix}help | Running on ${client.guilds.size} servers`);
});

client.on('message', async msg => {
    if (msg.author.bot) return;

    if (msg.content[0] != bot_prefix) {
        return;
    }
    else {
        console.log(`Message: ${msg.content} Author: ${msg.author} Timestamp: ${msg.createdTimestamp} Date: ${msg.createdAt} Server: ${msg.guild.name} Server Count: ${msg.guild.memberCount} Region: ${msg.guild.region}`);

        try {
            fs.appendFile('test.txt', `\nMessage Content: ${msg_content} Author: ${msg_author} Timestamp: ${msg.createdTimestamp} Date: ${msg.createdAt} Server: ${msg.guild.name} Server Count: ${msg.guild.memberCount} Region: ${msg.guild.region}`, (err) => {
                if (err) throw err;
            });
        }
        catch (error) {
            console.log(error)
        }
    }

    var msg_content = msg.content;
    var msg_array = msg_content.split(" ");
    var cmd = msg_array[0].slice(1, msg_array[0].length);


    var slice = msg_content.slice(0, 6);
    var write_to_file = ""

    var msg_author = msg.author.username;
    console.log(msg.guild.name);

    var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]

    var randomNumber = getRandomNumber(0, colour_array.length - 1);
    var randomColour = colour_array[randomNumber];

    if (cmd === "ask") {
        var question = msg.content.slice(5, msg.content.length);
        console.log(question)
        var url_encoded_question = question.split(" ").join("%20");
        console.log(url_encoded_question);

        var ask_link = `http://api.wolframalpha.com/v2/query?appid=${wolfram_alpha_id}&input=${url_encoded_question}&output=json`

        fetch(ask_link)
            .then(res => res.json())
            .then((out) => {
                var num_pods = out.queryresult.numpods;
                if (num_pods === 0) {
                    msg.reply("Sorry, Wolfram|Alpha doesn't have an answer for that question. Try again maybe? :D")
                }
                else {
                    console.log(out.queryresult)
                    var interpretation = out.queryresult.pods[0].subpods[0].plaintext;
                    console.log(interpretation)

                    var answer = out.queryresult.pods[1].subpods[0].plaintext;
                    console.log(answer)

                    msg.channel.send({
                        embed: {
                            color: randomColour,
                            title: `${interpretation}`,
                            description: answer
                        }
                    });
                }
            })
            .catch(err => { throw err });
    }

    else if (cmd === "name") {
        var name = msg_array[1];
        if (msg_array.length < 2) {
            msg.reply("You must add your name along with the command, eg: \n `-name Josie`")
        }
        else if (msg_array.length > 2) {
            msg.reply("I can only check one name at a time. ")
        }
        else {
            var name_query = msg.content.slice(1, msg.content.length);
            var name_query_encoded = name_query.split(" ").join("%20");
            console.log(name_query_encoded);

            var ask_link = `http://api.wolframalpha.com/v2/query?appid=${wolfram_alpha_id}&input=${name_query}&output=json`

            fetch(ask_link)
                .then(res => res.json())
                .then((out) => {
                    var num_pods = out.queryresult.numpods;
                    if (num_pods === 0) {
                        msg.reply("Sorry, Wolfram|Alpha doesn't have data on your name :(")
                    }
                    else {

                        var interpretation = out.queryresult.pods[0].subpods[0].plaintext;
                        console.log(interpretation)
                        console.log("NAME IS HERE >>>>>")
                        var basic_details = out.queryresult.pods[1].subpods[0].plaintext;
                        var graph = out.queryresult.pods[0].subpods[0].img.src;

                        var historical_details = out.queryresult.pods[2].subpods[0];
                        console.log(historical_details)

                        var estimates = out.queryresult.pods[3].subpods[0];
                        console.log(estimates)
                        var age_dist = out.queryresult.pods[4].subpods[0];
                        console.log(age_dist)

                        var alternate_names = out.queryresult.pods[5].subpods[0].plaintext;
                        if (alternate_names === "") {
                            alternate_names = "No alternate names."
                        }
                        console.log(alternate_names);

                        var notable_ppl = out.queryresult.pods[6].subpods[0].plaintext;
                        console.log(notable_ppl);

                        msg.channel.send({
                            embed: {
                                color: randomColour,
                                title: `${interpretation}`,
                                description: basic_details,
                                image: {
                                    url: graph
                                },
                                fields: [{
                                    name: "Alternate Names",
                                    value: alternate_names
                                },
                                {
                                    name: `Famous People`,
                                    value: notable_ppl
                                }]
                            }
                        });
                    }
                })
                .catch(err => { throw err });
        }
    }

    else if (cmd === "captcha") {

        if (msg_array.length === 1) {
            msg.reply("Add some text along with your command, so that I can convert it into a CAPTCHA.")
        }
        else {
            var captcha_encoded = msg.content.slice(1, msg.content.length).split(" ").join("%20")
            var ask_link = `http://api.wolframalpha.com/v2/query?appid=${wolfram_alpha_id}&input=${captcha_encoded}&output=json`
            fetch(ask_link)
                .then(res => res.json())
                .then((out) => {
                    var img_link = out.queryresult.pods[1].subpods[0].img.src;

                    msg.channel.send({
                        embed: {
                            image: {
                                url: img_link
                            },
                            color: randomColour,
                            title: `Captcha`,
                            description: "Text -> Captcha"
                        }
                    });

                })
                .catch(err => { throw err });
        }
    }

    else if (cmd === "chat") {
        var randomNumber = getRandomNumber(0, happy_emoji.length - 1)
        msg.react(happy_emoji[randomNumber])
        var naturalLanguageSentences = require(`naturalLanguage.json`)
        var resser2 = naturalLanguageSentences["about"];
        msg.reply(resser2)
        var question = msg.content.slice(6, msg.content.length)
        var natural = require('natural');
        var classifier = new natural.BayesClassifier();

        classifier.addDocument("you your", "about");
        classifier.addDocument("think", "opinion");
        classifier.addDocument("Which better versus", "versus");
        classifier.addDocument("Do like", "like");
        classifier.addDocument("Can you help me", "help")
        classifier.addDocument("created coder silvia silv made", "created")
        classifier.addDocument("I", "user")
        classifier.train();

        var result = String(classifier.classify(question));

        var answer = naturalLanguageSentences[result];
        console.log(answer)
        var randomNumber = getRandomNumber(0, answer.length - 1)
        var randomAnswer = answer[randomNumber]
        console.log(randomAnswer);
        var classifications = classifier.getClassifications(question)
        console.log(classifications)
        var user_pronouns = ["I", "me", "you"];
        var bot_pronouns = ["you", "you", "I"]
        var chat_array = question.split(" ");
        for (var i; i < chat_array.length; i += 1) {
            if (user_pronouns.includes(chat_array[i])) {
                console.log("Found user pronoun")
                console.log(chat_array[i])
                console.log(bot_pronouns[i])
                // get the index of where the word is.
                var index_bot_pronouns = user_pronouns.indexOf(chat_array[i])
                console.log(index_bot_pronouns)
                // remove the element at that position
                chat_array.pop(chat_array[i])
                console.log(chat_array)
                // insert the new element 
                chat_array.splice(i, 0, bot_pronouns[index_bot_pronouns])

            }
        }
        console.log(chat_array)

        msg.reply(randomAnswer)
    }
    else if (cmd === "neural") {


        const run1 = lstm.run('I');
        console.log('run 1: I' + run1);

    }

    else if (cmd === "rhyme") {

        // Query is "rhymes with [word]"
        // Check if you can rhyme with more than one word, ie: multi word phrases.

        if (msg_array.length === 1) {
            msg.reply("Add another word with your command, so I can see what rhymes with it.")
        }
        else if (msg_array.length > 2) {
            msg.reply("It's recommended you add only one word with your command.")
        }
        else {
            var search_term = msg_array[1];
            var ask_link = `http://api.wolframalpha.com/v2/query?appid=${wolfram_alpha_id}&input=rhymes%20with%20${search_term}&output=json`
            fetch(ask_link)
                .then(res => res.json())
                .then((out) => {

                    if (out.queryresult.success === false) {
                        msg.reply("Couldn't find any rhyming words :( ")
                    }
                    else {

                        var rhyming_words = out.queryresult.pods[1].subpods[0].plaintext

                        msg.channel.send({
                            embed: {
                                color: randomColour,
                                title: `Rhymes With`,
                                description: rhyming_words
                            }
                        });
                    }
                })
                .catch(err => { throw err });
        }
    }

    else if (cmd === "acronym") {

        if (msg_array.length > 1) {
            var acronym = msg_array[1];
            console.log(msg_array)
            msg.reply("Pinging Acronym Database for the meaning(s) of `" + `${acronym}` + "`")
            var acronym_uri = `http://acronyms.silmaril.ie/cgi-bin/xaa?${acronym}`;
            var acronym_meanings = [];

            request(acronym_uri, { json: true }, (err, res, body) => {
                if (err) { return console.log(err); }
                //console.log(body);
                var split_body = body.split("\n");
                //console.log(split_body)
                var num_acronyms = split_body[4];
                if (num_acronyms.includes("0")) {
                    msg.reply("No acronyms exist with this abbreviation.")
                }
                else {
                    var header = "```ml" + "\n" +
                        "Acronym Meanings for " + acronym + "👀 \n" +
                        "```"
                    for (var i = 6; i < split_body.length - 1; i += 4) {
                        var line = split_body[i]
                        line = line.trim()

                        var split_acr_array = line.split(" ");

                        var first_item = split_acr_array[0]

                        if (split_acr_array.length === 1) {
                            first_item = first_item.slice(7, first_item.length - 8)
                            split_acr_array[0] = first_item
                        }
                        else {
                            var strpd_item = first_item.slice(7, first_item.length + 5);
                            split_acr_array[0] = strpd_item;

                            var last_item = split_acr_array[split_acr_array.length - 1];
                            var strpd_last_item = last_item.slice(0, split_acr_array.length - 11);
                            split_acr_array[split_acr_array.length - 1] = strpd_last_item;
                        }

                        var final_acronym = split_acr_array.toString()
                        final_acronym = final_acronym.split(",").join(" ")
                        acronym_meanings.push(final_acronym)


                    }

                    msg.channel.send({
                        embed: {
                            color: randomColour,
                            title: `Acronym Meaning(s) for ${acronym}`,
                            description: acronym_meanings.join("\n")
                        }
                    });
                }
            });
        }

        else {
            msg.channel.send("You must specify an acronym to search for, eg:`" + `${bot_prefix}` + "acronym rofl`")
        }
    }

    // Live Earth Footage
    else if (cmd === "earth") {
        msg.reply("Pinging the Nasa Database for live earth footage . . .")
        var earth_link = "https://api.nasa.gov/EPIC/api/natural/images?api_key=DEMO_KEY"

        fetch(earth_link)
            .then(res => res.json())
            .then((out) => {
                var earth_output = out;

                var randomNumber = getRandomNumber(0, earth_output.length - 1)
                var image_name = earth_output[randomNumber].image

                var date = earth_output[randomNumber].date;
                var date_split = date.split("-")

                var year = date_split[0];

                var month = date_split[1];

                var day_and_time = date_split[2];
                var sliced_date = day_and_time.slice(0, 2);

                var image_link = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${sliced_date}/png/` + image_name + ".png"
                console.log(image_link)
                msg.channel.send(image_link)
                msg.channel.send(`${earth_output[randomNumber].caption} on ${date}`)
            })
            .catch(err => { throw err });

    }

    else if (cmd === "search") {

        if (msg_array.length > 1) {
            msg.reply("Query successful.")
            var word = msg.content.slice(8, msg_content.length)
            var synonyms = moby.search(word);

            if (synonyms.length === 0) {
                msg.reply("Couldn't find any synonyms related to " + "`" + word + "` Try another maybe? :D")
            }
            else {
                var synonyms_string = synonyms.join(", ");

                if (synonyms_string.length < 2000) {
                    msg.channel.send({
                        embed: {
                            color: randomColour,
                            title: `Synonyms for ${word}`,
                            description: synonyms_string
                        }
                    });
                }
                else if (synonyms_string.length > 2000 && synonyms_string.length < 4000) {
                    var middle_index = synonyms.length / 2;
                    var floored_middle_index = Math.floor(middle_index);
                    var synonyms1 = synonyms.slice(0, floored_middle_index);

                    var synonyms2 = synonyms.slice(floored_middle_index + 1, synonyms.length - 1);

                    msg.channel.send(synonyms1.join(", "))

                    msg.channel.send({
                        embed: {
                            color: randomColour,
                            title: `Synonyms for ${word}`,
                            description: synonyms1,
                            fields: [{
                                name: "Even More Synonyms",
                                value: "I have more synonyms to send, but I don't wanna spam this channel xD"
                            }]
                        }
                    });

                }
                else {
                    msg.channel.send("There are too many synonyms related to this word, and I don't want to spam this channel. xD Try DMMing me, and I'll send you all the results.")
                }
            }

        }
        else {
            msg.reply("You must specifiy a word to get synonyms for, eg: `" + `${bot_prefix}` + "search dancing`");
        }
    }

    else if (cmd === "hi") {
        var greetings = ["Hi there! :D ", "Oh, wow, lovely to see you! ", ":wave: Hey there! ", "o/ Hey there!"]
        var randomNumber = getRandomNumber(0, greetings.length - 1)
        msg.channel.send(greetings[randomNumber] + msg.author);
        msg.react("😄")
    }

    else if (cmd === "avatar") {
        console.log(msg_array.length)
        var user = ""

        // User Wants Their Avatar
        if (msg_array.length === 1) {
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
        else if (msg_array.length === 2) {
            // Need to check if the user is actually in the server

            try {
                var avatar_link = msg.mentions.users.map(u => u.avatarURL)
                msg.channel.send(avatar_link);
            }
            catch (error) {
                msg.channel.send("404: That User Doesn't Exist :(")
            }
        }
        else {
            msg.reply("I can only send one avatar per command.")
        }

    }
    else if (msg.content === "-pls react") {
        for (var i = 0; i < 10; i += 1) {
            var randomNumber = getRandomNumber(0, happy_emoji.length - 1);
            var randomEmoji = happy_emoji[randomNumber];
            msg.react(randomEmoji);
        }
    }

    else if (cmd === "old-define") {
        if (msg_array.length < 2) {
            msg.reply("You must specifiy a word to define, eg: `" + `${bot_prefix}` + "old-define dancing`");
        }
        else {
            var word = msg.content.slice(8, msg_content.length)
            word = word.toUpperCase();
            var lowercase_word = word.toLowerCase();
            var definition = json1[word];
            if (definition != undefined) {
                msg.reply("Found a definition")
                msg.channel.send(word);
                msg.channel.send(definition);

                msg.channel.send({
                    embed: {
                        color: randomColour,
                        title: "Ancient Definition for`" + `${lowercase_word}` + "`",
                        description: definition,
                    }
                });
            }
            else {
                msg.channel.send("Couldn't find a definition :( Try another word, maybe? :D")
            }
        }
    }

    else if (cmd === "define") {
        if (msg_array.length < 2) {
            msg.reply("You must specifiy a word to define, eg: `" + `${bot_prefix}` + "define dancing`");
        }
        else {
            var word = msg.content.slice(8, msg_content.length);
            var url_encoded_word = word.split(" ").join("_")
            var oxford_link = `https://od-api.oxforddictionaries.com:443/api/v1/entries/en/${url_encoded_word}`
            console.log(oxford_link)
            console.log(oxford_app_id)
            console.log(oxford_app_key)

            var oxfordFormData = {
                Accept: "application/json",
                app_id: oxford_app_id,
                app_key: oxford_app_key

            };

            request.post({ url: oxford_link, formData: oxfordFormData }, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error('Could not retrieve definition from Oxford', err);
                }
                console.log('Definition request successful!  Server responded with:', body);
                var json_definition_obj = JSON.parse(body);

            });
        }
    }
    // msg.channel.send({
    //     embed: {
    //         color: randomColour,
    //         title: "Ancient Definition for`" + `${lowercase_word}` + "`",
    //         description: definition,
    //     }
    // });




    else if (cmd === "population") {
        msg.reply("Getting you your population stats . . .")
        let url = 'http://api.population.io/1.0/population/World/today-and-tomorrow/?format=json';

        fetch(url)
            .then(res => res.json())
            .then((out) => {
                var total_population = out.total_population[1].population;
                msg.channel.send({
                    embed: {
                        color: randomColour,
                        title: "World Population Stats :earth_africa:",
                        description: `There are ${total_population} humans living on Earth right now.`
                    }
                });
            })
            .catch(err => { throw err })
            .catch(err => { msg.channel.send("I couldn't seem to get the population for you :/") });
    }
    else if (cmd === "cs_jokes") {
        msg.reply("Getting you some CS jokes . . . \n ~~Bogosort~~");
        var reddit_url = 'https://www.reddit.com/r/ProgrammerHumour/.json';

        fetch(reddit_url)
            .then(res => res.json())
            .then((out) => {
                var randomNumber = getRandomNumber(0, 26)
                var reddit_data = out.data.children[randomNumber].data;
                var url = reddit_data.url;
                var author = reddit_data.author;
                msg.reply("Posted by:" + author);
                msg.reply(url)
                console.log(url)
            })
            .catch(err => { throw err });
    }

    else if (cmd === "til") {
        msg.reply("Getting you some TODAY I LEARNED from the TIL Subreddit. . . :surprise:")
        let til_url = "https://www.reddit.com/r/todayilearned.json";

        fetch(til_url)
            .then(res => res.json())
            .then((out) => {
                var randomNumber = getRandomNumber(1, 25)
                var reddit_data = out.data.children[randomNumber].data;
                var title = reddit_data.title;
                var article_url = reddit_data.url;
                var author = reddit_data.author;
                console.log(reddit_data)
                msg.channel.send(title);
                msg.channel.send("Posted by: " + author)
                msg.channel.send(article_url);

            })
            .catch(err => { throw err });
    }
    else if (cmd === "news") {
        msg.channel.send("Pinging Reddit for some world headlines: :earth_africa:")
        let til_url = "https://www.reddit.com/r/worldnews.json";

        fetch(til_url)
            .then(res => res.json())
            .then((out) => {
                var randomNumber = getRandomNumber(1, 25)
                var reddit_data = out.data.children[randomNumber].data;
                var title = reddit_data.title;
                var article_url = reddit_data.url;
                var author = reddit_data.author;
                msg.channel.send("Posted by: " + author)
                msg.channel.send(title);
                msg.channel.send(article_url);

            })
            .catch(err => { throw err });
    }

    // The Movie DB API Caller
    else if (cmd === "movie") {
        msg.reply("Pinging the Movie DB for film info . . .")
        var movie_db_url = "https://www.themoviedb.org/documentation/api/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22";

        fetch(movie_db_url)
            .then(res => res.text())
            .then((out) => {
                var randomNumber = getRandomNumber(0, 26)
                var film_data = out;
                console.log(film_data)

            })
            .catch(err => { throw err });
    }

    // NASA Near-Earth-Object Checker
    else if (cmd === "neo") {
        msg.reply("Pinging the Nasa Database for live near-earth info . . .")
        var nasa_neo_checker = "https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=DEMO_KEY"

        fetch(nasa_neo_checker)
            .then(res => res.json())
            .then((out) => {
                var randomNumber = getRandomNumber(0, 26)
                var nasa_output = out;
                var total_nearearth_objects = out.element_count;
                var neo_message = "There are a total of " + total_nearearth_objects + " near-earth objects circulating around Earth right now."

                msg.channel.send({
                    embed: {
                        color: randomColour,
                        title: "Near Earth Objects",
                        description: neo_message
                    }
                });

            })
            .catch(err => { throw err });

    }

    // Behind The Name API

    //Meme Generator, thanks to the imgflip API
    else if (cmd === "meme") {
        try {
            console.log(msg_array)
            console.log(msg_content)

            var first_words_length = msg_array[0].length + msg_array[1].length + 2;
            console.log(first_words_length)
            var text = msg_content.slice(first_words_length, msg_content.length);
            console.log(text)

            var template = msg_array[1]

            var meme_text = text.split("-")

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
            msg.reply("There was an error; if your command wasn't the issue, then maybe something internally must've gone wrong. \n Silvia (my creator) is getting to work on it!")
        }
    }

    else if (cmd === "meme_templates") {
        msg.channel.send({
            embed: {
                color: randomColour,
                title: "Meme Templates",
                description: meme_templates
            }
        });
        msg.channel.send("To create a meme, type -meme [template] top text-bottom text \n \n eg: `-meme office Top text-bottom text`")
    }

    else if (cmd === "bitcoin") {
        // BitCoin Charts
        var bitcoin_charts = "http://api.bitcoincharts.com/v1/markets.json"
        fetch(bitcoin_charts)
            .then(res => res.json())
            .then((out) => {
                var bitcoin_info = out;
                //var randomNumber = getRandomNumber(0, bitcoin_info.length)

                var usd_currency = bitcoin_info[1]
                var eur_currency = bitcoin_info[2]
                console.log(usd_currency)

                var bc_to_usd = usd_currency.ask;
                console.log(bc_to_usd)

                var bc_to_eur = eur_currency.ask;
                console.log(bc_to_eur)

                var header = "```ml" + "\n" +
                    "BITCOIN DATA FROM BITCOINCHARTS.COM 👀" + "\n" +
                    "```"

                var usd_message = "USD --> 1 bitcoin equals: $" + bc_to_usd
                var eur_message = "EUR --> 1 bitcoin equals: €" + bc_to_eur

                msg.channel.send({
                    embed: {
                        color: randomColour,
                        title: `Bitcoin Data From BitcoinCharts.com`,
                        description: `${usd_message}\n${eur_message}`
                    }
                });
            })
            .catch(err => { throw err });
    }

    // QR CODE Generator
    else if (cmd === "qr+") {
        try {
            if (msg_array.length === 1) {
                msg.channel.send("You must specify a message to be encoded in the QR code, eg: `") + `${bot_prefix}` + "qr 000 fff Hey there!`"
            }
            else {

                var user_text = msg.content.slice(4, msg.content.length)
                console.log(user_text)
                var user_text_array = user_text.split(" ")
                console.log(user_text_array)

                var fg_color = user_text_array[0]
                console.log(fg_color)
                var bg_color = user_text_array[1]
                console.log(user_text)
                console.log(bg_color)
                var amt_slice = fg_color.length + bg_color.length + 2
                user_text = user_text.slice(amt_slice, msg_content.length);

                user_text = user_text.split(" ").join("%20");
                console.log(user_text)

                var qr_generator = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=${fg_color}&bgcolor=${bg_color}&data=${user_text}`;
                msg.reply(qr_generator)
            }
        }
        catch (error) {
            msg.reply("There was an error; if your command wasn't the issue, then maybe something internally must've gone wrong. \n Silvia (my creator) is getting to work on it!")

        }
    }

    else if (cmd === "qr") {
        if (msg_array.length === 1) {
            msg.channel.send("You must specify a message to be encoded in the QR code, eg: `") + `${bot_prefix}` + "qr 000 fff Hey there!`"
        }
        else {
            var user_text = msg_array.slice(1, msg_array.length);
            console.log(user_text)


            user_text = user_text.join("%20");
            console.log(user_text)

            var qr_generator = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${user_text}`;
            msg.reply(qr_generator)
        }
    }

    // XKCD Comics
    else if (cmd === "xkcd") {
        var xkcd_link;
        var number;
        // Only execute the fetch code if the cmd "xkcd" is entered, or if the msg content is equal to "xkcd today"
        // Otherwise, I'd have the fetch code twice.

        try {
            if (msg_array.length === 1 || msg_content === "-xkcd today") {
                // User wants a random comic.
                if (msg_array.length === 1) {
                    number = getRandomNumber(0, 1995);
                    xkcd_link = `https://xkcd.com/${number}/info.0.json`;
                }
                else {
                    xkcd_link = "http://xkcd.com/info.0.json"
                }

                fetch(xkcd_link)
                    .then(res => res.json())
                    .then((out) => {
                        var xkcd_info = out;
                        console.log(xkcd_info)
                        var image = xkcd_info.img;
                        msg.channel.send(image)
                        var name = xkcd_info.title;
                        var number = xkcd_info.num;
                        msg.channel.send(`Comic #${number} entitled ${name} from XKCD.`)
                    })
                    .catch(err => { throw err });
            }
        }
        catch (error) {
            msg.reply("There was an error; if your command wasn't the issue, then maybe something internally must've gone wrong. \n Silvia (my creator) is getting to work on it!")

        }
    }

    // Computer Scienc-y/SysAdmin Trivia
    else if (cmd === "trivia") {
        // Create a category mapping between categories and numbers.


        var trivia_link = "https://opentdb.com/api.php?amount=1&category=18&difficulty=easy"
        fetch(trivia_link)
            .then(res => res.json())
            .then((out) => {
                var trivia_info = out;
                console.log(trivia_info);
                var question = trivia_info.results[0].question;
                msg.channel.send(question)
                var answer = trivia_info.results[0].answer;

            })
            .catch(err => { throw err });

        client.on('message', ans => {
            console.log(ans)
            if (ans === "hi") {
                msg.reply("Wow, you were right!")
            }
        });

    }

    else if (cmd === "iss") {
        // Need to get general location of a lat/longitude pair.
        var iss_link = "http://api.open-notify.org/iss-now.json"
        fetch(iss_link)
            .then(res => res.json())
            .then((out) => {
                var iss_info = out;
                var position = iss_info["iss_position"];
                var latitude = position["latitude"];
                var longitude = position["longitude"];

                var iss_output = `Latitude: ${latitude}\nLongitude: ${longitude}`

                printCountry(latitude, longitude)

                msg.channel.send({
                    embed: {
                        color: randomColour,
                        title: "Location of the International Space Station 🌌🌠🌃",
                        description: iss_output
                    }
                });
            })
            .catch(err => { throw err });
    }

    else if (cmd === "astronauts") {
        // Getting Astronauts in Space
        var astro_link = "http://api.open-notify.org/astros.json"
        fetch(astro_link)
            .then(res => res.json())
            .then((out) => {
                var astro_list = out;
                var number_astronauts = astro_list["number"];

                var astro_output = `There are ${number_astronauts} astronauts aboard the International Space Station right now.`

                msg.channel.send({
                    embed: {
                        color: randomColour,
                        title: "Number of Astronauts In Space Right Now",
                        description: astro_output
                    }
                });


            })
            .catch(err => { throw err });
    }

    else if (cmd === "iss_passes") {

        // Find out whether the latitude/longitude is in a certain country.
        // Getting the ISS Pass-by Dates for a certain location, given latitude and longitude co-ordinates.
        var latitude = msg_array[1];
        var longitude = msg_array[2];
        console.log(latitude + longitude)
        var iss_passes_link = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`
        fetch(iss_passes_link)
            .then(res => res.json())
            .then((out) => {
                var passes_list = out;
                console.log(passes_list)

                var astro_output = "```ml" + "\n" +
                    "When The ISS Will Pass By 🌌🌠🌃" + "\n" + `` +
                    "```"

            })
            .catch(err => { throw err });
    }

    else if (cmd === "translate") {

        if (msg_array.length === 1) {
            msg.reply("You must specify a language code, and a sentence/piece of text to translate, eg: \n `translate fr Hey there, how are you?` \n Language codes include: `en`, `fr`, `es`, `it`, `de`")
        }
        else {
            var languages_array = ["en", "es", "it", "de", "fr"]
            var to_language = msg_content.slice(11, 13)
            var text = msg_content.slice(13, msg_content.length)
            console.log(to_language);

            if (languages_array.indexOf(to_language) >= 0) {
                console.log("Language in array")
                var languageTranslator = createLanguageTranslator();

                var parameters = {
                    text: text,
                    source: 'en',
                    target: to_language
                };

                languageTranslator.translate(
                    parameters,
                    function (error, response) {
                        if (error) {
                            console.log(error)
                            msg.reply(`Sorry, your desired language is not available at this time. 
                    Supported languages include en, fr, de, it, and es`)
                        }
                        else {
                            console.log(response);
                            var translated_text = response.translations[0].translation;
                            console.log(translated_text);
                            msg.reply(translated_text);
                        }

                    }
                );
            }

            else {
                msg.reply(`Sorry, your desired language is not available at this time. 
            Supported languages include en, fr, de, it, and es`)
            }
        }
    }

    else if (cmd === "identify") {

        if (msg_array.length > 1) {
            var text = msg_content.slice(11, msg_content.length);

            var languageTranslator = createLanguageTranslator();

            languageTranslator.identify(
                {
                    text: text
                },
                function (err, language) {
                    if (err) {
                        console.log('error:', err);
                        msg.reply(`Sorry, Watson couldn't seem to identify the language. :/`)

                    } else {
                        console.log(JSON.stringify(language, null, 2));
                        var most_confident_lang = language.languages[0].language;
                        var confidence = language.languages[0].confidence * 100;
                        msg.reply(`IBM's Watson predicts with ${confidence}% confidence that the language is ${most_confident_lang} \n :flag_${most_confident_lang}:`);
                    }
                }
            );
        }

        else {
            msg.reply("You must include a piece of text with your command, eg:`" + `${bot_prefix}` + "identify Bonjour, la vie est belle!` ")
        }

    }

    // Text Formatting Commands.
    else if (cmd === "fmt") {
        var fmt_array = msg_content.slice(4, msg_content.length);
        fmt_array = fmt_array.split(" ")
        var fmt_cmd = fmt_array[0]
        var message = msg_content.slice(5 + fmt_cmd.length, msg_content.length)
        console.log(fmt_cmd)
        console.log(message)
        var color_cmds_list = ["red", "yellow", "blue", "orange"]
        var syntax_highlighting_list = ["bash", "md", "python", "java", "kotlin", "javascript"]
        var font_cmds_list = ["old", "circular", "hex", "binary", "1337", "adv1337", "mono", "cursive", "currency"]

        if (color_cmds_list.indexOf(fmt_cmd)) {
            // Map the colour to a specific programming language, so that Discord can syntax highlight their text, allowing them to have their message in a certain colour.
            colour = fmt_cmd;
            var colour_to_language = { "highlighted": "tex", "yellow": "css", "orange": "py" }
            var language = colour_to_language[colour];
            var examples_template = "```ml" + "\n" +
                "Example Commands 👀" + "\n" +
                "\n" +
                "```" + "`" + examples + "`"

            var fmtMessage = "```" + `${language}` + "\n" +
                `${message}` + "\n" +
                "```"
            msg.channel.send(fmtMessage);
        }

        else if (font_cmds_list.indexOf(fmt_cmd)) {
            var convertedFontMessage = "";
            var translatedLetter = "";
            var message_array = message.split("");
            console.log(message_array);
            // EXTRACTING THE APPROPRIATE CHARACTER LIST.
            var font_cmds_object = require('font_lists.json');
            var characterList = font_cmds_object[fmt_cmd];
            console.log(characterList);

            for (var i = 0; i < message_array.length; i += 1) {
                console.log(i);
                var letter = message_array[i];
                console.log(letter)
                var symbolList = [" ", "\n", "\r\n", '\'', "\"", "!", ",", ".", "?", ">", "<", "$", "Ã¢â€šÂ¬", "/", "(", ")", "=", "+", ":", ";", "*"];
                var numberList = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

                if (symbolList.indexOf(letter) >= 0 || numberList.indexOf(letter) >= 0) {
                    translatedLetter = letter
                    console.log("Found symbol.")
                }
                else {
                    console.log(letter)
                    translatedLetter = characterList[letter] // Need the list where the converted characters are.
                    console.log(translatedLetter)
                    console.log("Else executed.")
                }
                convertedFontMessage += translatedLetter;
            }
            console.log(convertedFontMessage);
            msg.channel.send(convertedFontMessage);
        }

        // edit the user's message by replacing their cmdded message with the translated message.
    }

    // Match words to Emoji. English supported only.
    else if (cmd === "emojify") {

        if (msg_array.length > 1) {
            var keys = Object.keys(emoji);
            // console.log(keywords)

            var msg_array_length = msg_array.length;

            msg_array = msg_array.slice(1, msg_array_length);

            var emojip = "";
            var matched_emojis = [];


            for (var i = 0; i < msg_array.length; i += 1) {
                var sub_matched_emojis = [];
                var word = msg_array[i];


                //     console.log(emojip)
                //     msg.channel.send(emojip)
                for (var k = 0; k < keys.length; k += 1) {
                    var keywords = emoji[keys[k]]["keywords"];
                    if (keys[k] === word) {
                        console.log(keys[k] + " matched " + word);
                        console.log(keywords)
                        sub_matched_emojis.push(keys[k])
                    }
                    else {
                        for (var j = 0; j < keywords.length; j += 1) {

                            if (keywords[j] === word) {
                                sub_matched_emojis.push(keys[k])
                            }
                        }
                    }

                }
                if (sub_matched_emojis.length > 0) {
                    // Get random matched emojis
                    var randomNumber = getRandomNumber(0, sub_matched_emojis.length - 1);
                    var randomEmoji = sub_matched_emojis[randomNumber]
                    var emoji_md = `:${randomEmoji}:`
                    emojip += ` ${word} ${emoji_md}`
                }
                else {
                    emojip += ` ${word}`
                }
            }
            console.log(matched_emojis)
            console.log(emojip)
            msg.channel.send(emojip)
        }
        else {
            msg.reply("You must specify at least another word along with your command.")
        }

    }

    // Word Pyramid
    else if (cmd === "pyramid") {

        if (msg_array.length > 3) {
            var msg_array_length = msg_array.length;
            msg_array = msg_array.slice(1, msg_array_length);

            var word_pyramid = "";
            var pyramid2 = " ";
            for (var i = 0; i < msg_array.length; i += 1) {
                var word = msg_array[i];
                word_pyramid += ` ${word}`;

                pyramid2 += `\n${word_pyramid}`;
            }

            if (msg_array.length < 4 && msg_array.length > 2) {
                pyramid2 += "\nTry adding more words to your pyramid to make it more impressive :eyes:"
            }
            msg.channel.send(pyramid2);
        }

        else if (msg_array.length === 1) {
            msg.reply("You must include a piece of text along with your command, eg: `" + `${bot_prefix}` + "pyramid Hello there`")

        }
        else if (msg_array.length === 2) {
            msg.reply("Try adding at least another word to your sentence. I'll be ready to make your pyramid then . . . :D")
        }

    }
    else if (cmd === "reverse") {
        if (msg_array.length > 1) {
            var msg_array_length = msg_array.length;
            msg_array = msg_array.slice(1, msg_array_length);
            msg_string = msg_content.slice(9, msg_content.length);

            var reverse_string = "";
            var word;
            var split_word;
            for (var i = msg_string.length - 1; i >= 0; i -= 1) {

                reverse_string += msg_string[i];
            }
            msg.channel.send(reverse_string);
        }

        else {
            msg.reply("You must include a piece of text along with your command, eg:`" + `${bot_prefix}` + "reverse Hello there`")

        }

    }

    else if (cmd === "poke") {
        if (msg_array.length === 1) {
            msg.reply("Tee hee, you never told me who to poke :) Did you actually want to poke me instead? ^^ \n Try mentioning someone along with your command :eyes:.")
        }
        else {
            var poker = msg.author;
            var pokee = msg_array[1];
            msg.channel.send(`${poker} just poked :point_right: ${pokee} :eyes:`)
        }
    }
    else if (cmd === "gift") {

        if (msg_array.length === 1) {
            msg.reply("Tee hee, you never told me who to send the gift to :) Did you actually want to send it to me? ^^ \n Try mentioning someone along with your command :eyes:.")
        }
        else {
            var sender = msg.author;
            var receiver = msg_array[1];

            var giftMessages = [`${sender} just sent a gift to ${receiver} :gift:`, `${receiver} just received a gift :gift: from ${sender}`]
            var randomNumber = getRandomNumber(0, giftMessages.length - 1);
            var randomMessage = giftMessages[randomNumber]
            msg.channel.send(randomMessage)
        }
    }
    else if (cmd === "wave") {
        if (msg_array.length === 1) {
            msg.reply("Tee hee, you never told me who you wanted to wave at :) Did you actually want to wave at me instead? ^^ \n Try mentioning someone along with your command :eyes:.")
        }
        else {
            var sender = msg.author;
            var receiver = msg_array[1];

            msg.channel.send(`${sender} just waved at ${receiver} :wave:`)
        }
    }

    else if (cmd === "imgedit") {
        var randomNumber = getRandomNumber(0, 250);
        var randomQuality = getRandomNumber(5, 100);
        var width = getRandomNumber(100, 350);
        var height = getRandomNumber(100, 350);

        Jimp.read("test.jpg", function (err, test) {
            if (err) throw err;
            test.resize(width, height)            // resize
                .quality(randomQuality)                 // set JPEG quality
                .greyscale()                 // set greyscale
                .write(new_image_name); // save
        });

        sendImage(msg, new_image_name)

    }

    else if (cmd === "sepia") {
        msg.channel.send("Above image is before the sepia filter is applied.")
        var img_link = msg_array[1];

        Jimp.read(img_link, function (err, test) {
            if (err) throw err;
            test.sepia()
                .write(new_image_name);
        });

        sendImage(msg, new_image_name)

    }

    else if (cmd === "resize") {
        var width = Number(msg_array[1]);
        console.log(width)
        var height = Number(msg_array[2]);
        console.log(height)
        Jimp.read("test.jpg", function (err, test) {
            if (err) throw err;
            test.resize(width, height);
        });

        sendImage(msg, new_image_name)

    }

    else if (cmd === "flip") {
        var w_or_h = msg_array[1];
        switch (w_or_h) {
            case "w":
                var param = "width";
            case "h":
                var param = "height";
        }
        Jimp.read("test.jpg", function (err, test) {
            if (err) throw err;
            test.flip(param)
        });

        sendImage(msg, new_image_name)

    }

    else if (cmd === "slowblur") {
        Jimp.read("test.jpg", function (err, test) {
            if (err) throw err;
            test.blur(5);
        });

        sendImage(msg, new_image_name)

    }

    else if (cmd === "extremeblur") {
        Jimp.read("test.jpg", function (err, test) {
            if (err) throw err;
            test.blur(10);
        });

        sendImage(msg, new_image_name)

    }

    else if (cmd === "invert") {
        Jimp.read("test.jpg", function (err, test) {
            if (err) throw err;
            test.invert();
        });

        sendImage(msg, new_image_name)

    }

    else if (cmd === "dotify") {
        Jimp.read("test.jpg", function (err, test) {
            if (err) throw err;
            test.dither256();
        });

        sendImage(msg, new_image_name)
    }

    else if (cmd === "randomCase") {

        if (msg_array.length > 1) {
            msg_string = msg_content.slice(12, msg_content.length)
            msg_string = msg_string.toLowerCase();

            var randomCaseString = "";

            var word, letter;

            for (var i = 0; i < msg_string.length; i += 1) {

                if (alphabet.indexOf(msg_string[i])) {
                    var randomNumber = getRandomNumber(0, 1);

                    switch (randomNumber) {

                        case 0:
                            letter = msg_string[i].toLowerCase();
                            break;
                        case 1:
                            letter = msg_string[i].toUpperCase();
                    }
                }
                else {
                    letter = msg_string[i];
                }
                randomCaseString += letter;
            }
            msg.channel.send(randomCaseString);
        }
        else {
            msg.reply("You must include a piece of text along with your command, eg: \n `randomCase Hello there`")
        }
    }

    // Find Emojis Related To A Keyword
    else if (cmd === "getem") {

        if (msg_array.length == 1) {
            msg.reply("You must specify a search term along with your command, eg: \n `getem nature` \n `getem hearts`")
        }
        else {
            msg.channel.startTyping(1)
            var search_term = msg_array[1];

            var keys = Object.keys(emoji);

            var reply = "";

            var matched_emojis = [];
            for (var k = 0; k < keys.length; k += 1) {
                var keywords = emoji[keys[k]]["keywords"];
                if (keys[k] === search_term) {
                    matched_emojis.push(keys[k])
                }
                else {
                    for (var j = 0; j < keywords.length; j += 1) {

                        if (keywords[j] === search_term) {
                            matched_emojis.push(keys[k])
                        }
                    }
                }

            }
            if (matched_emojis.length > 0) {
                var emoji_item;
                reply = "Here are emojis related to: " + "`" + `${search_term}` + "`"
                for (var j = 0; j < matched_emojis.length; j += 1) {
                    emoji_item = matched_emojis[j];
                    emoji_md = `:${emoji_item}:`
                    reply += ` ${emoji_md}`
                }
            }
            else {
                reply = "I couldn't find any matching emojis for your search term :( Try again maybe? :D"
            }
            console.log(matched_emojis)
            msg.channel.stopTyping()
            msg.channel.send(reply)
        }
    }




    // Set Presence
    else if (cmd === "setPresence") {
        var randomPresenceMessages = [`on ${client.guilds.size} servers`]
        var randomNumber = getRandomNumber(0, randomPresenceMessages.length - 1);
        var randomPresenceMessage = randomPresenceMessages[randomNumber];
        client.user.setPresence({ game: { name: randomPresenceMessage }, status: 'online' })
            .then(console.log)
            .catch(console.error);
    }

    else if (cmd === "letterEm") {
        if (msg_array.length > 1) {
            var numbers = { "1": "one", "2": "two", "3": "three", "4": "four", "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine" };
            var number_keys = Object.keys(numbers);

            var string = msg_content.slice(10, msg_content.length);
            string = string.toLowerCase();

            var letter;
            emoji_string = ""
            for (var i = 0; i < string.length; i += 1) {
                letter = string[i];
                if (alphabet.includes(letter) === true) {
                    if (letter != "b") {
                        emoji_letter = `:regional_indicator_${letter}:   `;

                    }
                    else {
                        emoji_letter = ":b:   "
                    }
                    emoji_string += emoji_letter;
                }
                else if (number_keys.includes(letter) === true) {
                    var num_string = numbers[letter];
                    emoji_letter = `:${num_string}: `
                    emoji_string += emoji_letter
                }
                else if (letter === " ") {
                    emoji_string += "      ";
                }
                else {
                    emoji_string += letter;
                }

            }
            msg.channel.send(emoji_string)

        }
        else {
            msg.reply("You need to include a message along with the command, eg: \n `replaceB `")
        }
    }

    else if (cmd === "replaceB") {

        if (msg_array.length > 1) {
            var string = msg_content.slice(10, msg_content.length);

            var letter;
            emoji_string = ""
            for (var i = 0; i < string.length; i += 1) {
                letter = string[i];
                if ((letter === "b") || (letter === "B")) {
                    b_emoji = `:b:`;
                    emoji_string += b_emoji;
                }
                else {
                    emoji_string += letter;
                }

            }
            msg.channel.send(emoji_string)
        }

        else {
            msg.reply("You need to include a message along with the command, eg: `" + `${bot_prefix}` + "replaceB`")
        }

    }
    else if (cmd === "nasapic") {
        var search_term = msg_array.slice(1, msg_array.length)
        var apod_link = `https://images-api.nasa.gov/search?q=${search_term}&media_type=image`;
        fetch(apod_link)
            .then(res => res.json())
            .then((out) => {

                var link_result = out.collection.items[0].links[0].href
                var nasa_id = out.collection.items[0].data[0].nasa_id

                getAsset(msg, nasa_id, randomColour)
            })
            .catch(err => { throw err });
    }
    else if (cmd === "airQuality") {
        var openaq_link = "https://api.openaq.org/v1/measurements?country=Sweden"
        fetch(openaq_link)
            .then(res => res.json())
            .then((out) => {

                console.log(out)


            })
            .catch(err => { throw err });

    }

    else if (cmd === "photo") {
        var search_query = msg.content.slice(6, msg.content.length)

        var photo_link = `https://api.unsplash.com/search/photos/?client_id=${unsplash_client_id}&query=${search_query}`
        fetch(photo_link)
            .then(res => res.json())
            .then((out) => {
                if (out.total == 0) {
                    msg.reply(`I couldn't find any Unsplash images related to ${search_query}`)
                }
                else {
                    var randomImageIndex = getRandomNumber(0, out.results.length - 1)
                    var first_img_link = out.results[0].urls.raw
                    var first_img_user = out.results[0].user.username
                    var random_img_link = out.results[randomImageIndex].urls.raw
                    var random_img_user = out.results[randomImageIndex].user.username

                    msg.channel.send({
                        embed: {
                            color: randomColour,
                            description: `[${random_img_user}](https://unsplash.com/@${random_img_user}) on [Unsplash](https://unsplash.com)`,
                            title: `Images From Unsplash Related To ${search_query}`,
                            image: {
                                url: random_img_link
                            },
                            fields: [
                                {
                                    name: "Original Image",
                                    value: "[Original image found here](https://unsplash.com)"
                                }]
                        }
                    });
                }

            })
            .catch(err => { throw err });
    }

    // CLOUDINARY INTEGRATION
    else if (cmd === "filter") {

        cloudinary.config({
            cloud_name: cloudinary_creds.cloud_name,
            api_key: cloudinary_creds.api_key,
            api_secret: cloudinary_creds.api_secret
        });

        var img_url = msg_array[1];
        console.log(img_url);

        cloudinary.uploader.upload(img_url,
            function (result) {
                console.log(result.eager); msg.channel.send({
                    embed: {
                        color: randomColour,
                        title: `Your Edited Image`,
                        image: {
                            url: result.eager[0].secure_url
                        },
                        fields: [{
                            name: "Applied Filter Effects",
                            value: "Added filters include sepia."
                        }
                        ]
                    }
                });
            },
            {
                public_id: 'sample_id',
                crop: 'limit',
                width: 2000,
                height: 2000,
                eager: [
                    {
                        width: 200, height: 200,
                        radius: 20, effect: 'sepia'
                    },
                    { width: 100, height: 150, crop: 'fit', format: 'png' }
                ],
                tags: ['astronomy']

            }
        )
    }

    // This code outputs the following URL:
    // https://res.cloudinary.com/demo/image/upload/w_150,h_150,c_thumb,g_face,r_20,e_sepia/l_cloudinary_icon,g_south_east,x_5,y_5,w_50,o_60,e_brightness:200/a_10/front_face.png

    // ELECTRONIC MUSIC MANIPULATION

    // Starting Point

    else if (cmd === "music_cmds") {
        msg.reply(`Samples include: ${music_cmds.join(", ")} \n To listen to one of them, just join a Voice Channel, and type its name. \n eg: Type ` + "`futurebass`")
        var drum_samples = ["trapdrums", "deepbass", "edmbuild"]
        var build_samples = ["build", "riser", "snare", "skybuild", "edmbeat", "trapbass"]
        var drop_samples = ["futurebass"]

        msg.channel.send({
            embed: {
                color: randomColour,
                title: `Music Samples`,
                description: " To listen to one of these samples, prepend a hyphen before their name.",
                fields: [{
                    name: "Drum Beat/Bass",
                    value: drum_samples.join(", ")
                },
                {
                    name: "Builds",
                    value: build_samples.join(", ")
                },
                {
                    name: "Drops",
                    value: drop_samples.join(", ")
                },
                {
                    name: "Examples",
                    value: "`-build\n-skybuild`"
                },
                ]
            }
        });
    }

    else if (cmd === "fx") {
        var sample1 = msg_array[1];
        var sample2 = msg_array[2];

        if (msg_array.length < 3) {
            msg.reply("You need to add two sound effects along with your command, eg: \n `fx futurebass build` \n Both `futurebass` and `build` are samples.`")
        }

        else if (msg_array.length === 3) {

            if (music_cmds.includes(sample1) && music_cmds.includes(sample2)) {

                var ffmpeg = require('fluent-ffmpeg');
                var command = ffmpeg();
                ffmpeg()
                    .input(`${sample1}.wav`)
                    .input(`${sample2}.wav`)
                    .complexFilter([
                        {
                            filter: "amix",
                            inputs: 2,
                            duration: "shortest",
                            dropout_transition: 3
                        }
                    ])
                    .output('output7.wav')
                    .run()

                playSound(msg, "output7.wav", cmd) // Defined below.
                var link1 = loop_dict[`${sample1}.wav`]
                var link2 = loop_dict[`${sample2}.wav`]
                msg.channel.send(`${sample1} sample free here: ${link1}`)
                msg.channel.send(`${sample2} sample free here: ${link2}`)
            }

            else {
                msg.reply("Sorry, I don't recognise those samples. Probably a typo :stuck_out_tongue_winking_eye:")
            }
        }

        else {
            msg.reply("You can only combine two samples/loops at a time for now, eg: \n `fx build futurebass`")
        }
    }

    else if (cmd === "merge") {
        var ffmpeg = require('fluent-ffmpeg');
        var command = ffmpeg();
        ffmpeg('build.wav')
            .input('trapdrums.wav')
            .mergeToFile('output.wav')
    }

    // Playback samples.
    else if (music_cmds.includes(cmd)) {
        console.log("playing")
        playSound(msg, `${cmd}.wav`, cmd);
        msg.channel.send(`${cmd} sample free here: ${link}`)
        msg.reply("Now try combining the sample with another sample by typing `-fx build" + ` ${cmd}` + "`");



    }


    // ScribbleTune use
    else if (cmd === "music") {
        const scribble = require('scribbletune');
        var clip = scribble.clip({
            notes: 'c4'
        });
        scribble.midi(clip);

        // const broadcast = client.createVoiceBroadcast();
        // broadcast.playFile('fx.wav');

        // for (const connection of client.voiceConnections.values()) {
        //     connection.playBroadcast(broadcast);
        //     console.log("Playing")
        // }
    }

    // YouTube Integration
    else if (cmd === "yt") {
        var search_query = msg.content.slice(4, msg.content.length);

        const { google } = require('googleapis');

        const youtube = google.youtube({
            version: 'v3',
            auth: youtube_api_key
        });

        // Function is placed here, because I may require more function calls in the future.
        async function searchYouTube(msg, search_term) {
            const res = await youtube.search.list({
                part: 'id,snippet',
                q: search_term
            });
            console.log(res.data.items[0].id);
            var video_id = res.data.items[0].id.videoId;
            var video_url = `https://www.youtube.com/watch?v=${video_id}`
            msg.reply(video_url)

        }
        searchYouTube(msg, search_query);
    }



    // Typing Contest
    // CoinBin 


    // if (cmd === "wiki"){
    //     var search_term = msg_content.slice(5, msg_content.length);
    //     console.log(search_term)
    //     search_term = search_term.split(" ").join("%20");
    //     console.log(search_term)
    //     var wiki_link = `https://en.wikitionary.org/w/api.php?action=query&titles=${search_term}&prop=revisions&rvprop=content&format=json&formatversion=2`
    //     fetch(wiki_link)
    //     .then(res => res.json())
    //     .then((out) => {
    //     var wiki_info = out;
    //     var wiki_content = wiki_info.query.pages[0].revisions[0].content;
    //     console.log(wiki_content)
    //     msg.reply(wiki_content)
    //     })
    //     .catch(err => { throw err });

    // }

    // HELP COMMAND
    else if (cmd === 'help') {

        if (msg_array.length > 1) {
            var cmd = msg_array[1];

            var cmd_example = cmd + "_examples";
            var cmd_info = cmd_info_obj.commands[0][cmd];
            console.log("Definition: " + cmd_info)

            var examples = `${bot_prefix}${cmd_info_obj.examples[0][cmd_example]}`;


            msg.channel.send({
                embed: {
                    color: randomColour,
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    title: `How-to: ${cmd}`,
                    description: `${cmd_info}`,
                    fields: [{
                        name: "Examples",
                        value: "`" + `${examples}` + "`"
                    }
                    ],
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "Coded by Silvia923#9909 <3"
                    }
                }
            });

            if (examples != "") {
                console.log(examples)
                var examples_template = "```ml" + "\n" +
                    "Example Commands 👀" + "\n" +
                    "\n" +
                    "```" + "`" + examples + "`"
            }
        }
        else {
            var search_cmds = " `yt` `photo` `news` `population` `translate` `search` `define` `bitcoin` `acronym` `getem` `name` `rhyme`"
            var space_cmds = "`neo` `earth` `iss` `astronauts` "
            var fun_cmds = "`captcha` `xkcd` `qr` `qr+` `meme` `identify` `emojify` `cs_jokes` `pls react`"
            var fmt_cmds = "`reverse` `pyramid` `randomCase` `replaceB` `letterEm`"
            var social_cmds = "`wave` `poke`"
            var music_production_cmds = "`futurebass`, `fx`, `trapdrums`, `riser`, + other samples [type `-music_cmds` for samples]"
            var example_cmds = "`-earth` \n `-meme onedoesnotsimply Meme's top text-Meme's bottom text`"
            // var search_header = "```ml" + "\n" +
            //     "Info Commands 🔍" + "\n" +
            //     "```"
            // help_output += search_header
            // help_output += search_cmds

            // var space_header = "\n```ml" + "\n" +
            //     "Space Commands 🌌🌠🌃" + "\n" +
            //     "```"
            // help_output += space_header
            // help_output += space_cmds

            // var fun_header = "\n```ml" + "\n" +
            //     "Fun Commands 🎲 ✨🌈" + "\n" +
            //     "```"
            // help_output += fun_header
            // help_output += fun_cmds

            // var fmt_header = "\n```ml" + "\n" +
            //     "Fun Message Commands ✨🌈" + "\n" +
            //     "```"
            // help_output += fmt_header
            // help_output += fmt_cmds

            // var social_header = "\n```ml" + "\n" +
            //     "Social Commands ✨🌈" + "\n" +
            //     "```"
            // help_output += social_header
            // help_output += social_cmds
            // var help_message = "\n```ml" + "\n" +
            //     "Just prepend a hyphen before any of the above commands. \n To get more info. on a certain command, plus examples, type " + "`" + `${bot_prefix}` + "help [command]`" + "\n" +
            //     "``` eg:`" + `${bot_prefix}` + "help qr`"
            // help_output += help_message

            // msg.channel.send(help_output)

            // var examples = "```ml" + "\n" +
            //     "Example Commands 👀" + "\n" +
            //     "define dancing" + "\n" +
            //     "```"

            msg.channel.send({
                embed: {
                    color: randomColour,
                    author: {
                        name: client.user.username,
                        icon_url: client.user.avatarURL
                    },
                    title: `Onyx Commands`,
                    thumbnail: {
                        url: client.user.avatarURL
                    },
                    description: `Just add a hyphen before any of the following commands:`,
                    fields: [{
                        name: "Search Commands :information_source:",
                        value: search_cmds
                    },
                    {
                        name: "Social Commands :wave: :grinning: ",
                        value: social_cmds
                    },
                    {
                        name: "Fun Commands ✨",
                        value: fun_cmds
                    },
                    {
                        name: "Music Production Commands :loud_sound:",
                        value: music_production_cmds
                    },
                    {
                        name: "Space Commands 🌌🌃",
                        value: space_cmds
                    },
                    {
                        name: "Message Formatting Commands :incoming_envelope: :speech_balloon:",
                        value: fmt_cmds
                    },
                    {
                        name: "Examples",
                        value: example_cmds
                    },
                    {
                        name: "Get More Info. On A Command",
                        value: "To get more info. on a command, type -help [command] \n eg: `-help bitcoin`"
                    }
                    ],
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: "Coded by Silvia923#9909 <3"
                    }
                }
            });
        }


        var general_cmds = "```glsl" + "\n" +
            "avatar : POWER UP that avatar of yours. " + "\n" +
            "```"

        var general_cmds2 = "```tex" + "\n" +
            "avatar : POWER UP that avatar of yours. " + "\n" +
            "```"


        var avatar_cmd = "```tex" + "\n" +
            "avatar : $ POWER UP that avatar of yours." + "\n" +
            "```"

        var help = "\n `pls react` : Get a tonload of reactions for no reason. 👀 🤣 😃 😄 😅 😆 😉" +
            "\n `define` : Get an old-style definition of a word. Try it, it's hilarious XD  \n `earth` : Get a live photo of the Earth as taken from NOAA DSCVRY."

        var reddit = "\n ```ml " + "\n" +
            "Reddit Commands" + "\n" +
            "```"

    }

});

function displayAcronym(request) {
    console.log("Display Result called.")
    if (request.readyState === 4) {
        console.log("Ready state is 4");
        if (request.status === 200) {
            console.log("Ready state is 200.")
            console.log("RESPONSE IS: " + request.responseText.trim())
            var message_content = request.responseText.trim()
            console.log(message_content)
            if (message_content != "0") {
            }
        }
        else {
            console.log("ERROR IN RECEIVAL OF REQUEST.");
        }
    }
}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getNumberAstronauts() {


}

function createLanguageTranslator() {
    var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');
    var watson_username = process.env.TRANSLATE_USERNAME;
    var watson_pass = process.env.TRANSLATE_PASSWORD
    var watson_url = process.env.TRANSLATE_URL

    var languageTranslator = new LanguageTranslatorV2({
        username: watson_username,
        password: watson_pass,
        url: watson_url,
        headers: {
            'X-Watson-Learning-Opt-Out': 'true'
        }
    });

    return languageTranslator;
}

function searchMatchingEmojis(word) {
    var keywords;
    var obj;
    var word;
    var emojimd;
    var counter = 0;

    // for (var key in obj){

    // var keyword;
    // counter = counter + 1
    // for (var j = 0; j < keywords.length; j += 1){
    //     keyword = keywords[j];
    //     if (keyword === word){
    //         emoji_md = ":" + key + ":"
    //         matched_emojis.push(emoji_md);
    //     }
    // }        
}



client.on('userUpdate', newUser => {
    console.log(`${newUser} just changed her username from ${newUser.oldUser}!`)
});

client.on("guildCreate", guild => {
    var message = `Joined a new server called: ${guild.name} (id: ${guild.id}). This server has ${guild.memberCount} members! :D`;
    console.log(message);

    client.user.setActivity(`${bot_prefix}help | Running on ${client.guilds.size} servers`);

});

client.on("guildDelete", guild => {
    console.log(`Bot has been removed from the following server: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`${bot_prefix}help | Running on ${client.guilds.size} servers`);
});

client.login(token);


// Ideas

// Maybe include text to speech for definitions if possible.
// Whereis Earth at this moment in time?
// Allow the bot's answer be primarily on the time when asked with "How are you?"
// Natural Language Processing -- this would be implemented with an NLP lib of some sort.
// Create images using profile pics
// Check for cool apis to try out
// Get stats on movies from the Movie DB
// Get trending songs from Spotify
// Get trending videos from YouTube.
// google translate
// https://launchlibrary.net/docs/1.3/api.html
// Add further logging only for messages sent by the bot.
// Allow for stats to be made and published to a dashboard system of some sort.
// Add an XP system, so that every time a user posts two or more commands, they get further XP.
// EmojiPasta --> improve
// Oxford Dictionaries API
// HALO APIS https://developer.haloapi.com/docs/services/58acdc2e21091812784ce8c2/operations/5969689a2109180f287972a8/console
// https://api.igdb.com/
// https://exchangeratesapi.io/
// https://www.cryptocompare.com/api#-api-data-price-
// https://www.npmjs.com/package/base64-img