'use strict';
const {green,blue} = require('colors');


module.exports = (client) => {


    console.log(green('[Bot]')+' Logged in as ' + green(`${client.user.username}#${client.user.discriminator}`));


    client.editStatus('online',{name:'BalanceTonServeur is Starting...',type:3});
    console.log(`${green('[Bot]')} Playing: ${blue('BalanceTonServeur is Starting...')}`)

    setInterval(function () {

            client.editStatus('online',{name:'by: ArviX#8443',type:1,url:"https://twitch.tv/nasa"});
        },
        60000);

    process.on('uncaughtException', function(err) {
    client.users.find(u => u.id === "440185818850787338").getDMChannel().then(channel => {
            channel.createMessage({
                embed: {
                    title: "<:btl_attention:770286642979274774> Une erreur est survenue!",
                    description: `\`\`\`xl\n${ err.stack || err }\n\`\`\``,
                    color: client.maincolor
                }
            });
        })
    })



};