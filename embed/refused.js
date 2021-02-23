

exports.refused = async(message) => {
    await message.channel.createMessage({
        embed: {
            title: "Action refusée",
            description: 'Vous n\'avez pas le droit d\'éxecuter cette commande!',
            color: 16711680,
            footer: {
                text: "Copyright 2020 © ArviX#8443"
            },
            thumbnail: {
                url: "https://i.ibb.co/dDbF9r4/error.png"
            }
        }
    })

}

exports.noValor = async(message) => {
    await message.channel.createMessage({
        embed: {
            title: "Action refusée",
            description: 'Vous n\'avez pas spécifié de valeur!',
            color: 16711680,
            footer: {
                text: "Copyright 2020 © ArviX#8443"
            },
            thumbnail: {
                url: "https://i.ibb.co/dDbF9r4/error.png"
            }
        }
    })

}

exports.issNaN = async(message) => {
    await message.channel.createMessage({
        embed: {
            title: "Action refusée",
            description: 'La valeur spécifé n\'est pas un nombre!',
            color: 16711680,
            footer: {
                text: "Copyright 2020 © ArviX#8443"
            },
            thumbnail: {
                url: "https://i.ibb.co/dDbF9r4/error.png"
            }
        }
    })

}

exports.noMention = async(message) => {
    await message.channel.createMessage({
        embed: {
            title: "Action refusée",
            description: 'Vous n\'avez pas mentionné quelqu\'un',
            color: 16711680,
            footer: {
                text: "Copyright 2020 © ArviX#8443"
            },
            thumbnail: {
                url: "https://i.ibb.co/dDbF9r4/error.png"
            }
        }
    })

}
exports.under = async(message) => {
    await message.channel.createMessage({
        embed: {
            title: "Action refusée",
            description: 'La valeur spécifié est trop petite!',
            color: 16711680,
            footer: {
                text: "Copyright 2020 © ArviX#8443"
            },
            thumbnail: {
                url: "https://i.ibb.co/dDbF9r4/error.png"
            }
        }
    })
}

exports.noPerms = async(message,perm) => {
    await message.channel.createMessage({
        embed: {
            title: "Action échouée!",
            description: `Je n'est pas les permissions suffisante!`,
            fields: [
                {
                    name: "Permission manquante:",
                    value: perm
                }
            ],
            color: 16711680,
            footer: {text:"Copyright 2020 © ArviX#8443"},
            thumbnail: {
                url: "https://i.ibb.co/dDbF9r4/error.png"
            }
        }
    })
}

exports.botNotAllowed = async(message) => {
    await message.channel.createMessage({
        embed: {
            title: "Action refusée!",
            description: `Les bots ne sont pas autorisé à utiliser cette commande`,
            color: 16711680,
            footer: {text:"Copyright 2020 © ArviX#8443"},
            thumbnail: {
                url: "https://i.ibb.co/dDbF9r4/error.png"
            }
        }
    })
}