module.exports = {
    name: "dmall",
    description: "Envoyer un message à tous les amis",
    run: async (client, message, args) => {
        setTimeout(() => message.delete().catch(() => {}), 2000);

        const mode = args[0];
        const msg = args.slice(1).join(" ");

        if (!mode || !msg) {
            return message.channel.send("𖤐 Utilisation : +dmall <slow/burst> <message>")
                .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
        }

        const friends = client.relationships.cache.filter(r => r.type === 1);
        const total = friends.size;

        message.channel.send(`𖤐 Envoi du message en mode \`${mode}\` à \`${total}\` DMs...`)
            .then(tempMsg => {
                setTimeout(() => tempMsg.delete().catch(() => {}), 8000); 
            });

        for (const r of friends.values()) {
            try {
                const dm = await r.user.createDM();
                if (mode === "slow") {
                    await new Promise(r => setTimeout(r, 1500));
                }
                dm.send(msg).catch(() => {});
            } catch(e) {}
        }
    }
};
