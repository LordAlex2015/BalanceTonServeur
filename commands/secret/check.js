'use strict';

const Command = require("../../structure/Command.js");
const moment = require('moment');

class Ping extends Command {
    constructor() {
        super({
            name: 'check',
            category: 'secret',
            perms: 'owner'
        });
    }

    async run(client, message, args) {
        const membre = message.mentions[0] || client.users.find(u => u.id === args[1]) || message.author ;
        const uss = client.userdb.get(membre.id);
        await message.channel.createMessage({
            embed: {
                description: `${moment(uss.cooldown.finish)}`,
                color: client.maincolor
            }
        })
    }
}

module.exports = new Ping;