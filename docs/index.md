# Onyx Discord Bot Documentation

Onyx is a multi-purpose media and utility bot, containing over 50 commands to help you bring the best of the web to your server.

Make memes, send electronic cards, get answers to everything, and more, with Onyx. This bot is powered by Node.JS, and coded using
the Discord.JS library.

Onyx has over fifty commands, including those for:

- meme generation

- gif and sticker searching

- searching YouTube

- music production

- fetching info/live imagery from NASA

- interacting with IBM's Watson API 

- getting information on any topic


A complete list of currently working commands can be found below.

## UPDATES: 28/12/2018
- Send cool eCards and GIFts to other users!
- Get stickers from GIPHY. 👀
- Meta Commands now available! Get server stats, submit ideas to Silvia, and more. (More to be added)
- YouTube Integration Now Here! Search for your favourite videos, watch, and enjoy!
- Search Pixabay for public domain photos. `-pixabay night sky`
- Get random cute Ascii Faces!
- Get public domain, stunning images from Unsplash with `-photo`
- Captcha generation now possible! `-captcha Only humans can read this.`
- Get rhyming words. `-rhyme red`
- Check how popular your name is with `-name [your name]`

## Invite To Your Server
[Just click here to invite Onyx to your server!](https://discordapp.com/oauth2/authorize?&client_id=444948120573313024&scope=bot&permissions=0)

## Test Onyx Out In This Support Server
If you want to test Onyx out before adding her to your server, [just join this server](https://discord.gg/cSWHaEK), and leave when you want.
Onyx runs 24/7, so she'll always be online. :D

# Commands
NB: Prepend a hyphen before any of the commands below.

### Media Commands
| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| --------- |
| meme          | Make a meme, using a variety of templates. Separate the meme's top and bottom text using a hyphen.  | `-meme waitingskeleton This is top text-This is bottom text`    |
| meme_templates      | Get a list of all meme templates available.|  `-meme_templates`   |
| yt      | Search YouTube for your favourite videos. Returns the first search result video.|  `-yt Swedish House Mafia greyhound`   |
| xkcd          | (Nerd Humour) Get today's XKCD comic, or a randomized XKCD comic.                            |  `-xkcd` or `-xkcd today`    |
| photo          | Search Unsplash for public domain, stunning images of your choice.                      |  `-unsplash night sky`    |
| pixabay    |   Search Pixabay for public domain images.     |   `-pixabay night sky`   |

### Space/Astronomy/NASA Commands

| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| ---------: |
| earth         | See live footage of Earth, as seen from the NOAA DSCVRY probe.                                   |   `-earth`  |
| neo           | Find out how many Near-Earth objects are near Earth right now.                              |    `-neo`  |
| astronauts    | Find out how many astronauts are aboard the International Space Station.                         |    `-astronauts`  |
| iss           | Get the location of the International Space Station. Updates every second.                    |    `-iss`  |

![Get Live Earth Footage](https://github.com/silvia-odwyer/NodeJS-Discord-Bot/blob/master/media/earth_example.gif "Get live footage of Earth from NASA!")

### Search Commands
| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| --------- |
| search        | Get all the synonyms for a word.                                                                 |  `-search azure `   |
| bitcoin       | Retrieve today's bitcoin rates.                                                                  |    `-bitcoin`  |
| acronym       | Get the meaning of an acronym. --> acronym lol                                                   | `-acronym rofl` |
| oldDefine        | Get an old-style definition of a word like it's 1859.                                            |  `-oldDefine dancing`  |
| define        | Get a definition of a word.                                        |  `-define dancing`  |
| translate     | Translate text to a variety of languages, including French (fr), Italian (it), German (de), and more! | `-translate fr How are you?`|
| identify      | Identify what language a piece of text is in, plus the result includes Watson AI's confidence levels too! |`-identify Hello there, how are you?` |
| emoji         | Search for emojis related to a certain search term. Get happy emojis, cute emojis, hearts, etc.| `-emoji hearts `  |
| population    | Get the total number of humans on Earth right now.                                               |   `-population`   |
| rhyme    |  Get words that rhyme with a word of your choice.                                  |   `-rhyme red`   |
| name    |  Find out how popular your first name is, plus get stats on it.                                  |   `-name Markus`   |
| ask    |   Ask Onyx anything, and she'll provide an answer from Wolfram Alpha, an information engine.     |   `-ask is there life on Mars`   |

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
| qr+            | Generate a qr code with two HEX colours and your message encoded as a QR code.                   |  `-qr+ fff 000 This is a qr-encoded message`|
|pls react      | Get a tonload of reactions for no reason. 👀 🤣 😃 😄 😅 😆 😉                                |  `-pls react`   |
| emojify       | Convert your message into an emojipasta. Adds emojis related to words found within the message. | `-emojify I loooove emojis`     |
|cs_jokes     | Get a coding/computer science-related joke.                         |  `-cs_jokes`   |
|captcha     | Turn plaintext into a captcha.                        |  `-captcha Hello there`   |
|cats     | Get a load of cuuuute cat ascii faces                        |  `-cats`   |
|asciiFaces     | Get a load of cuuuute ascii faces ^^                     |  `-asciiFaces`   |
|poll     | Create a poll. Just append a question onto your command, and the reactions will symbolise votes.                   |  `-poll Do you want more text channels?`   |

### Message Formatting Commands
| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| --------- |
| randomCase    |Randomize every letter in a sentence's case, so iT tUrnS oUt lIke ThIS.| `-randomCase this is a sample sentence`   |
| letterEm      | Convert all the letters in a message to emoji letters. |`-letterEm These letters look like emojis.`  |
| replaceB      | Replace all the b's in a message with the 🅱️ emoji. | `-replaceB Bye bye letter B's!`  |
| pyramid       | Convert a sentence into a word pyramid. Try it out! |   `-pyramid This text looks like a pyramid.`   |
| reverse       | Reverse your message. | `-reverse Hello There`|
| binary       | Translate a message to binary. | `-binary Hello There`|
| 1337       | Translate a message to 1337. | `-1337 Hello There`|
| adv1337       | Translate a message to advanced 1337. | `-adv1337 Hello There`|

<!-- | fmt           | Format your message so that it displays in a certain font or colour, or is encoded in binary, 1337, etc |      | -->

### Social Commands
| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| ---------: |
| avatar        | See your, or someone else's avatar.        |  `-avatar @Silvia923` or `-avatar`    |
| wave          | Wave at another user! |   `-wave @Silvia923`   |
| poke          | Poke another user! | `-poke @somebody`     |
| gift          | Send a gift to another user! | `-gift @Silvia923`|
| setPresence   | Change the bot's playing/presence message to another random message (not user-defined).|     | -->

### Meta Commands
| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| --------- |
| server            | Get server stats, such as member count, when the server was created, and more...  |  `-server`|
| idea           |Submit an idea for a new bot feature.               |  `-idea New image filters please! Would love to see some sepia filters :eyes:`|
|creator      | Get info. on who coded Onyx :eyes:          |  `-creator`   |
|info      | Get info. about Onyx, such as what language she's coded in, and more.    |  `-info`   |
|invite      | Get Onyx's invite link, so that she can be invited to other servers.   |  `-invite`   |