const commando = require("discord.js-commando");
const fetch = require("node-fetch");
const Discord = require("discord.js");

var song_dict = {
  lofi: [
    {
      name: "Starfall",
      author: "Venera's Kiss",
      author_link: "https://icons8.com/music/author//author/veneras-kiss-1"
    },
    {
      name: "Acid Summer",
      author: "Venera's Kiss",
      author_link: "https://icons8.com/music/author//author/veneras-kiss-1"
    },
    {
      name: "Peace",
      author: "Venera's Kiss",
      author_link: "https://icons8.com/music/author//author/veneras-kiss-1"
    }
  ],
  synthwave: [
    {
      name: "Activation",
      author: "Spaceinvader",
      author_link: "https://icons8.com/music/author//author/spaceinvader"
    },
    {
      name: "Escape From Reality",
      author: "Spaceinvader",
      author_link: "https://icons8.com/music/author//author/spaceinvader"
    }
  ]
};

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
    if (args == "") {
      msg.reply("You didn't specify a genre, eg: `-play electronic`");
    } else {
      let msg_array = args.split(" ");

      var colour_array = [
        "1211996",
        "3447003",
        "13089792",
        "16711858",
        "1088163",
        "16098851",
        "6150962"
      ];
      var randomNumber = getRandomNumber(0, colour_array.length - 1);
      var randomColour = colour_array[randomNumber];

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
            let genre = msg_array[0];
            let songs = song_dict[genre];
            console.log(songs);
            let ranNumber = getRandomNumber(0, songs.length - 1);
            let song = songs[ranNumber];

            const dispatcher = connection.playFile(`./${song.name}.mp3`);

            // Link to song
            msg.channel.send({
              embed: {
                color: randomColour,
                title: `:fast_forward: Playing ${song.name} `,
                description: `Playing ${song.name} by [${song.author}](${song.author_link}) from [Fugue](https://icons8.com/music)"`,
                footer: {
                  text: "Coded by Silvia923#9909 <3"
                }
              }
            });

            dispatcher.on("end", end => voiceChannel.leave());
          })
          .catch(err => console.log(err));
      }
    }

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
};
