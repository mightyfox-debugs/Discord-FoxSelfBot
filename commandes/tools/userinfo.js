module.exports = {
    name: "userinfo",
    description: "Affiche les infos d’un utilisateur",
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || client.users.cache.get(args[0]);
        if (!user) return message.channel.send("𖤐 Utilisateur introuvable.");

        const member = message.guild ? message.guild.members.cache.get(user.id) : null;

        let info = `👤 **Infos Utilisateur**\n`;
        info += `› Tag : ${user.tag}\n`;
        info += `› ID : ${user.id}\n`;
        info += `› Créé le : ${user.createdAt.toLocaleDateString()}\n`;
        if (member) info += `› Rejoint le serveur : ${member.joinedAt.toLocaleDateString()}\n`;

        await message.channel.send(info);
    }
};
