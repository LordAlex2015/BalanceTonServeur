'use strict';

const Command = require("../../structure/Command.js");

class Ping extends Command {
    constructor() {
        super({
            name: 'ping',
            category: 'utils',
            description: 'Cette commande donne la latence du bot !',
            usage: 'ping',
            example: ['ping'],
            aliases: ['latance']
        });
    }

    async run(client, message) {
        await message.channel.createMessage('Pong :ping_pong:').then(msg => {
            msg.edit(`Pong :ping_pong: \`${Math.sqrt(((new Date() - message.timestamp)/(5*2))**2)} ms\``)
        });
    }
}

module.exports = new Ping;