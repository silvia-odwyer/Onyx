# NodeJS Discord Bot (Onyx/AzuraBot)
Make electronic music, memes, edit images, get answers to everything, and more, with Onyx, a Discord bot coded using Discord.JS and Node.JS.

Onyx has over thirty commands, including those for:
- meme generation
- image editing
- music production
- fetching info/live imagery from NASA
- crypto support
- interacting with IBM's Watson API 
- getting information on any topic

A complete list of currently working commands can be found below.

## Invite To Your Server
[Just click here to invite Onyx to your server!](https://discordapp.com/oauth2/authorize?&client_id=444948120573313024&scope=bot&permissions=0)

![Ask Onyx for Acronym Meanings](https://github.com/silvia-odwyer/NodeJS-Discord-Bot/blob/master/acronym_example.gif "Ask Onyx for Acronym Meanings")

## Test Onyx Out In This Support Server
If you want to test Onyx out before adding her to your server, just join this server, and leave when you want.
Onyx runs 24/7, so she'll always be online. :D

## Commands

### Make Electronic Music
You can make your own electronic music just by typing commands, and connecting to a Voice Channel.
Onyx comes with a series of built-in, royalty-free samples, which you can play through a Voice Channel. You can then mix samples together to create songs, and have everyone listen to them.

Firstly, go through some of the samples available by typing `music_cmds`.
Before playing any samples, make sure you're connected to a Voice Channel beforehand, because Onyx will join your Voice Channel then.

Each of the links to the samples are provided when you play each one, so you can go and download the samples at LooperMan.com.

### Music Production Commands

| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| ---------: |
| music_cmds         | Get a list of all samples available to play. (Make sure you've joined a voice channel first.)      |     |
| futurebass           | Futurebass sample. To play this sample, just type the command.                 |      |
| fx    | The `fx` command overlays two samples over one another. In the example to the right, fx combines the two samples `futurebass` and `build` together, overlaying their audio upon one another.                       |  fx future bass build    |

### Space/Astronomy/NASA Commands

| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| ---------: |
| earth         | See live footage of Earth, as seen from the NOAA DSCVRY probe.                                   |     |
| neo           | Find out how many Near-Earth objects are near Earth right now.                              |      |
| astronauts    | Find out how many astronauts are aboard the International Space Station.                         |      |
| iss           | Get the location of the International Space Station. Updates every second.                    |      |

### Search Commands
| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| --------- |
| search        | Get all the synonyms for a word.                                                                 |  `search azure `   |
| bitcoin       | Retrieve today's bitcoin rates.                                                                  |      |
| acronym       | Get the meaning of an acronym. --> acronym lol                                                   | `acronym rofl` |
| define        | Get an old-style definition of a word like it's 1859.                                            |  `define dancing`  |
| translate     | Translate to a variety of languages, including French (fr), Italian (it), German (de), and more! | `translate fr How are you?`|
| identify      | Identify what language a piece of text is in, plus the result includes Watson AI's confidence levels too! |` identify Hello there, how are you?` |
| getem         | Search for emojis related to a certain search term. Get happy emojis, cute emojis, hearts, etc.| `getem hearts `  |
| population    | Get the total number of humans on Earth right now.                                               |      |

### Image Commands
| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| --------- |
| meme          | Make a meme, as so !meme waitingskeleton top_text-bottom_text                                    |     |
| slowblur      | Add a gentler blur effect to an image. |    |
| extremeblur   | Add a stronger blur effect to an image.|     |
| dotify        |Add this cool effect to an image.|      |
| invert        | Invert an image, so that it's mirror image is seen. |    |
| flip          | Flip an image, so that its mirror image will be displayed. |      |
| sepia         | Add a sepia effect to an image (image URLs supported, as well as local images).|      |
| imgedit       | Add random effects and filters to an image. |      |

### Fun Commands
| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| --------- |
| qr            | Generate a qr code with two HEX colours and your message encoded as a QR code.                   |  `qr fff 000 This is a qr-encoded message`|
| xkcd          | Get a randomized XKCD comic.                                                                     |      |
|pls react      | Get a tonload of reactions for no reason. 👀 🤣 😃 😄 😅 😆 😉                                |     |
| emojify       | Convert your message into an emojipasta. Adds emojis related to words found within the message. | `emojify So I went shopping today, it was pretty fun actually! Haha, I got a cute dress btw.`     |

### Message Formatting Commands
| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| --------- |
| randomCase    |Randomize every letter in a sentence's case, so iT tUrnS oUt lIke ThIS.| `randomCase this is a sample sentence`   |
| letterEm      | Convert all the letters in a message to emoji letters. |  |
| replaceB      | Replace all the b's in a message with the 🅱️ emoji. |   |
| fmt           | Format your message so that it displays in a certain font or colour, or is encoded in binary, 1337, etc |      |
| pyramid       | Convert a sentence into a word pyramid. Try it out! |      |
| reverse       | Reverse your message. | `reverse Hello There`|


### Social Commands
| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| ---------: |
| avatar        | See your, or someone else's avatar.                              |      |
| wave          | Wave at another user! |      |
| poke          | Poke another user! |      |
| gift          | Send a gift to another user! |      |
| setPresence   | Change the bot's playing/presence message to another message (not user-defined).|     |


## Features On The Way
I am applying for API keys for the following APIs, so that's why their development is slightly delayed.
- YouTube integration, where users can search for videos, and the first one is sent to the channel.
- Wolfram|Alpha communication, where Onyx can answer virtually any question, thanks to Wolfram Alpha's decades long research and innovation.
- Movie DB search and retrieval for movies and their ratings, actors, etc.,
- Spotify: Provides meta data on various songs.
- Google Knowledge Graph integration
- Oxford Dictionaries definitions and synonyms.
- Unsplash Integration: Allow users to search for any images in the public domain.
- Basic moderation commands, including kicking users, detecting spam, etc.,


    "xkcd_examples" : "xkcd today \n xkcd",

    "fmt_examples" : "fmt binary this is in binary \n fmt mono this is in monospaced font \n fmt red This message is displayed in red.",

