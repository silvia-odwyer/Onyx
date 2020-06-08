const commando = require("discord.js-commando");
const fetch = require("node-fetch");
const giphy_api_key = process.env.GIPHY_API_KEY;

module.exports = class GiftCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "gift",
      aliases: [],
      group: "social",
      memberName: "gift",
      description: "Send someone a cool GIFt :)",
      details: "Send someone a cool GIFt :)",
      examples: ["gift @someone"]
    });
  }

  async run(msg, args) {
    if (args.length > 0) {
      let msg_array = args.split(" ");
      let message = "";
      var user = "";
      let receiver = msg.mentions.members.first();

      console.log(receiver.toString());

      msg.mentions.members.forEach(function(guildMember, guildMemberId) {
        console.log(guildMember.user.username);
        receiver = guildMember.user;
      });

      let sender = msg.message.author;

      let limit = 20;

      let options = ["gifs", "stickers"];
      let ran_number = getRandomNumber(0, options.length - 1);

      let option = options[ran_number];

      let giphy_link = `https://api.giphy.com/v1/gifs/trending?rating=g&api_key=${giphy_api_key}&limit=${limit}`;
      // GET A GIPHY GIF
      fetch(giphy_link)
        .then(res => res.json())
        .then(out => {
            console.log(out);
          if (out.data.length === 0) {
            msg.reply(
              "There was a problem, something went wrong. Try again, maybe? :D"
            );
          } 
          
          else {
            let randomNumber = getRandomNumber(0, out.data.length - 1);

            let giphy_gif_link = out.data[randomNumber].bitly_gif_url;
            console.log("GIPHY LINK: ", giphy_gif_link);

            if (giphy_gif_link == "") {
                let giphy_gif_link = out.data[randomNumber].embed_url;
            }

            let member_to_send = msg.mentions.members.first();
            let messages = [`Ooh, look! ${receiver} received a GIFt from ${sender}!\n(It's trending on GIPHY btw)`, `${receiver} just received a trending :earth_africa: GIFt (get the pun? :wink:) from ${sender}!`, `This GIFt is trending :chart_with_upwards_trend: right now on GIPHY! From ${sender} to you ${receiver}`, `Hey ${receiver}! You received a trending :earth_americas: GIFt from ${receiver} :open_mouth:`]
            
            let ranMessage = messages[getRandomNumber(0, messages.length - 1)];
            msg.channel.send(ranMessage);
            msg.channel.send(giphy_gif_link);
          }
        })
        .catch(err => {
          throw err;
        });
    } 
    
    else {
      // User didn't enter any keywords
      msg.reply(
        "Try mentioning a person eg: `" +
          `${this.client.commandPrefix}` +
          " @someone`"
      );
    }

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
};
