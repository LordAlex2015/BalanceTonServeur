'use strict';

const Command = require("../../structure/Command.js");

class Config extends Command {
    constructor() {
        super({
            name: 'config',
            category: 'utils',
            description: 'Cette commande permet de configurer le bot !',
            usage: 'config [#channel]',
            example: ['config #balancetonserveur'],
            botNotAllowed: true,
            perms: "manageGuild",
            botperms: ["manageMessages","manageWebhooks","externalEmojis"]
        });
    }

    async run(client, message, args) {
        if(args[1] && args[1] !== 'delete') {
            const channel = message.member.guild.channels.find(c => c.id === message.channelMentions[0]);
            if (!channel) {
                await message.channel.createMessage({
                    embed: {
                        title: "Action refusée",
                        description: "Le salon précisé n'existe pas sur ce serveur!",
                        color: client.maincolor
                    }
                })
            } else if (channel.type !== 0) {
                await message.channel.createMessage({
                    embed: {
                        title: "Action refusée",
                        description: "Le salon précisé n'est pas un salon textuel!",
                        color: client.maincolor
                    }
                })
            } else {
                const guilddb = client.guilddb.get(message.guildID);
                guilddb.ads_channel = channel.id;
                client.guilddb.set(message.guildID, guilddb);
                await message.channel.createMessage({
                    embed: {
                        title: "Salon de publicité actualisé!",
                        description: `Le salon de publicité est maintenant: ${channel.mention}`,
                        color: client.maincolor
                    }
                })
            }
        } else if(args[1] && args[1] === 'delete') {
            const guilddb = client.guilddb.get(message.guildID);
            guilddb.ads_channel = '';
            client.guilddb.set(message.guildID, guilddb);
            await message.channel.createMessage({
                embed: {
                    title: "Salon de publicité actualisé!",
                    description: 'Le salon de pub est maintenant désactivé!',
                    color: client.maincolor
                }
            })
        } else {
            await message.channel.createMessage({
                embed: {
                    title: "Configuration du serveur:",
                    fields: [
                        {
                            name: "Salon de publicité:",
                            value: `<#${client.guilddb.get(message.guildID).ads_channel}>`
                        }
                    ],
                    color: client.maincolor
                }

            })
        }
    }
}

module.exports = new Config;