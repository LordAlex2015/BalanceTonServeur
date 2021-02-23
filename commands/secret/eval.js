
'use strict';

const Command = require("../../structure/Command.js");
const {text, textSync} = require("figlet")

class Eval extends Command {
    constructor() {
        super({
            name: 'eval',
            category: 'secret',
            perms: "owner",
            botNotAllowed: true
        });
    }

    async run(client, message, args) {
        function clean(text) {
            if (typeof text === "string")
                return text
                    .replace(/`/g, "`" + String.fromCharCode(8203))
                    .replace(/@/g, "@" + String.fromCharCode(8203));
            else return text;

        }
            if (message.content.toLowerCase().match(`token`)) return message.channel.createMessage("Warning! Word 'token' was detected")
           if(message.content.toLowerCase().match('client.disconnect()') && message.author.id !== "440185818850787338") return message.channel.createMessage("Warning! Word 'client.disconnect()' was detected")
 	if(message.content.toLowerCase().match('removerole') && message.author.id !== "440185818850787338") return message.channel.createMessage("Warning! Word 'removeRole' was detected")
 	if(message.content.toLowerCase().match("addrole") && message.author.id !== "440185818850787338") return message.channel.createMessage("Warning! Word 'addRole' was detected")
 try {
                args.shift();
                const code = args.join(" ");
                let evaled = eval(code);
                if (typeof evaled !== "string")
                    evaled = require("util").inspect(evaled);
                await message.channel.createMessage({
                    embed: {
                        title: "Eval",
                        description: `\`\`\`xl\n${clean(evaled)}\`\`\``,
                        color: client.maincolor
                    }
                    });
            } catch (err) {
                message.author.getDMChannel().then(channel => {
                   channel.createMessage({
                       embed: {
                           title: "<:btl_attention:770286642979274774> Une erreur est survenue!",
                           description: `\`\`\`xl\n${ err.stack || clean(err) }\n\`\`\``,
                           color: client.maincolor,
                           footer: {
                               text: "Commande EVAL"
                           },
                           url: `https://discord.com/channels/${message.guildID}/${message.channel.id}/${message.id}`
                       }
                   });
                })
                await message.channel.createMessage({
                    embed: {
                        title: "Une erreur est survenue!",
                        color: client.red
                    }
                });

            }
    }
}

module.exports = new Eval;