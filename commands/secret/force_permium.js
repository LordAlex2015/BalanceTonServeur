'use strict';

const Command = require("../../structure/Command.js");

class Ping extends Command {
    constructor() {
        super({
            name: 'force_premium',
            category: 'secret',
            perms: 'owner'
        });
    }

    async run(client, message, args) {
        const membre = message.mentions[0] || client.users.find(u => u.id === args[1]) || message.author ;
        const uss = client.userdb.get(membre.id);
        uss.rank = 1
        client.userdb.set(membre.id,uss)
        await message.channel.createMessage("Member Forced Premium!")
    }
}

module.exports = new Ping;