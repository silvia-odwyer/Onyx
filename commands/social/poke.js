const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

var name = "poke"
module.exports = class PokeCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'poke',
            aliases: [],
            group: 'social',
            memberName: 'poke',
            description: "Poke another user! :point_right:",
            details: "Poke another user! :point_right:",
            examples: ["poke @Silvia923#9909"],

            args: [
                {
                    key: 'text',
                    prompt: "Tee hee, you never told me who you wanted to poke ^.^ Did you actually want to poke me instead? :grin: \nTry mentioning someone along with your command :eyes:",
                    type: 'string'
                }
            ]
        });
    }

    async run(msg, args) {
        
        if (args.length > 0) {
            console.log(" running ");
            let msg_array = args.split(" ");
            let first_arg = msg_array[0];

            if (first_arg.startsWith('<@') && first_arg.endsWith('>')) {
              first_arg = first_arg.slice(2, -1);
          
              if (first_arg.startsWith('!')) {
                first_arg = first_arg.slice(1);
              }
          
            let pokee = this.client.users.cache.get(first_arg);

            var poker = msg.author;

            msg.channel.send(`${poker} just poked :point_right: ${pokee} :eyes:`);
            console.log("pokee ");
    
        }

        else {
            msg.reply(
                "Try mentioning a person eg: `" +
                  `${this.client.commandPrefix}` +
                  " @someone`"
              );        }

              console.log("hi");

    }

    
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

    
};
