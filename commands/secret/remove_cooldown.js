'use strict';

const Command = require("../../structure/Command.js");

class Ping extends Command {
    constructor() {
        super({
            name: 'cooldown',
            category: 'secret',
            perms: 'owner'
        });
    }

    async run(client, message, args) {
        const membre = message.mentions[0] || client.users.find(u => u.id === args[1]) || message.author ;
        const uss = client.userdb.get(membre.id);
        uss.cooldown = {
            active: false,
            finish: 0
        }
        client.userdb.set(membre.id,uss)
        message.channel.createMessage("Cooldown reset!")
    }
}

module.exports = new Ping;