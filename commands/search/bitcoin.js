const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const fetch = require("node-fetch")

var name = "bitcoin"
module.exports = class BitcoinCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'bitcoin',
            aliases: [],
            group: 'search',
            memberName: 'bitcoin',
            description: "Retrieve today's bitcoin rates.",
            details: oneLine`
            Retrieve today's bitcoin rates.
			`,
            examples: ["bitcoin"]
        });
    }

    async run(msg, { text }) {
        // Necessary for choosing random colours for rich embeds
        var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
        var randomNumber = getRandomNumber(0, colour_array.length - 1);
        var randomColour = colour_array[randomNumber];

        // BitCoin Charts
        var bitcoin_charts = "http://api.bitcoincharts.com/v1/markets.json"
        fetch(bitcoin_charts)
            .then(res => res.json())
            .then((out) => {
                var bitcoin_info = out;
                console.log(bitcoin_info);

                var usd_currency = bitcoin_info[0]
                var eur_currency = bitcoin_info[1]
                console.log(usd_currency);

                var bc_to_usd = usd_currency.ask;
                console.log(bc_to_usd)

                var bc_to_eur = eur_currency.ask;
                console.log(bc_to_eur)

                var usd_message = "USD --> 1 bitcoin equals: $" + bc_to_usd
                var eur_message = "EUR --> 1 bitcoin equals: €" + bc_to_eur

                msg.channel.send({
                    embed: {
                        color: randomColour,
                        title: `Bitcoin Data From BitcoinCharts.com`,
                        description: `${usd_message}\n${eur_message}`
                    }
                });
            })
            .catch(err => { throw err });
        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
};