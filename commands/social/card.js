const commando = require("discord.js-commando");
const fetch = require("node-fetch");
const fs = require("fs");

const Jimp = require("jimp");

module.exports = class eCardCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "card",
      aliases: [],
      group: "social",
      memberName: "card",
      description: "Send someone a cool card with a message of your choice. :)",
      details: "Send someone a cool card with a message of your choice. :)",
      examples: ["card @someone"]
    });
  }

  async run(msg, args) {
    if (args.length > 0) {
      let msg_array = args.split(" ");
      var user = "";
      let receiver = msg.mentions.members.first();

      msg.mentions.members.forEach(function(guildMember, guildMemberId) {
        console.log(guildMember.user.username);
        receiver = guildMember.user.username;
      });

      console.log(receiver.toString());

      msg_array.shift();
      let message = msg_array.join(" ");

      console.log("MSG:", message);

      sendCardJimp(msg.author, receiver, message);
    } else {
      // User didn't enter any keywords
      msg.reply(
        "Try mentioning a person and appending a message, eg: `" +
          `${this.client.commandPrefix}` +
          " @someone Happy Birthday!`"
      );
    }

    function sendCardJimp(sender, receiver, message) {
      let images = [
        "winter2.PNG",
        "winter3.PNG",
        "winter4.PNG",
        "winter5.PNG",
        "winter6.PNG"
      ];
      let ran_num = getRandomNumber(0, images.length - 1);
      let image = images[ran_num];

      Jimp.read(image, (err, image) => {
        if (err) throw err;

        Jimp.loadFont(Jimp.FONT_SANS_16_WHITE).then(font => {
          image.resize(300, 300);

          image.print(font, 20, 150, `To: ${receiver}`);
          image.print(font, 20, 200, `From: ${sender.username}`);
          image.print(font, 20, 240, `Message: ${message}`);

          image.write("./card.jpg"); // save

          msg.channel.send(`${receiver} just received a card!`, {
            files: ["./card.jpg"]
          });
        });
      });
    }

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
};
