'use strict';

const Command = require("../../structure/Command.js");
const { loadavg, cpus, totalmem } = require('os');

class Stats extends Command {
    constructor() {
        super({
            name: 'stats',
            category: 'utils',
            description: 'Cette commande donne les stats du bot !',
            usage: 'stats',
            example: ['stats'],
            aliases: ['botinfo']
        });
    }

    async run(client, message) {
        let cpuCores = cpus().length;

        await message.channel.createMessage({
            embed: {
                title: client.user.username,
                color: client.maincolor,
                timestamp: new Date(),
                footer: {
                    icon_url: client.user.avatarURL,
                    text: client.user.username
                },
                thumbnail: {
                    url: client.user.avatarURL
                },
                fields: [
                    {
                        name: "Nombre d'utilisateurs",
                        value: "Utilisateurs:" + `\`\`${client.users.size}\`\``,
                        inline: true
                    },
                    {
                        name: "Nombre de serveurs",
                        value: "Serveurs:" + `\`\`${client.guilds.size}\`\``,
                        inline: true
                    },
                    {
                        name: "Utilisation du processeur",
                        value: `${(loadavg()[0]/cpuCores).toFixed(2)}% / 100%`,
                        inline: true
                    },
                    {
                        name: "Utilisation de la mémoire RAM",
                        value: `${Math.trunc((process.memoryUsage().heapUsed) / 1000 / 1000)} MB / ${Math.trunc(totalmem() / 1000 / 1000)} MB`,
                        inline: true
                    }, {
                        name: "Pub envoyée",
                        value: client.ads.array().length,
                        inline: true
                    }
                ]
            }
        })
    }
}

module.exports = new Stats;