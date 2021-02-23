'use strict';

const Command = require("../../structure/Command.js");

class Ping extends Command {
    constructor() {
        super({
            name: 'interban',
            category: 'secret',
            perms: 'owner'
        });
    }

    async run(client, message, args) {
        const membre = message.mentions[0] || client.users.find(u => u.id === args[1]) || message.author ;
        const uss = client.userdb.get(membre.id);
        uss.banned = true
        client.userdb.set(membre.id,uss)
        await message.channel.createMessage("Member Banned!")
        membre.getDMChannel().then(channel => {
            args.shift();
            args.shift();
            channel.createMessage({
                embed: {
                    title: "Vous avez été banni de nos services ! 🔨",
                   description: "> **Vous avez été banni par un modérateur.**\n" +
                       "> **La raison :**" + args.join(' '),
                    color: client.maincolor
                }
            })
        }).catch(() => {})
    }
}

module.exports = new Ping;