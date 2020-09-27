require('dotenv').config();

var token = process.env.TOKEN;
var owner_discord_id = process.env.OWNER_DISCORD_ID;
var channel_id = process.env.LOGGING_CHANNEL_ID;

// NPM MODULES
const commando = require("discord.js-commando");
const path = require("path");
const oneLine = require("common-tags").oneLine;
const sqlite = require("sqlite");
sqlite.open("./database.sqlite3");

const client = new commando.Client({
  owner: owner_discord_id,
  commandPrefix: "-",
  disableEveryone: true,
  unknownCommandResponse: false
});

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var bot_prefix = "-";
client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity(
    `${bot_prefix}help | Running on ${client.guilds.cache.size} servers`
  );
});

// Error handling
client
  .on("error", console.error)
  .on("warn", console.warn)
  .on("debug", console.log);

// Bot status
client
  .on("reconnecting", () => {
    console.warn("Onyx is reconnecting...");
  })
  .on("disconnect", () => {
    console.warn("Warning! Onyx has disconnected!");
  });

// Command specific event listeners that come with the Commando module
client
  .on("commandError", (cmd, err) => {
    console.log("command error");
    if (err instanceof commando.FriendlyError) return;
    var message = `Error in command ${cmd.groupID}:${cmd.memberName}, ${err}`;
    client.channels.cache.get(channel_id).send(`@Silvia923#9909 ${message}`);
  })
  .on("commandBlocked", (msg, reason) => {
    console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ""}
			blocked; ${reason}
		`);
    msg.reply("Command has been blocked.");
  })
  .on("commandPrefixChange", async (guild, prefix) => {
    var message = `Prefix ${
      prefix === "" ? "removed" : `changed to ${prefix || "the default"}`
    } ${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.`;
    client.channels.cache.get(channel_id).send(`@Silvia923#9909 ${message}`);

    console.log(`PREFIX CHANGE REQUEST: ${prefix}`);
  })
  .on("commandStatusChange", (guild, command, enabled) => {

    var message = `Command ${command.groupID}:${command.memberName} ${
      enabled ? "enabled" : "disabled"
    } ${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.`;
    client.channels.cache.get(channel_id).send(`@Silvia923#9909 ${message}`);
  })
  .on("groupStatusChange", (guild, group, enabled) => {
    console.log(oneLine`
			Group ${group.id}
			${enabled ? "enabled" : "disabled"}
			${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
		`);
  })
  .on("message", async msg => {

    let commands = ["card", "gift", "wave", "yt", "ask", "photo", "population", "pixabay", "synonyms", "define", "old-define", "bitcoin", "emoji", "name", "qr+",
    "rsticker", "gif", "meme", "meme_templates", "sticker", "trending-gif", "word2gif", "word2sticker", "neo", "earth", "iss", "astronauts", "cats", "ascii-faces", "captcha", "xkcd", "qr", "rhyme", "reverse", 
    "pyramid", "random-case", "replace-b", "letter-em", "1337", "emojify", "binary", "card", "avatar", "wave", "poke", "info", "creator", "idea", "server", "invite"];

    if (msg.author.bot) return;
    // || msg.channel.id === silvia_channel_id
    // Check Prefix
    var guild_id = msg.channel.guild.id;
    // var row = await sqlite.get(`SELECT * FROM settings WHERE guild ="${guild_id}"`);
    var prefix;
    var message = "Message";

    if (msg.channel.type === "dm") {
      client.channels.cache.get(channel_id).send(`${msg.content}`);
    }

    if (msg.content.split(" ")[0] === "-" || msg.content.split("")[0] === "-") {
      let cmd_name = msg.content.split(" ")[0].substring(1, msg.content.length);
      console.log("cmd name", cmd_name[0]);
      if (commands.includes(cmd_name)) {
        // Logging
        message = `${msg.content} Timestamp: ${
          msg.createdTimestamp
        } Date: ${msg.createdAt}`;
        console.log(message);

        try {
          client.channels.cache.get(channel_id).send(`${message}`);
        } catch (error) {
          console.log(error);
        }
      }

    } else if (msg.mentions.has(client.user) && (msg.content.indexOf("@everyone") == -1) && (msg.content.indexOf("@here") == -1)) {
      if (msg.content.length === 21) {
        // Just Onyx was mentioned and no other text accompanied it.
        msg.reply("My prefix is -");
        msg.channel.send("You can also mention me before commands also.");
        msg.channel.send("Examples:\n @Onyx sticker tropical\n -sticker lol");
      }
      message = `Message: ${msg.content} Timestamp: ${msg.createdTimestamp} Date: ${msg.createdAt} Server Count: ${
        msg.guild.memberCount} Region: ${msg.guild.region}`;
      console.log(message);
      console.log(msg.content.length);
      try {
        client.channels.cache.get(channel_id).send(`${message}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
  });

client.on("guildCreate", guild => {
  var message = `JOINED NEW SERVER: Joined a new server called: ${
    guild.name
  } (id: ${guild.id}). This server has ${
    guild.memberCount
  } members! :D NOW IN: I'm now in ${client.guilds.cache.size} servers :D`;
  console.log(message);
  client.channels.cache.get(channel_id).send(`@Silvia923#9909 ${message}`);
  client.user.setActivity(
    `${bot_prefix}help | Running on ${client.guilds.cache.size} servers`
  );

  guild.owner.send(
    "I'm honoured to have been added to your server. ^.^ \n \nI come with over 50 media, fun, search, and social commands.\nHere's a quick getting started guide and summary of how to get started."
  );
  var colour_array = [
    "1996",
    "7003",
    "1792",
    "1858",
    "1088",
    "1609",
    "6150"
  ];
  var randomNumber = getRandomNumber(0, colour_array.length - 1);
  var randomColour = colour_array[randomNumber];

  guild.owner.send({
    embed: {
      color: randomColour,
      // author: {
      //     name: "../../media/onyx.jpg",
      //     icon_url: "../../media/onyx.jpg"
      // },
      title: `A Quick Getting Started Guide`,
      fields: [
        {
          name: "My Prefixes",
          value: "My default prefixes are `-` and `@Onyx#4347`"
        },
        {
          name: "Seeing All Of My Commands",
          value:
            "In this DM, you can see all of my commands by typing `help` and you can run commands in this DM by typing `command` (I don't require any prefix in DMs)."
        },
        {
          name: ":film_frames: Watch YouTube Videos",
          value:
            "If you want to search for YouTube videos, just type yt or -yt in a server, accompanied by keywords.\nEg: `-yt greyhound swedish house mafia`\nThis is one of Onyx's most popular commands!"
        },
        {
          name: ":star: React With GIFs or Stickers",
          value:
            "React to server drama or stories with GIFS and/or stickers. Just type -sticker or -gif, along with keywords."
        },
        {
          name: "See All My Commands",
          value:
            "Visit my [official website](https://silvia-odwyer.github.io/Onyx-Discord-Bot-Website/), for all my commands! ^^ <3"
        },
        {
          name: "Getting Help & Support",
          value:
            "Have a bug to report? Want to chat to Onyx's maintainer? Join [Onyx's Support Server](https://discord.gg/cSWHaEK), a fun community that gets insider access to Onyx's development. \n Or add @Silvia923#9909 on Discord, I'm always here to chat."
        }
      ],
      footer: {
        text: "Coded by Silvia923#9909 <3"
      }
    }
  });
});

client.on("guildDelete", guild => {
  var message = `REMOVAL: Bot has been removed from the following server: ${
    guild.name
  } (id: ${guild.id})`;
  console.log(message);
  client.user.setActivity(
    `${bot_prefix}help | Running on ${client.guilds.size} servers`
  );
  client.channels.cache.get(channel_id).send(`@Silvia923#9909 ${message}`);
  
});

client.on("guildMemberAdd", member => {
  // image welcoming coming soon
});

client
  .setProvider(
    sqlite
      .open(path.join(__dirname, "database.sqlite3"))
      .then(db => new commando.SQLiteProvider(db))
  )
  .catch(console.error);

client.registry
  .registerDefaultTypes()

  .registerGroups([
    ["util", "Util"],
    [
      "media",
      "Media commands: Search for stickers & GIFs, make memes, make qr codes/captchas, etc.,"
    ],
    [
      "fun",
      "Fun commands: All sorts of entertaining commands can be found here. "
    ],
    [
      "search",
      "Search commands: Search YouTube, ask Onyx questions, get answers to anything, get data, definitions, etc.,"
    ],
    [
      "message_formatting",
      "Format your messages, translate them to 1337, binary, emojipastas, and more."
    ],
    [
      "social",
      "Social commands: Get avatars, wave and poke people. More on the way."
    ],
    [
      "space",
      "Space commands: Get live NASA footage, ISS coordinates, and space imagery."
    ],
    [
      "meta",
      "Meta commands: Get info about your server, about Onyx, who coded her, etc.,"
    ]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({ help: false })
  .registerCommandsIn(path.join(__dirname, "commands"));

client.login(token);
