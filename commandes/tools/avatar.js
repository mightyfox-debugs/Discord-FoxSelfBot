module.exports = {
    name: "avatar",
    description: "Affiche l’avatar d’un utilisateur",
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || client.users.cache.get(args[0]);
        if (!user) return message.channel.send("𖤐 Utilisateur introuvable.");

        await message.channel.send(user.displayAvatarURL({ dynamic: true, size: 1024 }));
    }
};
