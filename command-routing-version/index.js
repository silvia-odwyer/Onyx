/* eslint-disable no-console */
const commando = require('discord.js-commando');
const path = require('path');
const oneLine = require('common-tags').oneLine;
const sqlite = require('sqlite');

let token_obj = require(`token.json`);
var token = token_obj["token"];

let owner_id_obj = require(`owner_discord_id.json`);
var owner_discord_id = owner_id_obj["owner_discord_id"]

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


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
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
client
    .on('commandError', (cmd, err) => {
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
    });

client.setProvider(
	sqlite.open(path.join(__dirname, 'database.sqlite3')).then(db => new commando.SQLiteProvider(db))
).catch(console.error);

client.registry
	.registerGroups([['math', 'Math'], ['util', "Util"], ["media", "Media commands: YouTube, meme creation, GIF captioning, getting comics, search images, etc.,"],
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
