module.exports = {
    name: "banner",
    description: "Affiche la bannière d’un utilisateur",
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || client.users.cache.get(args[0]);
        if (!user) return message.channel.send("𖤐 Utilisateur introuvable.");

        try {
            const fetchedUser = await client.users.fetch(user.id, { force: true });
            if (!fetchedUser.banner) return message.channel.send("⚠️ Cet utilisateur n’a pas de bannière.");
            await message.channel.send(fetchedUser.bannerURL({ dynamic: true, size: 1024 }));
        } catch {
            await message.channel.send("𖤐 Impossible de récupérer la bannière.");
        }
    }
};
