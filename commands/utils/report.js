'use strict';

const Command = require("../../structure/Command.js");
const {noValor} = require("../../embed/refused");

class Ping extends Command {
    constructor() {
        super({
            name: 'report',
            category: 'utils',
            description: 'Cette commande permet de signaler une pub',
            usage: 'report <ID> <raison>',
            example: ['report 446e6141-1c5d-4854-95c2-5c41a625b80x Contre les ToS de Discord','report 446e6141-1c5d-4854-95c2-5c41a625b80s Pas de description'],
            botNotAllowed: true,
            aliases: ['signaler']
        });
    }

    async run(client, message, args) {
        if(!args[1]) {
           await noValor(message);
        } else {
            const uuid = args[1];
            if(client.ads.get(uuid)) {
                args.shift();
                args.shift();
                if(!args[1]) {
                    await noValor(message);
                } else {
                    await client.createMessage(client.config.reports, {
                        embed: {
                           title: "<:btl_attention:748552608653770783> | Signalement de pub",
                            description: client.ads.get(uuid).content,
                            fields: [
                                {
                                    name: "ID de la Pub",
                                    value: uuid,
                                },
                                {
                                    name: "Raison:",
                                    value: args.join(' ')
                                },
                                {
                                    name: "Utilisateur",
                                    value: `${message.author.username}#${message.author.discriminator} | ${message.author.id}`,
                                    inline: true
                                }, {
                                    name: "Propriétaire de la pub",
                                    value: `${client.ads.get(uuid).author.tag} | ${client.ads.get(uuid).author.id}`,
                                    inline: true
                                }
                            ],
                            color: client.maincolor,
                            footer: {
                               text: client.footer
                            }
                        }
                    }).then( async(msg) => {
                        client.adsReport.set(msg.id, {
                            uuid: uuid,
                            reporter: {
                                id: message.author.id,
                            tag: `${message.author.username}#${message.author.discriminator}`
                            },
                            reason: args.join(' ')
                        })
                        await msg.addReaction("btl_positif2:734141545711927296");
                        await msg.addReaction("⛔");
                    });
                    await message.channel.createMessage({
                        embed: {
                            title: "Signalement effectué!",
                            description: "La pub a été signalée, notre équipe s'en occupe!",
                            color: client.maincolor,
                            footer: {
                                text: client.footer
                            }
                        }
                    });
                }
            } else {
                await message.channel.createMessage({
                    embed: {
                        title: "Action refusée",
                        description: "La pub n'existe pas!",
                        color: client.red,
                        footer: {
                            text: client.footer
                        }
                    }
                })
            }
        }
    }
}

module.exports = new Ping;