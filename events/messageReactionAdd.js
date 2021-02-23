'use strict';

const {addWarn} = require("../functions/utils");
const {wait} = require("../functions/utils");
module.exports = async (client, message, emoji, user) => {
    if (client.adsVerif.get(message.id) && user !== client.user.id && !client.userdb.get(user).banned) {
        const {notApproved, addWarn} = require('../functions/utils');
        client.getMessage(message.channel.id, message.id).then(message => {
            let gbtbn = true;
            let cec = false;
            for (const ree of Object.keys(message.reactions)) {
                wait(100);
                if (message.reactions[ree].count > 2) {
                    gbtbn = false
                }
                if (message.reactions[ree].count === 2 && !cec) {
                    let erre = true;
                    for (const rede of Object.keys(message.reactions)) {
                        if (rede !== ree) {
                            if (message.reactions[rede].count === 2) {
                                erre = false;
                            }
                        }
                    }
                    if (erre) {
                        cec = true
                    }

                }
            }
            setTimeout(function () {
                if (gbtbn && cec) {

                    let x = true
                    const us = client.users.find(u => u.id === user);
                    if (emoji.id === "734141545711927296") {
                        let ss = client.ads.get(client.adsVerif.get(message.id).uuid);
                        ss.status = 1;
                        client.ads.set(client.adsVerif.get(message.id).uuid, ss);
                        const auut = client.ads.get(client.adsVerif.get(message.id).uuid).author.tag;
                        let svv = "https://cdn.discordapp.com/embed/avatars/1.png"
                        try {
                            svv = client.users.find(u => u.id === client.ads.get(client.adsVerif.get(message.id).uuid).author.id).avatarURL
                        } catch (e) {

                        }
                        client.guilds.forEach((guild) => {
                            if (guild.id !== client.ads.get(client.adsVerif.get(message.id).uuid).guild.id) {
                                guild.getWebhooks().then(w => {
                                    let p = true;
                                    for (let d = 0; d < w.length; d++) {
                                        if (client.guilddb.get(guild.id) && w[d].channel_id === client.guilddb.get(guild.id).ads_channel && w[d].name === "BalanceTonServeur") {
                                            p = false;
                                            setTimeout(function () {
                                                client.executeWebhook(w[d].id, w[d].token, {
                                                    username: auut,
                                                    avatarURL: svv,
                                                    content: `**__<:btl_loudspeaker:770226954686300160> Système proposé par ${client.user.mention}__** \n\n${ss.content}\n\n*ID de la Pub: \`${ss.id}\`*`
                                                });
                                            }, 1000)
                                        }
                                    }
                                    setTimeout(function () {
                                        if (p) {
                                            p = false
                                            if (client.guilddb.get(guild.id) && client.guilddb.get(guild.id).ads_channel !== "") {
                                                client.createChannelWebhook(client.guilddb.get(guild.id).ads_channel, {name: 'BalanceTonServeur'}, 'Webhook Inter-Pub BalanceTonServeur').then(w => {
                                                    setTimeout(function () {
                                                        client.executeWebhook(w.id, w.token, {
                                                            username: auut,
                                                            avatarURL: svv,
                                                            content: `**__<:btl_annonce:748552062735745124> Système proposé par BalanceTonServeur__** \n\n${ss.content}`
                                                        });
                                                    }, 1000)
                                                }).catch(() => {
                                                })
                                            }
                                        }
                                    }, 500)

                                }).catch(() => {
                                })
                            }
                        })

                        const usse = client.userdb.get(client.ads.get(client.adsVerif.get(message.id).uuid).author.id);
                        usse.ads++
                        console.log(usse)
                        if (usse.ads >= 200) {
                            usse.rank = 1;
                            const use = client.users.find(u => u.id === client.ads.get(client.adsVerif.get(message.id).uuid).author.id);
                            use.getDMChannel().then(chann => {
                                chann.createMessage({
                                    embed: {
                                        title: "Vous êtes passé premium!",
                                        description: "```Le cooldown entre vos pub passe à 2 heures au lieu de 6!```",
                                        color: client.green
                                    }
                                })

                            }).catch(() => {
                            })
                        }
                        client.userdb.set(user, usse);
                    } else if (emoji.name === "⛔") {
                        let ss = client.ads.get(client.adsVerif.get(message.id).uuid);
                        ss.status = 2;
                        client.ads.set(client.adsVerif.get(message.id).uuid, ss);
                        x = "Aucune";
                        const use = client.users.find(u => u.id === client.ads.get(client.adsVerif.get(message.id).uuid).author.id);
                        use.getDMChannel().then(chann => {
                            chann.createMessage({
                                embed: {
                                    title: "Votre publicité a été rejetée !",
                                    description: "> **Votre publicité a été réjetée par un modérateur.**\n" +
                                        "> **Aucune raison précisée**",
                                    color: client.red
                                }
                            })

                        }).catch((e) => {
                        })
                    } else if (emoji.name === "🔌") {
                        x = "Non respect des Conditions d'Utilisation ( ToS ) de Discord";
                        notApproved(client, client.adsVerif.get(message.id).uuid, "Non respect des Conditions d'Utilisation ( ToS ) de Discord.", `${us.username}#${us.discriminator} | ${us.id}`);
                        const moderator = {
                            id: us.id,
                            username: us.username,
                            tag: `${us.username}#${us.discriminator}`
                        }
                        addWarn(client,client.ads.get(client.adsVerif.get(message.id).uuid).author,x,moderator, false)
                    } else if (emoji.name === "🧯") {
                        x = "Votre publicitée ne contient pas de description!";
                        notApproved(client, client.adsVerif.get(message.id).uuid, "Votre publicité ne contient pas de description.", `${us.username}#${us.discriminator} | ${us.id}`);
                        const moderator = {
                            id: us.id,
                            username: us.username,
                            tag: `${us.username}#${us.discriminator}`
                        }
                        addWarn(client,client.ads.get(client.adsVerif.get(message.id).uuid).author,x,moderator, false)
                    }
                    message.delete();
                    if (x === true) {
                        client.createMessage(client.config.staffLogsChannel, {
                            embed: {
                                title: "<a:btl_positif2:734141545711927296>  Publicité vérifiée!",
                                description: client.ads.get(client.adsVerif.get(message.id).uuid).content,
                                color: client.maincolor,
                                fields: [
                                    {
                                        name: "🆔 Id de la Pub:",
                                        value: client.adsVerif.get(message.id).uuid
                                    },
                                    {
                                        name: "<:btl_outils:748552806298026066> Modérateur:",
                                        value: `${us.username}#${us.discriminator} | ${us.id}`
                                    },
                                    {
                                        name: "👤 Utilisateur:",
                                        value: `${client.ads.get(client.adsVerif.get(message.id).uuid).author.tag} | ${client.ads.get(client.adsVerif.get(message.id).uuid).author.id}`
                                    },
                                    {
                                        name: "💬 Serveur:",
                                        value: `${client.ads.get(client.adsVerif.get(message.id).uuid).guild.name} | ${client.ads.get(client.adsVerif.get(message.id).uuid).guild.id}`
                                    },
                                    {
                                        name: "🔌 Lien:",
                                        value: client.ads.get(client.adsVerif.get(message.id).uuid).link
                                    }
                                ]
                            }
                        })
                    } else if (x === "Aucune") {
                        client.createMessage(client.config.staffLogsChannel, {
                            embed: {
                                title: "<a:btl_negatif2:748551011542761523> Publicité rejetée!",
                                description: client.ads.get(client.adsVerif.get(message.id).uuid).content,
                                color: client.maincolor,
                                fields: [
                                    {
                                        name: "🆔 Id de la Pub:",
                                        value: client.adsVerif.get(message.id).uuid
                                    },
                                    {
                                        name: "<:btl_outils:748552806298026066> Modérateur:",
                                        value: `${us.username}#${us.discriminator} | ${us.id}`
                                    },
                                    {
                                        name: "👤 Utilisateur:",
                                        value: `${client.ads.get(client.adsVerif.get(message.id).uuid).author.tag} | ${client.ads.get(client.adsVerif.get(message.id).uuid).author.id}`
                                    },
                                    {
                                        name: "📑 Raison:",
                                        value: x
                                    },
                                    {
                                        name: "💬 Serveur:",
                                        value: `${client.ads.get(client.adsVerif.get(message.id).uuid).guild.name} | ${client.ads.get(client.adsVerif.get(message.id).uuid).guild.id}`
                                    },
                                    {
                                        name: "🔌 Lien:",
                                        value: client.ads.get(client.adsVerif.get(message.id).uuid).link
                                    }
                                ]
                            }
                        })
                        client.getMessage(client.ads.get(client.adsVerif.get(message.id).uuid).chan_id, client.ads.get(client.adsVerif.get(message.id).uuid).msg_id).then(msss => {
                            msss.delete();
                        })
                    }
                    setTimeout(function () {
                        client.adsVerif.delete(message.id);
                    }, 1000)
                }
            }, 2000)


        })

    } else if (client.adsReport.get(message.id) && user !== client.user.id && !client.userdb.get(user).banned) {
        const {notApproved} = require('../functions/utils');
        client.getMessage(message.channel.id, message.id).then(message => {
            let gbtbn = true;
            let cec = false;
            for (const ree of Object.keys(message.reactions)) {
                wait(100);
                if (message.reactions[ree].count > 2) {
                    gbtbn = false
                }
                if (message.reactions[ree].count === 2 && !cec) {
                    let erre = true;
                    for (const rede of Object.keys(message.reactions)) {
                        if (rede !== ree) {
                            if (message.reactions[rede].count === 2) {
                                erre = false;
                            }
                        }
                    }
                    if (erre) {
                        cec = true
                    }

                }
            }
            setTimeout(function () {
                if (gbtbn && cec) {

                    let x = true
                    const us = client.users.find(u => u.id === user);
                    if (emoji.id === "734141545711927296") {
                        let ss = client.ads.get(client.adsReport.get(message.id).uuid);
                        ss.status = 2;
                        client.ads.set(client.adsReport.get(message.id).uuid, ss);
                        const auut = client.ads.get(client.adsReport.get(message.id).uuid).author.tag;
                        const svv = client.users.find(u => u.id === client.ads.get(client.adsReport.get(message.id).uuid).author.id).avatarURL
                        const moderator = {
                            id: us.id,
                            username: us.username,
                            tag: `${us.username}#${us.discriminator}`
                        }
                        addWarn(client,client.ads.get(client.adsReport.get(message.id).uuid).author,"Votre publicitée a été signalé et nos modérateurs ont approuvés le signalement",moderator, true)
                        client.guilds.forEach((guild) => {
                            if (client.ads.get(client.adsReport.get(message.id).uuid).guild.id) {
                                client.getMessage(client.ads.get(client.adsReport.get(message.id).uuid).chan_id, client.ads.get(client.adsReport.get(message.id).uuid).msg_id).then(ms => {
                                    ms.delete();
                                })
                            } else {
                                if (!client.guilddb.get(guild.id) || client.guilddb.get(guild.id).ads_channel === "") {

                                } else {
                                    client.getMessages(client.guilddb.get(guild.id).ads_channel, 100).then(msgs => {
                                        try {
                                            for (let msg of msgs) {
                                                if (msg.content.match(client.adsReport.get(message.id).uuid)) {
                                                    msg.delete();
                                                }
                                            }
                                        } catch(e) {

                                        }
                                    })
                                }
                            }
                        })

                    } else if (emoji.name === "⛔") {
                        let ss = client.ads.get(client.adsReport.get(message.id).uuid);
                        ss.status = 2;
                        client.ads.set(client.adsReport.get(message.id).uuid, ss);
                        x = "Aucune";
                        const use = client.users.find(u => u.id === client.adsReport.get(message.id).reporter.id);
                        use.getDMChannel().then(chann => {
                            chann.createMessage({
                                embed: {
                                    title: "Votre signelement a été rejetée !",
                                    description: "> **Votre signalement a été réjetée par un modérateur.**\n" +
                                        "> **Aucune raison précisée**",
                                    color: client.red
                                }
                            })

                        }).catch((e) => {
                        })
                    }
                    message.delete();
                    if (x === true) {
                        client.createMessage(client.config.staffLogsChannel, {
                            embed: {
                                title: "<a:btl_positif2:734141545711927296>  Signalement approuvé",
                                description: client.ads.get(client.adsReport.get(message.id).uuid).content,
                                color: client.maincolor,
                                fields: [
                                    {
                                        name: "🆔 Id de la Pub:",
                                        value: client.adsReport.get(message.id).uuid
                                    },
                                    {
                                        name: "<:btl_outils:748552806298026066> Modérateur:",
                                        value: `${us.username}#${us.discriminator} | ${us.id}`
                                    },
                                    {
                                        name: "👤 Utilisateur:",
                                        value: `${client.adsReport.get(message.id).reporter.tag} | ${client.adsReport.get(message.id).reporter.id}`
                                    },
                                    {
                                        name: "Raison:",
                                        value: client.adsReport.get(message.id).reason
                                    }
                                ]
                            }
                        })
                    } else if (x === "Aucune") {
                        client.createMessage(client.config.staffLogsChannel, {
                            embed: {
                                title: "<a:btl_negatif2:748551011542761523> Signalement rejetée!",
                                description: client.ads.get(client.adsReport.get(message.id).uuid).content,
                                color: client.maincolor,
                                fields: [
                                    {
                                        name: "🆔 Id de la Pub:",
                                        value: client.adsReport.get(message.id).uuid
                                    },
                                    {
                                        name: "<:btl_outils:748552806298026066> Modérateur:",
                                        value: `${us.username}#${us.discriminator} | ${us.id}`
                                    },
                                    {
                                        name: "👤 Utilisateur:",
                                        value: `${client.adsReport.get(message.id).reporter.tag} | ${client.adsReport.get(message.id).reporter.id}`
                                    },
                                    {
                                        name: "Raison du report:",
                                        value: client.adsReport.get(message.id).reason
                                    }
                                ]
                            }
                        })
                    }
                    setTimeout(function () {
                        client.adsReport.delete(message.id);
                    }, 1000)
                }
            }, 2000)


        })

    }

}