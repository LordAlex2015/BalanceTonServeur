'use strict';

const Command = require("../../structure/Command.js");
const moment = require('moment')
moment.locale("fr");

class Warns extends Command {
    constructor() {
        super({
            name: 'warns',
            category: 'secret',
            perms: 'owner'
        });
    }

    async run(client, message, args) {
        const membre = message.mentions[0] || client.users.find(u => u.id === args[1]) || message.author ;
        const warn_user = client.warn_user.get(membre.id);
        if(!warn_user) {
            await message.channel.createMessage({
                embed: {
                    title: `Warn de ${membre.username}#${membre.discriminator}`,
                    description: "Aucun Warn",
                    footer: {
                        text: client.footer
                    },
                    color: client.maincolor
                }
            })
        } else {
            let total = ""
            let i = 0;
            for(const warn_id of warn_user.warns) {
                if(i <= 10) {
                    const warn = client.warn.get(warn_id.id);
                    total += `\n[\`${warn_id.id}\`] ${moment(warn.timestamp).format('L')}\nModérateur: \`${warn.moderator.tag}\`\n> ${warn.reason}`;
                    i++
                } else {
                    break;
                }
            }
            await message.channel.createMessage({
                embed: {
                    title: `Warn de ${membre.username}#${membre.discriminator}`,
                    description: total,
                    footer: {
                        text: `Affiche de ${i}/${warn_user.warns.length}`
                    },
                    color: client.maincolor
                }
            })
        }


    }
}

module.exports = new Warns;