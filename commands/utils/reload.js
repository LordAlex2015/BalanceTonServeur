'use strict';

const Command = require("../../structure/Command.js"),
    {readdirSync} = require('fs'),
    {join} = require("path");
const {red, green} = require("colors");

class Ping extends Command {
    constructor() {
        super({
            name: 'reload',
            category: 'utils',
            description: 'Cette commande donne la latence du bot !',
            usage: 'ping',
            example: ['ping'],
        });
    }

    async run(client, message, args) {
        client.reloadCommand(args[1]).then(async res => {
            await message.channel.createMessage(res)
        })
    }
}

module.exports = new Ping;