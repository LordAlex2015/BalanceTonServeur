'use strict';

const Command = require("../../structure/Command.js");
const moment = require('moment')
class Userinfo extends Command {
    constructor() {
        super({
            name: 'userinfo',
            category: 'utils',
            description: 'Cette commande donne des informations sur des utilisateurs !',
            usage: 'userinfo [@user]',
            example: ['userinfo', 'userinfo @user'],
            aliases: ['ui']
        });
    }

    async run(client, message, args) {
        const membre = message.mentions[0] || client.users.find(u => u.id === args[1]) || message.author ;

        // if (!membre) { return message.channel.send('Veuillez mentionner un utilisateur !'); }
        await message.channel.createMessage({
            embed: {
                color: client.maincolor,
                title: `Statistiques du l'utilisateur **${membre.username}#${membre.discriminator}**`,
                thumbnail: {
                    url: membre.avatarURL
                },
                fields: [
                    {
                        name: 'ID :',
                        value: membre.id
                    },
                    {
                        name: 'Créé le :',
                        value: `${moment(membre.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`
                    },
                    {
                        name: "Pub approuvée:",
                        value: "En cours de calcul..."
                    },
                    {
                        name: "Pub rejetée",
                        value: "En cours de calcul..."
                    },
                    {
                        name: "Premium:",
                        value: client.userdb.get(membre.id).rank === 1 ? 'Oui' : "Non"
                    }
                ],
                footer: {
                    text: `Informations de l'utilisateur ${membre.username}`
                }
            }
        }).then(msg => {
            let c = 0;
            let y = 0;
            const a = client.ads.array();
            for(const x of a) {
                if(x.author.id === membre.id) {
                    if(x.status === 1) {
                        c++;
                    } else if(x.status === 2) {
                        y++;
                    }
                }
            }
            msg.embeds[0].fields[2].value = c;
            msg.embeds[0].fields[3].value = y;
            msg.edit({
                embed: msg.embeds[0]
            })
        })

    }
}

module.exports = new Userinfo();