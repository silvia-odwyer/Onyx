# NodeJS Discord Bot
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

## UPDATES
- Captcha generation now possible! `-captcha Only humans can read this.`
- Get rhyming words. `-rhyme red`
- Overlaying of audio fully fixed.
- Check how popular your name is with `-name [your name]`

## Invite To Your Server
[Just click here to invite Onyx to your server!](https://discordapp.com/oauth2/authorize?&client_id=444948120573313024&scope=bot&permissions=0)

## Test Onyx Out In This Support Server
If you want to test Onyx out before adding her to your server, [just join this server](https://discord.gg/cSWHaEK), and leave when you want.
Onyx runs 24/7, so she'll always be online. :D

## Commands
NB: Prepend a hyphen before any of the commands below.

### Make Electronic Music
You can make your own electronic music just by typing commands, and connecting to a Voice Channel.
Onyx comes with a series of built-in, royalty-free samples, which you can play through a Voice Channel. 

Right now, you can play samples, and overlay/combine samples together.

### Music Production Commands

| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| ---------: |
| music_cmds         | Get a list of all samples available to play. (Make sure you've joined a voice channel first.)      |   `-music_cmds`  |
| futurebass           | Futurebass sample. To play this sample, just type the command.                 |   `-futurebass`   |
| fx    | The `fx` command overlays two samples over one another. In the example to the right, fx combines the two samples `futurebass` and `build` together, overlaying their audio upon one another.                       |  `-fx futurebass build`    |

### Space/Astronomy/NASA Commands

| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| ---------: |
| earth         | See live footage of Earth, as seen from the NOAA DSCVRY probe.                                   |   `-earth`  |
| neo           | Find out how many Near-Earth objects are near Earth right now.                              |    `-neo`  |
| astronauts    | Find out how many astronauts are aboard the International Space Station.                         |    `-astronauts`  |
| iss           | Get the location of the International Space Station. Updates every second.                    |    `-iss`  |

![Get Live Earth Footage](https://github.com/silvia-odwyer/NodeJS-Discord-Bot/blob/master/earth_example.gif "Get live footage of Earth from NASA!")

### Search Commands
| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| --------- |
| search        | Get all the synonyms for a word.                                                                 |  `-search azure `   |
| bitcoin       | Retrieve today's bitcoin rates.                                                                  |    `-bitcoin`  |
| acronym       | Get the meaning of an acronym. --> acronym lol                                                   | `-acronym rofl` |
| define        | Get an old-style definition of a word like it's 1859.                                            |  `-define dancing`  |
| translate     | Translate text to a variety of languages, including French (fr), Italian (it), German (de), and more! | `-translate fr How are you?`|
| identify      | Identify what language a piece of text is in, plus the result includes Watson AI's confidence levels too! |`-identify Hello there, how are you?` |
| getem         | Search for emojis related to a certain search term. Get happy emojis, cute emojis, hearts, etc.| `-getem hearts `  |
| population    | Get the total number of humans on Earth right now.                                               |   `-population`   |
| rhyme    |  Get words that rhyme with a word of your choice.                                  |   `-rhyme red`   |

### Image Commands
| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| --------- |
| meme          | Make a meme, using a variety of templates. Separate the meme's top and bottom text using a hyphen.  | `-meme waitingskeleton This is top text-This is bottom text`    |
| meme_templates      | Get a list of all meme types you can make. |  `-meme_templates`   |
<!-- | slowblur      | Add a gentler blur effect to an image. |    |
| extremeblur   | Add a stronger blur effect to an image.|     |
| dotify        |Add this cool effect to an image.|      |
| invert        | Invert an image, so that it's mirror image is seen. |    |
| flip          | Flip an image, so that its mirror image will be displayed. |      |
| sepia         | Add a sepia effect to an image (image URLs supported, as well as local images).|      |
| imgedit       | Add random effects and filters to an image. |      | -->

### Fun Commands
| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| --------- |
| qr            | Generate a QR code in black & white. Create a multi-coloured QR code with the `qr+` command.              |  `-qr This is a qr-encoded message`|
| qr+            | Generate a qr code with two HEX colours and your message encoded as a QR code.                   |  `-qr fff 000 This is a qr-encoded message`|
| xkcd          | (Nerd Humour) Get today's XKCD comic, or a randomized XKCD comic.                            |  `-xkcd` or `-xkcd today`    |
|pls react      | Get a tonload of reactions for no reason. 👀 🤣 😃 😄 😅 😆 😉                                |  `-pls react`   |
| emojify       | Convert your message into an emojipasta. Adds emojis related to words found within the message. | `-emojify I loooove emojis`     |
|cs_jokes     | Get a coding/computer science-related joke.                         |  `-cs_jokes`   |


### Message Formatting Commands
| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| --------- |
| randomCase    |Randomize every letter in a sentence's case, so iT tUrnS oUt lIke ThIS.| `-randomCase this is a sample sentence`   |
| letterEm      | Convert all the letters in a message to emoji letters. |`-letterEm These letters look like emojis.`  |
| replaceB      | Replace all the b's in a message with the 🅱️ emoji. | `-replaceB Bye bye letter B's!`  |
| pyramid       | Convert a sentence into a word pyramid. Try it out! |   `-pyramid This text looks like a pyramid.`   |
| reverse       | Reverse your message. | `-reverse Hello There`|
<!-- | fmt           | Format your message so that it displays in a certain font or colour, or is encoded in binary, 1337, etc |      | -->

### Social Commands
| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| ---------: |
| avatar        | See your, or someone else's avatar.        |  `-avatar @Silvia923` or `-avatar`    |
| wave          | Wave at another user! |   `-wave @Silvia923`   |
| poke          | Poke another user! | `-poke @somebody`     |
<!-- | gift          | Send a gift to another user! |      |
| setPresence   | Change the bot's playing/presence message to another random message (not user-defined).|     | -->


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

## Onyx In Action!
![Ask Onyx for Acronym Meanings](https://github.com/silvia-odwyer/NodeJS-Discord-Bot/blob/master/acronym_example2.gif "Ask Onyx for Acronym Meanings")
