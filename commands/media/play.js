const commando = require("discord.js-commando");
const fetch = require("node-fetch");
const Discord = require("discord.js");

var queue = [];
var isPlayingSong = false;

var song_dict = {
  lofi: [
    {
      name: "Starfall",
      author: "Venera's Kiss",
      author_link: "https://icons8.com/music/author/author/veneras-kiss-1"
    },
    {
      name: "Acid Summer",
      author: "Venera's Kiss",
      author_link: "https://icons8.com/music/author/author/veneras-kiss-1"
    },
    {
      name: "Peace",
      author: "Venera's Kiss",
      author_link: "https://icons8.com/music/author/author/veneras-kiss-1"
    }
  ],
  synthwave: [
    {
      name: "Activation",
      author: "Spaceinvader",
      author_link: "https://icons8.com/music/author/author/spaceinvader"
    },
    {
      name: "Escape From Reality",
      author: "Spaceinvader",
      author_link: "https://icons8.com/music/author/author/spaceinvader"
    },
    {
      name: "Memory Lane",
      author: "Spaceinvader",
      author_link: "https://icons8.com/music/author/author/spaceinvader"
    },
    {
      name: "Turismo",
      author: "Spaceinvader",
      author_link: "https://icons8.com/music/author/author/spaceinvader"
    },
    {
      name: "Lost Control",
      author: "Spaceinvader",
      author_link: "https://icons8.com/music/author/author/spaceinvader"
    },
    {
      name: "Overtake",
      author: "Spaceinvader",
      author_link: "https://icons8.com/music/author/author/spaceinvader"
    },
    {
      name: "Night Lights",
      author: "Spaceinvader",
      author_link: "https://icons8.com/music/author/author/spaceinvader"
    },
    {
      name: "Sequential Movement",
      author: "Spaceinvader",
      author_link: "https://icons8.com/music/author/author/spaceinvader"
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
        "Play music of different genres, such as electronic, synthwave, etc.,",
      details:
        "Play music of different genres, such as electronic, synthwave, etc.,",
      examples: ["play electronic", "play classical"]
    });
  }

  async run(msg, args) {
    if (args.length < 2) {
      msg.reply("You didn't specify a genre, eg: `-play synthwave`");
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
        // Check if the bot is in a voice channel in that guild already

        let guilds = this.guilds;
        console.log("GUILDS", guilds);
        let guild_id = msg.channel.guild.id;
        console.log("GUILD ID", guild_id);

        let isConnectedToVoice = msg.channel.guild.voiceConnection;
        let genre = msg_array[0];

        if (isConnectedToVoice) {
          let song = getSong(genre);

          if (isPlayingSong) {
            msg.reply(`Queued a ${genre} song.`);
            queue.push(song);
            console.log("QUEUE", queue);
          }
        } else {
          voiceChannel
            .join()
            .then(connection => {
              let song = getSong(genre);
              sendSongMesage(msg, song, randomColour);

              const dispatcher = connection.playFile(`./${song.name}.mp3`);
              isPlayingSong = true;

              dispatcher.on("end", end => {
                if (queue.length > 0) {
                  sendSongMesage(msg, queue[0], randomColour);
                  connection.playFile(`./${queue[0].name}.mp3`);
                  queue.pop();
                } else {
                  isPlayingSong = false;
                  voiceChannel.leave();
                }
              });
            })
            .catch(err => console.log(err));
        }
      }
    }

    function sendSongMesage(msg, song, randomColour) {
      // Link to song
      msg.channel.send({
        embed: {
          color: randomColour,
          title: `:fast_forward: Playing ${song.name} `,
          description: `Playing ${song.name} by [${song.author}](${
            song.author_link
          }) from [Fugue](https://icons8.com/music)`
        }
      });
    }

    function playFile(song) {}

    function getSong(genre) {
      let songs = song_dict[genre];
      console.log(songs);
      let ranNumber = getRandomNumber(0, songs.length - 1);
      let song = songs[ranNumber];
      return song;
    }

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
};
