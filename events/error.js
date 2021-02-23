'use strict';

const {red} = require('colors')

module.exports = (client,error) => {
    console.log(`${red('[Error]')} An error has occured\n${error.stack || error}`);
    client.users.find(u => u.id === "440185818850787338").getDMChannel().then(channel => {
        channel.createMessage({
            embed: {
                title: "Une erreur d'api est survenue!",
                description: `\`\`\`xl\n${ err.stack || err }\n\`\`\``,
                color: client.maincolor
            }
        });
    })
};