module.exports = async(client,guild) => {
    try {
        const owner = client.users.find(u => u.id === guild.ownerID)
        await client.createMessage(client.config.added, {
            embed: {
                title: "Un serveur en moins!",
                author: {
                    name: guild.name,
                    url: `${guild.vanityURL ? guild.vanityURL : ''}`,
                    icon_url: guild.iconURL ? guild.iconURL : ''
                },
                description: `**👥 Nombre de Membres:** \`${guild.members.size}\`\n` +
                    `**👑 Propriétaire:** \`${owner.username}#${owner.discriminator}\`\n` +
                    `**<:btl_cadeau:748552129043759244> Niveau de Boost:** \`${guild.premiumTier}\` / \`${guild.premiumSubscriptionCount}\` Booster\n`,
                color: client.maincolor,
                footer: {
                    text: `© ${client.user.username}`,
                    icon_url: client.user.avatarURL
                },
                thumbnail: {
                    url: guild.iconURL ? guild.iconURL : ''
                },
                timestamp: new Date()
            }
        })
    } catch(e) {
        await client.createMessage(client.config.added, {
            embed: {
                title: "Un serveur en moins!",
                author: {
                    name: guild.name,
                    url: `${guild.vanityURL ? guild.vanityURL : ''}`,
                    icon_url: guild.iconURL ? guild.iconURL : ''
                },
                description: `👥 Nombre de Membres: \`${guild.members.size}\`\n` +
                    `👑 Propriétaire: \`${guild.ownerID}\`\n` +
                    `<:btl_cadeau:748552129043759244> Niveau de Boost: \`${guild.premiumTier}\` / \`${guild.premiumSubscriptionCount}\` Booster\n`,
                color: client.maincolor,
                footer: {
                    text: `© ${client.user.username}`,
                    icon_url: client.user.avatarURL
                },
                thumbnail: {
                    url: guild.iconURL ? guild.iconURL : ''
                },
                timestamp: new Date()
            }
        })
    }

}