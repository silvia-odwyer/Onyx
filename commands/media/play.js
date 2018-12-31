const commando = require("discord.js-commando");
const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = class PlayCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "play",
      aliases: [],
      group: "media",
      memberName: "play",
      description:
        "Play music of different genres, such as electronic, classical, etc.,",
      details:
        "Play music of different genres, such as electronic, classical, etc.,",
      examples: ["play electronic", "play classical"]
    });
  }

  async run(msg, args) {
    let msg_array = args.split(" ");
    let message = "";
    var user = "";

    // Get the voice channel of the member.
    var voiceChannel = msg.member.voiceChannel;
    console.log(voiceChannel);

    if (voiceChannel === undefined) {
      msg.reply(
        "You need to join a Voice Channel first. Then type your command again."
      );
    } else {
        voiceChannel
        .join()
        .then(connection => {
          const dispatcher = connection.playFile("./silencekillsbass95.wav");
  
          dispatcher.on("end", end => voiceChannel.leave());
        })
        .catch(err => console.log(err));
    }

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
};
