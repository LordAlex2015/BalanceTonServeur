const {textSync} = require('figlet'),
    {red} = require('colors'),
    pr_ms = require('parse-ms')
    const verif = require('./verif');
module.exports = {
    wait: function wait(ms) {
        const start = new Date().getTime();
        let end = start;
        while (end < start + ms) {
            end = new Date().getTime();
        }
    },
    error: function (error) {
        console.log(
            '-------------------------------------------------------------------------' + '\n' +
            textSync('ERROR') + '\n' +
            '-------------------------------------------------------------------------' + '\n' +
            red(error) + '\n' +
            '-------------------------------------------------------------------------' + '\n'
        )

    },
    addUserDb: async (client, user_id) => {
        if(!client.userdb.get(user_id)) {
            client.userdb.ensure(user_id, {
                id: user_id,
                rank: 0,
                banned: false
            })
        }
        if(!client.warn_user.get(user_id)) {
            client.warn_user.ensure(user_id, {
                warns: []
            })
        }
    },
    addGuildDb: async (client, guild_id) => {
        if(!client.guilddb.get(guild_id)) {
            client.guilddb.ensure(guild_id, {
                id: guild_id,
                ads_channel: "",
                banned: false
            })
        }
    },
    have_cooldown: function (client, user_id) {
        return new Promise((resolve) => {
            if(!client.cooldown.get(user_id)) {
                client.cooldown.ensure(user_id, {
                    active: false,
                    finish: 0
                })
            }
                if (client.cooldown.get(user_id).active && client.cooldown.get(user_id).finish !== 0) {
                    let userdb = client.cooldown.get(user_id);
                    if (userdb.finish <= Date.now()) {
                        userdb = {
                            active: false,
                            finish: 0
                        }
                        client.cooldown.set(user_id, userdb)
                    } else {
                        resolve(true);
                    }
                } else {
                    resolve(false)
                }

        })

    },
    cooldown_left: function (client, user_id) {
        return new Promise((resolve) => {
            let now = Date.now();
            let left = pr_ms(client.cooldown.get(user_id).finish - now);
            let ll = "";

            if (left.hours) {
                ll += `${left.hours} heures, `
            }
            if (left.minutes) {
                ll += `${left.minutes} minutes, `
            }
            if (left.seconds) {
                ll += `${left.seconds} secondes `
            }

            resolve(ll);
        })
    },
    formatDate: function (date) {
        return new Intl.DateTimeFormat('fr-FR').format(date)
    },
    addAdDb: function (client, message) {
        let uuid = verif.uuidv4();
        while (client.ads.get(uuid)) {
            uuid = verif.uuidv4();
        }
        client.ads.set(uuid, {
            id: uuid,
            content: message.content,
            author: {
                id: message.author.id,
                username: message.author.username,
                tag: `${message.author.username}#${message.author.discriminator}`
            },
            guild: {
                id: message.guildID,
                name: message.member.guild.name
            },
            link: `https://discordapp.com/channels/${message.guildID}/${message.channel.id}/${message.id}`,
            /*
                0: Not Verified
                1: Verified GOOD
                2: Not Good
             */
            status: 0,
            msg_id : message.id,
            chan_id: message.channel.id
        })
        if(!client.config.owners.includes(message.author.id)) {
            const usse = client.userdb.get(message.author.id);
            const cooldown = client.cooldown.get(message.author.id);
            if (usse.rank === 0) {
                cooldown.active = true;
                cooldown.finish = Date.now() + 21600000
            } else {
                cooldown.active = true;
                cooldown.finish = Date.now() + 7200000
            }
            client.cooldown.set(message.author.id, cooldown)
        }
        verif.verifAd(client,uuid, message);

    },
    notApproved: function(client,uuid, type, author) {
        let ss = client.ads.get(uuid);
        try {
            client.users.find(u => u.id === ss.author.id).getDMChannel().then(channel => {
                channel.createMessage({
                    embed: {
                        title: "Votre publicité a été refusée ! 📤",
                        description: `> **Votre publicité a été réjetée par un modérateur.**\n> **${type}**`,
                        color: client.red
                    }
                });
            }).catch((e) => {
            })
        } catch(e) {

        }
        ss.status = 2;
        client.ads.set(uuid, ss);
        client.createMessage(client.config.staffLogsChannel, {
            embed: {
                title: "<:btl_negatif:721088304564535376> Publicité rejetée!",
                description: client.ads.get(uuid).content,
                color: client.maincolor,
                fields: [
                    {
                        name: "🆔 Id de la Pub:",
                        value: uuid
                    },
                    {
                        name: "<:btl_outils:748552806298026066> Modérateur:",
                        value: author
                    },
                    {
                        name: "👤 Utilisateur:",
                        value: `${client.ads.get(uuid).author.tag} | ${client.ads.get(uuid).author.id}`
                    },
                    {
                        name: "📑 Raison:",
                        value: type
                    },
                    {
                        name: "💬 Serveur:",
                        value: `${client.ads.get(uuid).guild.name} | ${client.ads.get(uuid).guild.id}`
                    },
                    {
                        name: "🔌 Lien:",
                        value: client.ads.get(uuid).link
                    }
                ]
            }
        })
        client.getMessage(client.ads.get(uuid).chan_id,client.ads.get(uuid).msg_id).then(msss => {
            msss.delete();
        })
        delete dd
        delete ss
    },
    /**
     * @param client
     * @param user
     * @param {String} user.id - User Id
     * @param {String} user.username - User username
     * @param {String} user.tag - User username#discriminator
     * @param {String} reason
     * @param moderator
     * @param {String} moderator.id - Moderator Id
     * @param {String} moderator.username - Moderator Username
     * @param {String} moderator.tag - Moderator username#discriminator
     * @param {boolean} send - If send warn or not
     * @returns {Promise<void>}
     */
    addWarn: async(client, user, reason, moderator, send) => {
        let uuid = verif.uuidv4();
        while (client.warn.get(`BTW-S--${uuid}`)) {
            uuid = verif.uuidv4();
        }
        const completeuuid = `BTW-S--${uuid}`;
        client.warn.set(completeuuid, {
            id: completeuuid,
            raw_id: uuid,
            reason: reason,
            moderator: moderator,
            user: user,
            timestamp: Date.now()
        });
        const user_warn = client.warn_user.get(user.id);
        user_warn.warns.push({id: completeuuid});
        client.warn_user.set(user.id,user_warn);

        if(send) {
            verif.sendWarn(client,user,reason,completeuuid);
        }
    }
}