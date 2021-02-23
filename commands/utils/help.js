'use strict';

const Command = require("../../structure/Command.js");

class Help extends Command {
    constructor() {
        super({
            name: 'help',
            category: 'utils',
            description: 'Cette commande va vous aider !',
            usage: 'help [commande]',
            example: ['help', 'help ping'],
            aliases: ['h','aide']
        });
    }

    async run(client, message, args) {
        if (!args[1]) {
            await message.channel.createMessage({
                embed: {
                    author: {
                        text: message.author.username,
                        icon_url: message.author.avatarURL
                    },
                    color: client.maincolor,
                    title: `Commande de ${client.user.username}`,
                    thumbnail: {
                        url: 'https://i.ibb.co/8KYCKJd/info.png'
                    },
                    description: `Faite b!help [nom de la commande] pour plus d'informations`,
                    fields: [
                        {
                            name: "❱ Informations",
                            value: client.commands.filter((command) => command.category === "utils").map((command) => `\`${command.name}\``).join(', '),
                            inline:true,
                        },
                        {
                            name: "❱ Inviter le bot",
                            value: "https://discord.com/api/oauth2/authorize?client_id=759068914092474425&permissions=537143296&scope=bot"
                        }
                    ],
                    footer: {
                        text: client.footer
                    },

                }
            })
        } else if (args[1]) {
            const command = client.commands.find(cmd => cmd.aliases.includes(args[1])) || client.commands.get(args[1]);
            if (!command) return message.channel.createMessage(`Ce n'est pas une commande valide`);
            let send = "";
            command.example.forEach(use => {
                send += 'b?' + use + '\n'
            })
            let sendA = "";

                command.aliases.forEach(use => {
                    sendA += 'b?' + use + '\n'
                })

            await message.channel.createMessage({
                embed: {
                    color: client.maincolor,
                    author: {
                        name: `Help: Command ` + args[1],
                        icon_url: message.author.avatarURL
                    },
                    description: `Les <> sont des arguments requis\nLes [] sont des arguments optionnels`,
                    footer: {
                        icon_url: client.user.avatarURL,
                        text: client.user.username
                    },
                    fields: [
                        {
                            name: "Description",
                            value: !command.description ? 'Aucune description' : command.description,
                            inline: true,
                        },
                        {
                            name: "Utilisation",
                            value: !command.usage ? "Aucune utilisation" : 'b?' + command.usage,
                            inline: true,
                        },
                        {
                            name: "Exemples",
                            value: !command.example ? `Pas d'exemples` : send,
                        },
                        {
                            name: "Aliases",
                            value: !command.aliases[0] ? `Pas d'aliases` : sendA,
                            inline: true,
                        },
                        {
                            name: "Permission requise",
                            value: command.perms,
                            inline: true,
                        }]
                }
            })
        }
    }
}

module.exports = new Help;