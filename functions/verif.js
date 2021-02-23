const {wait} = require("./utils");
const {error} = require("./utils");
module.exports = {
    uuidv4: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    verifAd: function (client,uuid,message) {
        let tmp = true;
        const de = message.content.replace(/\n/g, ' ').split(/ +/g);
        for (let f = 0; f < de.length; f++) {
            let arr = ""
            if (de[f].match('https://discord.gg/') !== null ) {

                arr = de[f].replace('https://discord.gg/','');

            } else if(de[f].match('discord.gg') !== null) {
                arr = de[f].replace('discord.gg/','');
            }
            if (arr !== "") {
                client.getInvite(arr).then(() => {
                }).catch(() => {
                        tmp = false;
                })

            }
        }

        setTimeout(function() {
            if (tmp) {
                const rt = Math.floor(Math.random() * (client.config.staffChannel.length - 0)- (0));
                const channel = client.guilds.find(g => g.id === client.config.staffGuild).channels.find(c => c.id === client.config.staffChannel[rt]);
                channel.createMessage({
                    embed: {
                        title: "<:btl_attention:770286642979274774> Nouvelle pub à verifier!",
                        description: client.ads.get(uuid).content,
                        fields: [
                            {
                                name: "🆔 ID de la Pub:",
                                value: uuid
                            },
                            {
                                name: "👤 Utilisateur:",
                                value: `${client.ads.get(uuid).author.tag} | ${client.ads.get(uuid).author.id}`
                            },
                            {
                                name: "💬 Serveur:",
                                value: `${client.ads.get(uuid).guild.name} | ${client.ads.get(uuid).guild.id}`
                            },
                            {
                                name: "🔌 Lien:",
                                value: client.ads.get(uuid).link
                            }
                        ],
                        color: client.maincolor
                    }
                }).then(async (msg) => {
                    client.adsVerif.set(msg.id, {
                        id: msg.id,
                        uuid: uuid
                    });
                    await msg.addReaction("btl_positif2:734141545711927296");
                    await msg.addReaction("⛔");
                    await msg.addReaction("🔌");
                    await msg.addReaction("🧯");
                })

            } else {
                const {notApproved} = require('./utils');
                notApproved(client, uuid, "Votre lien d'invitation est invalide.",`${client.user.username}#${client.user.discriminator} | ${client.user.id}`);
            }
        }, 500)

    },
    sendWarn: function(client, user, reason, completeuuid) {
        client.users.find(u => u.id === user.id).getDMChannel().then(channel => {
            channel.createMessage({
                title: "Vous avez été avertis!",
                description: reason,
                fields: [
                    {
                        name: "ID de l'avertissement:",
                        value: `\`${completeuuid}\``
                    }
                ],
                color: client.maincolor,
                footer: {
                    text: client.footer
                }
            })
        })
    }
}