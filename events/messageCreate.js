'use strict';

const {cooldown_left} = require("../functions/utils");
const {have_cooldown} = require("../functions/utils");
const {refused, noPerms, botNotAllowed} = require('../embed/refused');
const {owners} = require('../config.json');
const {blue} = require('colors');
const {addUserDb, addGuildDb, addAdDb, wait, error} = require('../functions/utils');

module.exports = async (client, message) => {
    if (message.channel.type === 1) {
        return;
    }
   
    const data = message.content;

    const args = data.slice(client.prefix.length).trim().split(/ +/g);
    const mentions = message.mentions[0]

    if (owners.includes(message.author.id) && data === `${client.prefix}reconnect`) {
        client.disconnect();
        wait(200);
        client.connect();
        await message.channel.createMessage("Bot reconnected");
    }

    await addUserDb(client, message.author.id);
    await addGuildDb(client, message.guildID);
    if (client.guilddb.get(message.guildID).ads_channel === message.channel.id && !message.author.bot && !client.userdb.get(message.author.id).banned) {
        if (await have_cooldown(client, message.author.id)) {
            message.delete()
            await message.channel.createMessage({
                embed: {
                    title: "Cooldown ! ⏰ ",
                    description: `> **Vous avez encore** ${await cooldown_left(client, message.author.id)} **de cooldown.** \n` +
                        "> **Veuillez vérifier que vos messages privés soient ouverts.**",
                    color: client.red
                }
            }).then(msg => {
                setTimeout(function () {
                    msg.delete()
                }, 10000)
            })
        } else {
            await addAdDb(client, message);
            message.channel.getMessages().then(async msgs => {
                let de = false;
                let i = 0;
                for (const msg of msgs) {
                    i++
                    if (msg.author.id === client.user.id) {
                        if (msg.embeds[0].title === "Publicité envoyée avec succès ! 📨") {
                            await msg.delete();
                            de = true
                        }
                    }
                }
                if ((i === 50 && !de) || de) {
                    await message.channel.createMessage({
                        embed: {
                            title: "Publicité envoyée avec succès ! 📨",
                            description: "> **Votre publicité est en cours de vérification par un modérateur.** \n" +
                                "> **Veuillez vérifier que vos messages privés soient ouverts.** ",
                            color: client.green
                        }
                    })
                }
            })
        }
    } else if (client.guilddb.get(message.guildID).ads_channel === message.channel.id && client.userdb.get(message.author.id).banned && !(data.startsWith(client.prefix) || mentions && mentions.id === client.user.id && message.content.startsWith("<"))) {
        message.delete();
    } else if (data.startsWith(client.prefix) || mentions && mentions.id === client.user.id && message.content.startsWith("<")) {
        if (mentions && mentions.id === client.user.id && message.content.startsWith("<")) {
            args.shift();
            message.mentions.shift();
        }
        if (!client.cool.get(message.author.id)) {
            client.cool.set(message.author.id, {
                inUse: false
            })
        }
        if (client.cool.get(message.author.id).inUse) {
            message.channel.createMessage({
                embed: {
                    title: "Doucement avec les commandes!",
                    color: client.red
                }
            }).then(msg => {
                setTimeout(function () {
                    msg.delete();
                }, 3000);
            })


            return;
        }


        const command = client.commands.find(cmd => cmd.aliases.includes(args[0])) || client.commands.get(args[0]);
        if (!command) {
            if (mentions && mentions.id === client.user.id && message.content.startsWith("<") && message.content.endsWith(">")) {
                await message.channel.createMessage(`Mon préfix est : \`${client.prefix}\``)
            }

            return;
        }
        if (command.perms === 'owner') {
            if (!client.config.owners.includes(message.author.id)) {
                return refused(message);
            }
        } else if (command.perms !== 'everyone' && command.perms !== 'owner') {

            if (!message.member.permission.has(command.perms)) {


                return refused(message);
            }
        }
        if (!command.botperms[0]) {
        } else {
            for (const perm of command.botperms) {
                if (!client.guilds.find(g => g.id === message.guildID).members.find(u => u.id === client.user.id).permission.has(perm)) {
                    return noPerms(message, perm);
                }
            }
        }
        if (command.botNotAllowed && message.author.bot) {

            return botNotAllowed(message);
        }

        try {


            client.cool.set(message.author.id, {
                inUse: true
            })
            command.run(client, message, args);
            setTimeout(function () {
                client.cool.set(message.author.id, {
                    inUse: false
                })
            }, 1000)


        } catch (err) {
            error(err);
        }

    }


};
