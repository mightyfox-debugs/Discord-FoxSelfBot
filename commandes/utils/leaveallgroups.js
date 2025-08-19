module.exports = {
    name: "leaveallgroups",
    description: "Quitte tous les groupes DM où le selfbot est présent",
    run: async (client, message, args) => {

        setTimeout(() => message.delete().catch(() => {}), 2000);

        const dms = client.channels.cache.filter(c => c.type === "GROUP_DM");

        if (dms.size === 0) {
            return message.channel.send("𖤐 Aucun groupe à quitter !")
                .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
        }

        let count = 0;

        for (const dm of dms.values()) {
            try {
                await dm.delete();
                count++;
            } catch (err) {
                console.error(`Impossible de quitter le groupe ${dm.id}:`, err);
            }
        }

        message.channel.send(`J'ai quitté ${count} groupes !`)
            .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
    }
};
