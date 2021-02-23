'use strict';

const Command = require("../../structure/Command.js");

class Ping extends Command {
    constructor() {
        super({
            name: 'interunban',
            category: 'secret',
            perms: 'owner'
        });
    }

    async run(client, message, args) {
        const membre = message.mentions[0] || client.users.find(u => u.id === args[1]) || message.author ;
        const uss = client.userdb.get(membre.id);
        uss.banned = false
        client.userdb.set(membre.id,uss)
        await message.channel.createMessage("Member Unban!")
        membre.getDMChannel().then(channel => {
            channel.createMessage({
                embed: {
                    title: "Votre bannissement a été révoqué ! 🔧",
                    description: "> **Un modérateur a révoqué votre bannissement.**\n" +
                        "> **Vous pouvez de nouveau envoyer des publicités.**",
                    color: client.maincolor
                }
            })
        }).catch(() => {})
    }
}

module.exports = new Ping;