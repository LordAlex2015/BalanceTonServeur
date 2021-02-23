'use strict';

const Command = require("../../structure/Command.js");

class Ping extends Command {
    constructor() {
        super({
            name: 'support',
            category: 'utils',
            description: 'Cette commande donne le serveur support du bot!',
            usage: 'support',
            example: ['support']
        });
    }

    async run(client, message) {
        await message.channel.createMessage({
            embed: {
                title: "Serveur Support:",
                fields: [
                    {
                        name: "BalanceTonServeur's Support",
                        value: "https://discord.gg/uHWFM5T",
                        inline: true
                    },
                    {
                        name: "BalanceTonLien",
                        value: "https://discord.gg/whnVChG"
                    }
                ],
                color: client.maincolor
            }
        })
    }
}

module.exports = new Ping;