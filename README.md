# NodeJS Discord Bot (Onyx/AzuraBot)
Onyx/AzuraBot is a data-fetching, multi-lingual Discord bot, coded using Discord.JS and Node.JS, and has over thirty commands, 
including meme generation, social commands, image editing, music production, fetching info/live imagery from NASA, crypto support, interacting with IBM's Watson API, providing definitions/synonyms for words, and more.

A complete list of currently working commands can be found below.

## Invite To Your Server
Just click here to invite Onyx to your server!

## Commands

### Space/Astronomy/NASA Commands

| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| ---------: |
| earth         | See live footage of Earth, as seen from the NOAA DSCVRY probe.                                   |     |
| neo           | Make a meme, as so !meme waitingskeleton top_text-bottom_text                                    |      |
| astronauts    | Find out how many astronauts are aboard the International Space Station.                         |      |
| iss           | Get the location of the International Space Station. \n Updates every second.                    |      |

### Search Commands
| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| ---------: |
| xkcd          | Get a randomized XKCD comic.                                                                     |      |
| population    | Get the total number of humans on Earth right now.                                               |      |
| search        | Get all the synonyms for a word.                                                                 |  search azure \n search wonderful \n search knowledge    |
| bitcoin       | Retrieve today's bitcoin rates.                                                                  |      |
| acronym       | Get the meaning of an acronym. --> acronym lol                                                   | acronym tfw \n acronym rofl \n acronym lol   |

| define        | Get an old-style definition of a word like it's 1859.                                            |   define earth \n define dancing \n define knowledge   |
| translate     | Translate to a variety of languages, including French (fr), Italian (it), German (de), and more! | translate fr How are you?|
| identify      | Identify what language a piece of text is in, plus the result includes Watson AI's confidence levels too! | identify Hello there, how are you? |
| getem         | Search for emojis related to a certain search term. Get happy emojis, cute emojis, hearts, etc.| getem hearts \n getem happy \n getem nature     |

### Image Commands
| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| ---------: |
| meme          | Make a meme, as so !meme waitingskeleton top_text-bottom_text                                    |     |
| slowblur      | Add a gentler blur effect to an image. |    |
| extremeblur   | Add a stronger blur effect to an image.|     |
| dotify        |Add this cool effect to an image.|      |
| invert        | Invert an image, so that it's mirror image is seen. |    |
| reverse       | Reverse your message. | reverse Hello There \n reverse example sentence|
| flip          | Flip an image, so that its mirror image will be displayed. |      |
| sepia         | Add a sepia effect to an image (image URLs supported, as well as local images).|      |
| imgedit       | Add random effects and filters to an image. |      |

### Fun Commands
| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| ---------: |
| qr            | Generate a qr code with two HEX colours and your message encoded as a QR code.                   |  `qr fff 000 This is a qr-encoded message \n qr fff 040 Hello there.`|
|pls react      | Get a tonload of reactions for no reason. 👀 🤣 😃 😄 😅 😆 😉                                |     |
| emojify       | Convert your message into an emojipasta. Adds emojis related to words found within the message. | emojify So I went shopping today, it was pretty fun actually! Haha, I got a cute dress btw.     |

### Message Formatting Commands
| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| ---------: |
| randomCase    |Randomize every letter in a sentence's case, so iT tUrnS oUt lIke ThIS.|   randomCase this is a sample sentence   |
| letterEm      | Convert all the letters in a message to emoji letters. |  |
| replaceB      | Replace all the b's in a message with the 🅱️ emoji. |   |
| fmt           | Format your message so that it displays in a certain font or colour, or is encoded in binary, 1337, etc |      |
| pyramid       | Convert a sentence into a word pyramid. Try it out! |      |


### Social Commands
| Command       | Description   | Examples  |
| ------------- |:----------------------------------------------------------------------------------------------:| ---------: |
| avatar        | are neat                                 |      |
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

