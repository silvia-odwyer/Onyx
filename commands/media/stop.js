const commando = require("discord.js-commando");

module.exports = class PlayCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: "stop",
      aliases: [],
      group: "media",
      memberName: "stop",
      description:
        "Stop the playing of music on a voice channel. Also deletes any queued songs.",
      details:
        "Stop the playing of music on a voice channel.",
      examples: ["stop"]
    });
  }

  async run(msg, args) {
    var voiceChannel = msg.member.voiceChannel;
    if (voiceChannel == undefined) {
        msg.reply("You must join the voice channel you want me to leave.")
    }

    else {
        voiceChannel.leave();
    }

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
};
