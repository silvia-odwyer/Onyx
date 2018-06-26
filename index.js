let token_obj = require(`token.json`);
var token = token_obj["token"];
let silvia_channel_id_obj = require(`silvia_channel_id.json`);
var silvia_channel_id = silvia_channel_id_obj["silvia_channel_id"];
let owner_id_obj = require(`owner_discord_id.json`);
var owner_discord_id = owner_id_obj["owner_discord_id"]
var report_channel = require("report_channel.json")
var channel_id = report_channel["channel"]
// NPM MODULES
const commando = require('discord.js-commando');
const path = require('path');
const oneLine = require('common-tags').oneLine;
const sqlite = require('sqlite');
sqlite.open("./database.sqlite3");var connection;
var sql2;

function handleDisconnect() {
	connection = mysql.createConnection(db_config); // Recreate the connection, since
	// the old one cannot be reused.

	connection.connect(function (err) {              // The server is either down
		if (err) {                                     // or restarting 
			console.log('error when connecting to db:', err);
			setTimeout(handleDisconnect, 2000); // Introduce a delay before attempting to reconnect,
		}
	});

	connection.on('error', function (err) {
		console.log('db error', err);
		if (err.code === 'PROTOCOL_CONNECTION_LOST') {
			handleDisconnect();
		} else {
			throw err;
		}
	});
}

handleDisconnect();

const client = new commando.Client({
	owner: owner_discord_id,
	commandPrefix: '-',
	disableEveryone: true,
	unknownCommandResponse: false
});

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
var bot_prefix = "-"
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
	client.user.setActivity(`${bot_prefix}help | Running on ${client.guilds.size} servers`);
	// client.user.setActivity(`${bot_prefix}help | Now with sticker & GIF cmds!`);
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
	var message = `Error in command ${cmd.groupID}:${cmd.memberName}, ${err}`;
	client.channels.get(channel_id).send(`@Silvia923#9909 ${message}`)
})
	.on('commandBlocked', (msg, reason) => {
		console.log(oneLine`
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
		msg.reply("Command has been blocked.")

	})
	.on('commandPrefixChange', async (guild, prefix) => {
		var message = `Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`} ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.`;
		client.channels.get(channel_id).send(`@Silvia923#9909 ${message}`);

		// Check if the guild's prefix exists
		var guild_id = guild.id;
		var check = await sqlite.get(`SELECT * FROM settings WHERE guild ="${guild_id}"`);

		var sql = "CREATE TABLE IF NOT EXISTS custom_prefixes (guild_id VARCHAR(255), custom_prefix VARCHAR(255))";
		connection.query(sql, function (err, result) {
			if (err) throw err;
		});
		var json_encoded_prefix = `"prefix":"${prefix}"`;
		// await connection.query("INSERT INTO custom_prefixes (guild_id, custom_prefix) VALUES (?, ?)", [guild_id, json_encoded_prefix]);

		// var delete_cmd = "DELETE FROM custom_prefixes";

		// connection.query(delete_cmd, function (err, result, fields) {
		// 	if (err) throw err;
		//   });
		sql2 = `SELECT custom_prefix FROM custom_prefixes WHERE guild_id = ${guild_id}`;

		connection.query(sql2, function (err, result, fields) {
			if (err) throw err;
			console.log(result);
			// // If result is found 
			if (result.length > 0) {
				console.log("Found MATCHING RESULT");
				var custom_prefix_res = result[0].custom_prefix;
				console.log(custom_prefix_res);

				var update = `UPDATE custom_prefixes SET custom_prefix = '${prefix}' WHERE guild_id = '${guild_id}'`;

				connection.query(update, function (error, result, fields) {
					if (error) throw error;
					console.log("1 record updated successfully.");
				});
			}
			else {
				console.log("No custom prefix found for this server");
				var sql1 = `INSERT INTO custom_prefixes (guild_id, custom_prefix) VALUES (${guild_id}, ${prefix})`;
				connection.query(sql1, function (err, result) {
					if (err) throw err;
					console.log("1 record inserted");
				});
			}
		});

		// var result_cleardb = await connection.query(`SELECT * FROM custom_prefixes WHERE guild_id = ${guild_id}`);
		// console.log(result_cleardb);


		// If undefined, then no special prefixes corresponding to that server were found.
		// if (check === undefined) {
		// 	console.log("Custom prefix does not exist.");

		// 	await sqlite.run("INSERT INTO settings (guild, settings) VALUES (?, ?)", [guild_id, json_encoded_prefix]);
		// }
		// else {
		// 	console.log("Custom prefix does exist.");

		// 	var inputData = [guild_id, json_encoded_prefix];
		// 	// await sqlite.run(`UPDATE settings WHERE guild = "${guild_id}" SET settings AS ${json_encoded_prefix}`, [guild_id, json_encoded_prefix]);
		// 	await sqlite.run("UPDATE settings SET settings=? WHERE guild=?", inputData);

		// }

		// var check2 = await sqlite.get(`SELECT * FROM settings WHERE guild ="${guild_id}"`);
		// var settings = check2.settings;
		// var jsonSettings = JSON.parse(settings);
		// prefix = jsonSettings.prefix;
		console.log(`PREFIX NOW SET TO: ${prefix}`);

	})
	.on('commandStatusChange', (guild, command, enabled) => {
		var message = `Command ${command.groupID}:${command.memberName} ${enabled ? 'enabled' : 'disabled'} ${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.`;
		client.channels.get(channel_id).send(`@Silvia923#9909 ${message}`)

	})
	.on('groupStatusChange', (guild, group, enabled) => {
		console.log(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('message', async msg => {
		if (msg.author.bot) return;
		// || msg.channel.id === silvia_channel_id
		// Check Prefix
		var guild_id = msg.channel.guild.id
		// var row = await sqlite.get(`SELECT * FROM settings WHERE guild ="${guild_id}"`);
		var prefix;

		// // If undefined, then no special prefixes corresponding to that server were found.
		// if (row === undefined) {
		// 	prefix = client.commandPrefix;
		// }
		// else {
		// 	var settings = row.settings;
		// 	var jsonSettings = JSON.parse(settings);
		// 	prefix = jsonSettings.prefix;
		// }
		// console.log(`Server: ${guild_id} Prefix: ${prefix}`);
		sql2 = `SELECT custom_prefix FROM custom_prefixes WHERE guild_id = ${guild_id}`;

		connection.query(sql2, function (err, result, fields) {
			if (err) throw err;
			// // If result is found 
			if (result.length > 0) {
				prefix = result[0].custom_prefix;
			}
			else if (result.length < 1){
				prefix = client.commandPrefix;
			}

			if (msg.content === "-help") {
				msg.reply("My custom prefix for this server is: " + prefix);
				msg.channel.send("Type " + prefix + "help for a full list of commands.")
			}
	
			if ((msg.content.split(" ")[0] != prefix || msg.content.split(" ")[0] != "@Onyx") && msg.content != "-help") {
				console.log(`${msg.content.split(" ")[0]}Prefix not equal to ${prefix}`)
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

	
	});

client.on("guildCreate", guild => {
	var message = `JOINED NEW SERVER: Joined a new server called: ${guild.name} (id: ${guild.id}). This server has ${guild.memberCount} members! :D`;
	console.log(message);
	client.channels.get(channel_id).send(`@Silvia923#9909 ${message}`)
	client.user.setActivity(`${bot_prefix}help | Running on ${client.guilds.size} servers`);

	guild.owner.send("I'm honoured to have been added to your server. ^.^ \n \nI come with over 50 media, fun, search, and social commands.\nHere's a quick getting started guide and summary of how to get started.")
	var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
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
			fields: [{
				name: "Changing My Prefix In Your Server",
				value: "My default prefixes are `-` and `@Onyx#4347`, but you can change my prefix to whatever you like using `-prefix`.\n Just go to one of your server's channels, and type `-prefix [your desired prefix]`. \n For example, if you wanted to change to ! you'd type `-prefix !`"
			},
			{
				name: "Seeing All Of My Commands",
				value: "In this DM, you can see all of my commands by typing `help` and you can run commands in this DM by typing `command` (I don't require any prefix in DMs)."
			},
			{
				name: "Getting Help & Support",
				value: "Have a bug to report? Want to chat to Onyx's maintainer? Join [Onyx's Support Server](https://discord.gg/cSWHaEK), a fun community that gets insider access to Onyx's development. \n Or add @Silvia923#9909 on Discord, I'm always here to chat."
			}
			],
			footer: {
				text: "Coded by Silvia923#9909 <3"
			}
		}

	})

});

client.on("guildDelete", guild => {
	var message = `REMOVAL: Bot has been removed from the following server: ${guild.name} (id: ${guild.id})`
	console.log(message);
	client.user.setActivity(`${bot_prefix}help | Running on ${client.guilds.size} servers`);
	client.channels.get(channel_id).send(`@Silvia923#9909 ${message}`)

});

client.on("guildMemberAdd", member => {
	// image welcoming coming soon
});

client.setProvider(
	sqlite.open(path.join(__dirname, 'database.sqlite3')).then(db => new commando.SQLiteProvider(db))
).catch(console.error);

client.registry
	.registerDefaultTypes()

	.registerGroups([['util', "Util"], ["media", "Media commands: Search for stickers & GIFs, make memes, make qr codes/captchas, etc.,"],
	["fun", "Fun commands: All sorts of entertaining commands can be found here. "],
	["search", "Search commands: Search YouTube, ask Onyx questions, get answers to anything, get data, definitions, etc.,"],
	["message_formatting", "Format your messages, translate them to 1337, binary, emojipastas, and more."],
	["social", "Social commands: Get avatars, wave and poke people. More on the way."],
	["space", "Space commands: Get live NASA footage, ISS coordinates, and space imagery."],
	["meta", "Meta commands: Get info about your server, about Onyx, who coded her, etc.,"],
	])
	.registerDefaultGroups()
	.registerDefaultCommands({ help: false })
	.registerCommandsIn(path.join(__dirname, 'commands'));

client.login(token);
