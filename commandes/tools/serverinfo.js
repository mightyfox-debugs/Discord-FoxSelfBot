module.exports = {
    name: "serverinfo",
    description: "Affiche les infos d’un serveur",
    run: async (client, message, args) => {
        let guild = message.guild;

        if (!guild && args[0]) guild = client.guilds.cache.get(args[0]);
        if (!guild) return message.channel.send("𖤐 Fournis un ID de serveur valide.");

        let info = `🌍 **Infos Serveur**\n`;
        info += `› Nom : ${guild.name}\n`;
        info += `› ID : ${guild.id}\n`;
        info += `› Propriétaire : <@${guild.ownerId}>\n`;
        info += `› Membres : ${guild.memberCount}\n`;
        info += `› Créé le : ${guild.createdAt.toLocaleDateString()}\n`;

        await message.channel.send(info);
    }
};
