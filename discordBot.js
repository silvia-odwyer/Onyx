// 20+ Commands, Multi-lingual, 24/7, Fun Commands, Meme and Image Generator, Crypto, Economy/Currency, Fun commands
// Multi-lingual support, get acronym and word meanings, receive live footage from NASA,
// Generate QR codes, get XKCD comics, 
// get trending YouTube videos, breaking news, bitcoin prices, 
// make memes, and more! 

const Discord = require('discord.js');
let token_obj = require(`token.json`);
var token = token_obj["token"];
let imgflip_pass_obj = require(`imgflip_pass.json`);
var imgflip_pass = imgflip_pass_obj["pass"];
let cmd_info_obj = require(`commands_info.json`); // Provides information on each command, plus examples of each command's usage.

let translate_creds_obj = require(`translate-creds.json`);

const client = new Discord.Client();

// RESOURCES
var emoji_list = ["😃", "🤣", "👌", "😍", "👌", "😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊", "😋", "😎", "😍", "😘", "😗", "😙", "😚", "🙂", "🤗", "🤩", "🤔", "🤨", "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "😴", "😌", "😛", "😜", "😝", "🤤", "😒", "😓", "😔", "😕", "🙃", "🤑", "😲", "☹️", "🙁", "😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧", "😨", "😩", "🤯", "😬", "😰", "😱", "😳", "🤪", "😵", "😡", "😠", "🤬", "😷", "🤒", "🤕", "😇", "🤠", "🤥", "🤫", "🤭", "🧐", "🤓"]
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let json1 = require(`dictionary.json`); // This is an old-style JSON dictionary, with ancient definitions from the 19th and 20th Century.

// NPM PACKAGES

const fetch = require('node-fetch'); // Simulates the window.fetch() method for Node.JS
const request = require('request'); // NodeJS request sending.
const formData = require('form-data'); // Needed for sending POST requests to servers.
var fs = require('fs'); // Core Node.JS package required for writing to files.
var emoji = require("emojilib/emojis.json") // A JSON file containing emoji and their English meanings.
var Jimp = require("jimp"); // Image Manipulation with JS.

// Global Variables
var new_image_name = "test56.jpg" 
       


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`Running on ${client.guilds.size} servers`);
});

client.on('userUpdate', newUser => {
    console.log(`${newUser} just changed her username from ${newUser.oldUser}!`)
});

client.on("guildCreate", guild => {
    var message = `Joined a new server called: ${guild.name} (id: ${guild.id}). This server has ${guild.memberCount} members! :D`;
    console.log(message);
    
    client.user.setActivity(`Running on ${client.guilds.size} servers`);

  });
  
  client.on("guildDelete", guild => {
    console.log(`Bot has been removed from the following server: ${guild.name} (id: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.size} servers`);
  });

client.on('message', msg => {
    var define = "define";
    var msg_content = msg.content;
    var msg_array = msg_content.split(" ");
    var cmd = msg_array[0];
    console.log(cmd)

    var slice = msg_content.slice(0, 6);
    var write_to_file = ""

    var msg_author = msg.author.username;
    console.log(msg.guild.name)

    fs.appendFile('test.txt', `\nMessage Content: ${msg_content} Author: ${msg_author} Timestamp: ${msg.createdTimestamp} Date: ${msg.createdAt} Server: ${msg.guild.name} Server Count: ${msg.guild.memberCount} Reg: ${msg.guild.region}`, (err) => {  
        if (err) throw err;
    });

  if (msg.content === "hi"){
    msg.reply("It's so lovely to see you, " + msg.author);
    msg.react("😄")
    }

    else if (cmd === "avatar"){
        var avatar_compliments = [`:eyes: I like your avatar A LOT :)`, `Hey everyone! Check out ${msg.author}s neat profile pic :eyes:`, "Oooh, I like this profile pic of yours... :eyes:", "B) Love that profile pic."];
        var randomNumber = getRandomNumber(0, avatar_compliments.length - 1);
        var randomCompliment = avatar_compliments[randomNumber];
        msg.reply(randomCompliment + "\n" + msg.author.avatarURL);
        for (var i = 0; i < 10; i += 1){
            var randomNumber = getRandomNumber(0, emoji_list.length - 1);
            var randomEmoji = emoji_list[randomNumber];
            msg.react(randomEmoji)
        }
    }
    else if (msg.content === "pls react"){
        for (var i = 0; i < 10; i += 1){
            var randomNumber = getRandomNumber(0, emoji_list.length - 1);
            var randomEmoji = emoji_list[randomNumber];
            msg.react(randomEmoji);
        }
    }

    else if (cmd === "define"){
        msg.reply("Query successful.")
        var word = msg.content.slice(7, msg_content.length)
        word = word.toUpperCase();
        msg.reply(word);
        var definition = json1[word];
        msg.reply(definition);
    }

    else if (cmd === "population"){
        msg.reply("Getting you your population stats . . .")
        let url = 'http://api.population.io/1.0/population/World/today-and-tomorrow/?format=json';

        fetch(url)
        .then(res => res.json())
        .then((out) => {
        var total_population = out.total_population[1].population;    
        console.log(total_population)
        msg.reply(`There are ${total_population} humans living on Earth right now.`);
        })
        .catch(err => { throw err });
    }
    else if (cmd === "reddit"){
        msg.reply("Getting you some nice Reddit posts . . .")
        let reddit_url = 'https://www.reddit.com/r/ProgrammerHumour/.json';
        
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

    else if (cmd === "til"){
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
        msg.reply("Posted by: " + author)
        msg.reply(title);
        msg.reply(article_url);

        })
        .catch(err => { throw err });
    }
    else if (cmd === "news"){
        msg.reply("Pinging Reddit for some world headlines: :earth_africa:")
        let til_url = "https://www.reddit.com/r/worldnews.json";
        
        fetch(til_url)
        .then(res => res.json())
        .then((out) => {
        var randomNumber = getRandomNumber(1, 25)
        var reddit_data = out.data.children[randomNumber].data;   
        var title = reddit_data.title;
        var article_url = reddit_data.url;
        var author = reddit_data.author;
        console.log(reddit_data)
        msg.reply("Posted by: " + author)
        msg.reply(title);
        msg.reply(article_url);

        })
        .catch(err => { throw err });
    }
    else if (cmd === "search"){
        var moby = require('moby') // This is an NPM package which allows for communication with The Moby Project's database of words.
        msg.reply("Query successful.")
        var word = msg.content.slice(7, msg_content.length)
        var synonyms = moby.search(word);
        if (synonyms.length > 100){
            console.log(synonyms)

        }
        else{
            msg.reply(synonyms);

        }

    }

    else if (cmd === "acronym"){
        var acronym = msg_array[1];
        console.log(msg_array)
        msg.reply("Pinging Acronym Database for some cool acronym meanings . . .")
        var acronym_uri = `http://acronyms.silmaril.ie/cgi-bin/xaa?${acronym}`;

        request(acronym_uri, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            //console.log(body);
            var split_body = body.split("\n");
            //console.log(split_body)
            var num_acronyms = split_body[4];
            if (num_acronyms.includes("0")){
                msg.reply("No acronyms exist with this abbreviation.")
            }
            else{
                var header = "```ml" + "\n" +
                "Acronym Meanings for " + acronym + "👀 \n" +
                "```"
                msg.channel.send(header)
                for (var i = 6; i < split_body.length - 1; i += 4){
                    var line = split_body[i]
                    line = line.trim()

                    var split_acr_array = line.split(" ");

                    console.log(split_acr_array)
                    var first_item = split_acr_array[0]
                    console.log("First item" + first_item)
                    if (split_acr_array.length === 1){
                        first_item = first_item.slice(7, first_item.length - 8)
                        split_acr_array[0] = first_item

                    }
                    else{    

                        var strpd_item = first_item.slice(7, first_item.length + 5);
                        split_acr_array[0] = strpd_item;
    
                        
                        var last_item = split_acr_array[split_acr_array.length - 1];
                        var strpd_last_item = last_item.slice(0, split_acr_array.length - 11);
                        split_acr_array[split_acr_array.length - 1] = strpd_last_item;
                    }
                
                    console.log(split_acr_array)
                    var final_acronym = split_acr_array.toString()
                    final_acronym = final_acronym.split(",").join(" ")
                    msg.channel.send(final_acronym)

            }
        }
        });
        
    }

    
    // The Movie DB API Caller
    else if (cmd === "movie"){
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
        else if (cmd === "neo"){
            msg.reply("Pinging the Nasa Database for live near-earth info . . .")
            var nasa_neo_checker = "https://api.nasa.gov/neo/rest/v1/feed/today?detailed=true&api_key=DEMO_KEY"
    
            fetch(nasa_neo_checker)
            .then(res => res.json())
            .then((out) => {
            var randomNumber = getRandomNumber(0, 26)
            var nasa_output = out;
            console.log(nasa_output)   
            var total_nearearth_objects = out.element_count;
            msg.reply("There are a total of " + total_nearearth_objects + " near-earth objects circulating around Earth right now.")
            
            })
            .catch(err => { throw err });
            
        }
        // Live Earth Footage
        else if (cmd === "earth"){
            msg.reply("Pinging the Nasa Database for live earth footage . . .")
            var earth_link = "https://api.nasa.gov/EPIC/api/natural/images?api_key=DEMO_KEY"
    
            fetch(earth_link)
            .then(res => res.json())
            .then((out) => {
            var earth_output = out;
            console.log(earth_output)   
            var randomNumber = getRandomNumber(0, earth_output.length)
            var image_name = earth_output[randomNumber].image
            var date = earth_output[randomNumber].date;
            var date_split = date.split("-")
            console.log(date_split)
            var year = date_split[0];
            console.log(year)
            var month = date_split[1];
            console.log(month)
            var day_and_time = date_split[2];
            var sliced_date = day_and_time.slice(0, 2);
            console.log(sliced_date)
            
            var image_link = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${sliced_date}/png/` + image_name + ".png"
            msg.reply(image_link)
            msg.reply("This image was taken on " + date)
            msg.reply(earth_output[randomNumber].caption)
            
            })
            .catch(err => { throw err });
            
        }
    
        // Behind The Name API
    
        //Meme Generator, thanks to the imgflip API
        else if (cmd === "!meme"){
            // !meme !waitingskeleton !hithere !hello
            console.log(msg_content)
            var new_msg_array = msg_content.split("-");
            console.log(new_msg_array);
    
            for (var i = 0; i += 1; i < new_msg_array.length - 3){
                var item = new_msg_array[i];
                console.log(item);
                item.trim()
    
                new_msg_array[i] = item;
            }
            console.log(new_msg_array)
    
            var meme_type = msg_array[1];
            console.log(meme_type)
            var meme_dict = {"Idon'talways":"61532", "waitingskeleton":"4087833", "onedoesnotsimply":"61579", "braceyourselves":"61546"}
            var meme_type_id = meme_dict[meme_type];
    
            var meme_text = msg_array.slice(2, msg_array.length)
            console.log(meme_text)
            msg.reply("Generating a nice m3me for you. . .")
            //var imgflip_password = 
            var formData = {
                // Pass a simple key-value pair
                template_id: meme_type_id,
                username: 'silvod9',
                password: imgflip_pass,
                text0: "I don't always . . . ",
                text1: "but when I do, it's cos I love coding."
              };
              request.post({url:'https://api.imgflip.com/caption_image', formData: formData}, function optionalCallback(err, httpResponse, body) {
                if (err) {
                  return console.error('upload failed:', err);
                }
                console.log('M3me request successful!  Server responded with:', body);
                var json_m3me_obj = JSON.parse(body);
                var m3me_url = json_m3me_obj.data.url;
                console.log(m3me_url)
                msg.reply(m3me_url)
              });
        }

        else if (cmd === "bitcoin"){
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
            msg.channel.send(header)
            msg.reply("USD --> 1 bitcoin equals: $" + bc_to_usd)
            msg.reply("EUR --> 1 bitcoin equals: €" + bc_to_eur)
    
        
            })
            .catch(err => { throw err });
            
        }

    
        // QR CODE Generator
        // Sample Command: qr yellow blue Silvia
        // Creates a qr encoding of "Silvia" with yellow in the foreground (where the black would usually be) and a blue background
        else if (cmd === "qr"){
            var user_text = msg.content.slice(3, msg.content.length)
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

      // XKCD Comics
      else if (cmd === "xkcd"){
        var randomNumber = getRandomNumber(0, 670)        
        // var xkcd_link = "https://xkcd.com/info.0.json"
        //     console.log("Random comic called.")
        //     fetch(xkcd_link)
        //     .then(res => res.json())
        //     .then((out) => {
        //     var xkcd_info = out;
        //     var last_num = xkcd_info.num;
        //     var randomNumber = getRandomNumber(1, last_num - 1)
        //     console.log(randomNumber)
        //     var xkcd_link = `https://xkcd.com/${randomNumber}/info.0.json`

        //     })
        //     .catch(err => { throw err });


        var xkcd_link = `https://xkcd.com/${randomNumber}/info.0.json`
        fetch(xkcd_link)
        .then(res => res.json())
        .then((out) => {
        var xkcd_info = out;
        var image = xkcd_info.img;
        msg.channel.send(image)
        var name = xkcd_info.title;
        msg.channel.send(`Comic #${randomNumber} entitled ${name} from XKCD.`)
    
        })
        .catch(err => { throw err });
        
    }

    // Computer Scienc-y/SysAdmin Trivia
    else if (cmd === "trivia"){
    

        var trivia_link = "https://opentdb.com/api.php?amount=1&category=18&difficulty=easy"
        fetch(trivia_link)
        .then(res => res.json())
        .then((out) => {
        var trivia_info = out;
        console.log(trivia_info);
        var question = trivia_info.results[0].question;
        msg.channel.send(question)
        var answer = trivia_info.results[0].answer;

        client.on('message', ans => {
            console.log(ans)
            if (ans === answer){
                msg.reply("Wow, you were right!")
            }
        });
        })
        .catch(err => { throw err });
        
    }

    else if (cmd === "iss"){
        var iss_link = "http://api.open-notify.org/iss-now.json"
        fetch(iss_link)
        .then(res => res.json())
        .then((out) => {
        var iss_info = out;
        var position = iss_info["iss_position"];
        console.log(position)
        var latitude = position["latitude"];
        var longitude = position["longitude"];
        console.log(latitude)
        console.log(longitude)

        var iss_output = "```ml" + "\n" +
        "Location of the International Space Station 🌌🌠🌃" + "\n" + `Latitude: ${longitude} \n Latitude: ${latitude}` +
        "```"
        // var iss_location = `Latitude: ${longitude} \n Latitude: ${latitude}`
        // var output = iss_header + iss_location; 

        msg.channel.send(iss_output);
        })
        .catch(err => { throw err });
    }

    else if (cmd === "astronauts"){
        // Getting Astronauts in Space
var astro_link = "http://api.open-notify.org/astros.json"
fetch(astro_link)
.then(res => res.json())
.then((out) => {
var astro_list = out;
var number_astronauts = astro_list["number"];

console.log(number_astronauts);
var astro_output = "```ml" + "\n" +
"Number of Astronauts In Space Right Now 🌌🌠🌃" + "\n" + `There are ${number_astronauts} astronauts aboard the International Space Station right now.` +
"```"
console.log(astro_output);
msg.channel.send(astro_output);
})
.catch(err => { throw err });
}

else if (cmd === "iss_passes"){
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

    else if (cmd === "translate"){
        var languages_array = ["en", "es", "it", "de", "fr"]
        var to_language = msg_content.slice(10, 12)
        var text = msg_content.slice(13, msg_content.length)
        console.log(to_language);
        
        if (languages_array.indexOf(to_language) >= 0){
            console.log("Language in array")
            var languageTranslator = createLanguageTranslator();
    
            var parameters = {
                text: text,
                source: 'en', 
                target: to_language
              };
              
              languageTranslator.translate(
                parameters,
                function(error, response) {
                  if (error){
                    console.log(error)
                    msg.reply(`Sorry, your desired language is not available at this time. 
                    Supported languages include en, fr, de, it, and es`)
                  }
                  else{
                    console.log(response);
                    var translated_text = response.translations[0].translation;
                    console.log(translated_text);
                    msg.reply(translated_text);
                  }
    
                }
              );
    
        }
        else{
            msg.reply(`Sorry, your desired language is not available at this time. 
            Supported languages include en, fr, de, it, and es`)
        }
     
    
    }
    
    else if (cmd === "identify"){
        var text = msg_content.slice(9, msg_content.length);
    
        var languageTranslator = createLanguageTranslator();
    
        languageTranslator.identify(
            {
              text: text
            },
            function(err, language) {
              if (err)  {
                console.log('error:', err);
                msg.reply(`Sorry, Watson couldn't seem to identify the language. :/`)
          
              } else {
                console.log(JSON.stringify(language, null, 2));
                var most_confident_lang = language.languages[0].language;
                var confidence = language.languages[0].confidence * 100;
                msg.reply(`IBM's Watson predicts with ${confidence}% confidence that the language is ${most_confident_lang}`);
    
    
              }
            }
          );
    }
    
    // Text Formatting Commands.
    else if (cmd === "fmt"){
        var fmt_array = msg_content.slice(4, msg_content.length);
        fmt_array = fmt_array.split(" ")
        var fmt_cmd = fmt_array[0]
        var message = msg_content.slice(5 + fmt_cmd.length, msg_content.length)
        console.log(fmt_cmd)
        console.log(message)
        var color_cmds_list = ["red", "yellow", "blue", "orange"]
        var syntax_highlighting_list = ["bash", "md", "python", "java", "kotlin", "javascript"]
        var font_cmds_list = ["old", "circular", "hex", "binary", "1337", "adv1337", "mono", "cursive", "currency"]
    
        if (color_cmds_list.indexOf(fmt_cmd)){
            // Map the colour to a specific programming language, so that Discord can syntax highlight their text, allowing them to have their message in a certain colour.
            colour = fmt_cmd;
            var colour_to_language = {"highlighted":"tex", "yellow":"css", "orange":"py"}
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
    
        else if (font_cmds_list.indexOf(fmt_cmd)){
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
    
    // Construct an EmojiPasta using regular expressions to search for matching emojis
    else if (cmd === "emojify"){
        var keys = Object.keys(emoji);
        // console.log(keywords)
    
        var msg_array_length = msg_array.length;
        // // NEED TO REVISIT BELOW LINE.
        msg_array = msg_array.slice(1, msg_array_length);
        console.log(msg_array.length);
    
        var emojip = "";
        var matched_emojis = [];
        
    
        for (var i = 0; i < msg_array.length; i += 1){
            var sub_matched_emojis = [];
             var word = msg_array[i];
             console.log("Checking" + word)
    
            
        //     console.log(emojip)
        //     msg.channel.send(emojip)
        for (var k = 0; k < keys.length; k += 1){
            var keywords = emoji[keys[k]]["keywords"];
            if (keys[k] === word){
                console.log(keys[k] + " matched " + word);
                console.log(keywords)
                sub_matched_emojis.push(keys[k])
            }
            else{
            for (var j = 0; j < keywords.length; j += 1){
    
                if (keywords[j] === word){
                    console.log(keys[k] + " matched " + word);
                    console.log(keywords)
                    sub_matched_emojis.push(keys[k])
                }
            }
        }
    
        }
        if (sub_matched_emojis.length > 0){
        // Get random matched emojis
        var randomNumber = getRandomNumber(0, sub_matched_emojis.length - 1);
        var randomEmoji = sub_matched_emojis[randomNumber]
        var emoji_md = `:${randomEmoji}:`
        emojip += ` ${word} ${emoji_md}`
        }
        else{
            emojip += ` ${word}`
        }
        
    
    
    
        }
        console.log("completed for loop")
        console.log(matched_emojis)
        console.log(emojip)
        msg.channel.send(emojip)
    
    }
    
    // Word Pyramid
    else if (cmd === "pyramid"){    
        var msg_array_length = msg_array.length;
        msg_array = msg_array.slice(1, msg_array_length);
        console.log(msg_array);
        var word_pyramid = "";
        var pyramid2 = " "
        for (var i = 0; i < msg_array.length; i += 1){
            var word = msg_array[i];
            word_pyramid += ` ${word}`;
            console.log(word_pyramid);
            pyramid2 += `\n${word_pyramid}`
        }
        msg.channel.send(pyramid2);
    } 
    else if (cmd === "reverse"){    
        var msg_array_length = msg_array.length;
        msg_array = msg_array.slice(1, msg_array_length);
        msg_string = msg_content.slice(8, msg_content.length)
        
        var reverse_string = "";
        var word;
        var split_word;
        for (var i =  msg_string.length - 1; i >= 0; i -= 1){
    
            console.log(msg_string[i])
            reverse_string += msg_string[i];
        }
        msg.channel.send(reverse_string);
    } 
    
    else if (cmd === "poke"){
        var poker = msg.author.username;
        var pokee = msg_array[1];
        console.log(poker)
        msg.channel.send(`${poker} just poked ${pokee} :eyes:`)
    }
    else if (cmd === "gift"){
        var sender = msg.author.username;
        var receiver = msg_array[1];
    
        var giftMessages = [`${sender} just sent a gift to ${receiver} :gift:`, `${receiver} just received a gift :gift: from ${sender}`]
        var randomNumber = getRandomNumber(0, giftMessages.length - 1);
        var randomMessage = giftMessages[randomNumber]
        msg.channel.send(randomMessage)
    }
    else if (cmd === "wave"){
        var sender = msg.author.username;
        var receiver = msg_array[1];
    
        msg.channel.send(`${sender} just waved at ${receiver} :wave:`)
    }
    
    else if (cmd === "imgedit"){
    
        var randomNumber = getRandomNumber(0, 250)
    
        var randomQuality = getRandomNumber(5, 100)
        var width = getRandomNumber(100, 350);
        var height = getRandomNumber(100, 350)
    
    Jimp.read("test.jpg", function (err, test) {
        if (err) throw err;
        test.resize(width, height)            // resize
         .quality(randomQuality)                 // set JPEG quality
         .greyscale()                 // set greyscale
         .write(new_image_name); // save
    
    
        });
    
        sendImage(msg, new_image_name)
    
    }
    
    else if (cmd === "sepia"){
    
    Jimp.read("test.jpg", function (err, test) {
        if (err) throw err;
        test.sepia()               
         .write(new_image_name);
        });
    
        sendImage(msg, new_image_name)
    
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
        if (msg_array.length > 1 ){
           
            var cmd = msg_array[1];
            var cmd_example = cmd + "_examples";
            var cmd_info = cmd_info_obj.commands[0][cmd];
            console.log("Definition: " + cmd_info)
            msg.channel.send("`" + cmd + "`" + " " + cmd_info)

            var examples = cmd_info_obj.examples[0][cmd_example];
            
            if (examples != ""){
                console.log(examples)
            var examples_template = "```ml" + "\n" +
            "Example Commands 👀" + "\n" +
            "\n" +
            "```" + "`" + examples + "`"
            msg.channel.send(examples_template)
            }
        }
        else {
            var help_output = ""
            var search_cmds = "`news` `population` `translate` `search` `define` `bitcoin` `acronym` `getem`"
            var space_cmds = "`neo` `earth` `iss` `astronauts` "
            var fun_cmds = "`xkcd` `qr` `!meme` `identify` `fmt` `emojify`"

            var search_header = "```ml" + "\n" +
            "Info Commands 🔍" + "\n" +
            "```"
            help_output += search_header
            help_output += search_cmds


            var space_header = "```ml" + "\n" +
            "Space Commands 🌌🌠🌃" + "\n" +
            "```"
            help_output += space_header
            help_output += space_cmds

            var fun_header = "```ml" + "\n" +
            "Fun Commands 🎲 ✨🌈" + "\n" +
            "```"
            help_output += fun_header
            help_output += fun_cmds
            var help_message = "```ml" + "\n" +
            "To get more info. on a certain command, plus examples, type `help command` where command is one of those above." + "\n" +
            "```" + "eg: `help qr`"
            help_output += help_message
            
            msg.channel.send(help_output)
            console.log(help_output)
            var examples = "```ml" + "\n" +
            "Example Commands 👀" + "\n" +
            "define dancing" + "\n" +
            "```"
        
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



function displayAcronym(request){
console.log("Display Result called.")
if (request.readyState === 4){
    console.log("Ready state is 4");
    if (request.status === 200){
        console.log("Ready state is 200.")
        console.log("RESPONSE IS: " + request.responseText.trim() )
        var message_content = request.responseText.trim()
        console.log(message_content)
        if (message_content != "0"){          
    }
}
else{
    console.log("ERROR IN RECEIVAL OF REQUEST.");
}
}
}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNumberAstronauts(){


}

function createLanguageTranslator(){
    var LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');
    var watson_username = translate_creds_obj["username"];
    var watson_pass = translate_creds_obj["password"];
    var watson_url = translate_creds_obj["url"];

    var languageTranslator = new LanguageTranslatorV2({
        username: watson_username,
        password: watson_pass,
        url : watson_url,
        headers: {
            'X-Watson-Learning-Opt-Out': 'true'
        }
    });

    return languageTranslator;
}

function searchMatchingEmojis(word){
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


function sendImage(msg, image){
    
        // Send an embed with a local image inside
        msg.channel.send('This is an embed', {
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

function getAsset(msg, nasa_id){
    var asset_link = `https://images-api.nasa.gov/asset/${nasa_id}`;
    fetch(asset_link)
    .then(res => res.json())
    .then((out) => {
        var image = out.collection.items[0].href;
      console.log(image)
      msg.channel.send(image)
    })
    .catch(err => { throw err });
}

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
// Unsplash Integration --> need to apply for an API Key.
// allow the user to get the avatar of another use.
// Oxford Dictionaries API
// HALO APIS https://developer.haloapi.com/docs/services/58acdc2e21091812784ce8c2/operations/5969689a2109180f287972a8/console
// https://api.igdb.com/
// https://exchangeratesapi.io/
// https://www.cryptocompare.com/api#-api-data-price-