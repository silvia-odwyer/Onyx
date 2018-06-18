const commando = require('discord.js-commando');
const path = require('path');
const oneLine = require('common-tags').oneLine;
const sqlite = require('sqlite');
sqlite.open("./database.sqlite3");

let token_obj = require(`token.json`);
var token = token_obj["token"];
let silvia_channel_id_obj = require(`silvia_channel_id.json`);
var silvia_channel_id = silvia_channel_id_obj["silvia_channel_id"];

let owner_id_obj = require(`owner_discord_id.json`);
var owner_discord_id = owner_id_obj["owner_discord_id"]
var report_channel = require("report_channel.json")
var channel_id = report_channel["channel"]
const client = new commando.Client({
	owner: owner_discord_id,
	commandPrefix: '-'
});

// Command Categories
var search_cmds = " `yt` `ask` `photo` `news` `population` `pixabay` `translate` `search` `define` `oldDefine` `bitcoin` `acronym` `getem` `name` `rhyme`"
var space_cmds = "`neo` `earth` `iss` `astronauts` "
var fun_cmds = " `cats` `asciiFaces` `captcha` `xkcd` `qr` `qr+` `meme` `identify` `emojify` `cs_jokes` `pls react`"
var fmt_cmds = "`reverse` `pyramid` `randomCase` `replaceB` `letterEm` `1337` `adv1337` `binary`"
var social_cmds = "`wave` `poke`"
var music_production_cmds = "`futurebass`, `fx`, `trapdrums`, `riser`, + other samples [type `-music_cmds` for samples]"
var meta_cmds = "`info` `creator` `idea` `server` `invite`"

var bot_prefix = "-"
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
		// client.user.setActivity(`${bot_prefix}help | Running on ${client.guilds.size} servers`);
		client.user.setActivity(`${bot_prefix}help | Now with sticker & GIF cmds!`);
});

// Error handling
client
	.on('error', console.error)
	.on('warn', console.warn)
	.on('debug', console.log);

// Bot status
client.on('reconnecting', () => { console.warn('Onyx is reconnecting...'); })
	.on('disconnect', () => { console.warn('Warning! Onyx has disconnected!'); });


// Command specific event listeners that come with the Commando module
client.on('commandError', (cmd, err) => {
		if (err instanceof commando.FriendlyError) return;
		console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on('commandBlocked', (msg, reason) => {
		console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
	})
	.on('commandPrefixChange', (guild, prefix) => {
		console.log(oneLine`
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);

	})
	.on('commandStatusChange', (guild, command, enabled) => {
		console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		console.log(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('message', async msg => {
		if (msg.author.bot || msg.channel.id === silvia_channel_id) return;


		// Check Prefix
		var guild_id = msg.channel.guild.id
		console.log(guild_id)
		var row = await sqlite.get(`SELECT * FROM settings WHERE guild ="${guild_id}"`);
		var prefix;

		// If undefined, then no special prefixes corresponding to that server were found.
		if (row === undefined) {
			prefix = client.commandPrefix;
		}
		else {
			var settings = row.settings;
			var jsonSettings = JSON.parse(settings);
			prefix = jsonSettings.prefix;
		}

		if (msg.content === "-help"){
			msg.reply("My custom prefix for this server is: " + prefix);
			msg.channel.send("Type : " + prefix + "help for a full list of commands.")
		}

		if (msg.content[0] != prefix || msg.content != "-help") {
			console.log("Not equal to prefix.")
			console.log(prefix)
			console.log(msg.content[0])
			return;
		}
		else {

			// Logging
			var message = `Message: ${msg.content} Author: ${msg.author} Timestamp: ${msg.createdTimestamp} Date: ${msg.createdAt} Server: ${msg.guild.name} Server Count: ${msg.guild.memberCount} Region: ${msg.guild.region}`
			console.log(message)
			try {
				// fs.appendFile('test.txt', `\nMessage Content: ${msg.content} Author: ${msg.author} Timestamp: ${msg.createdTimestamp} Date: ${msg.createdAt} Server: ${msg.guild.name} Server Count: ${msg.guild.memberCount} Region: ${msg.guild.region}`, (err) => {
				// 	if (err) throw err;
				// });

				client.channels.get(channel_id).send(`@Silvia923#9909 ${message}`)
			}
			catch (error) {
				console.log(error)
			}
		}
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

client.on("guildMemberAdd", member => {
	// image welcoming coming soon
});

client.setProvider(
	sqlite.open(path.join(__dirname, 'database.sqlite3')).then(db => new commando.SQLiteProvider(db))
).catch(console.error);

client.registry
	.registerGroups([['util', "Util"], ["media", "Media commands: YouTube, meme creation, GIF captioning, getting comics, search images, etc.,"],
	["fun", "Fun commands: Misc commands with no category. Take a look! "],
	["search", "Search commands: Ask Onyx questions, get answers to anything, get data, etc.,"],
	["message_formatting", "Format your messages."],
	["social", "Social commands!"],
	["space", "Space commands: Get live NASA footage, ISS coordinates, and space imagery."],
	["meta", "Meta commands: Get info about your server, about Onyx, who coded her, etc.,"],
	])
	.registerDefaults()
	.registerTypesIn(path.join(__dirname, 'types'))
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.login(token);
