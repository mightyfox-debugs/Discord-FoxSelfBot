const { Client } = require("discord.js-selfbot-v13");

module.exports = {
    name: "clear",
    description: "Supprime des messages selon les arguments",
    run: async (client, message, args) => {
        if (!message.channel.isText()) return;

        try {
            setTimeout(() => {
                message.delete().catch(() => {});
            }, 1000);

            if (args[0] === "user" && message.mentions.users.size > 0) {
                const user = message.mentions.users.first();
                const limit = parseInt(args[2]) || 100;
                const fetched = await message.channel.messages.fetch({ limit: 100 });
                const userMessages = fetched
                    .filter(m => m.author.id === user.id && m.id !== message.id)
                    .first(limit);

                for (const msg of userMessages) {
                    await msg.delete().catch(() => {});
                }
                return message.channel.send(`𖤐 Messages de ${user.tag} supprimés.`)
                    .then(m => setTimeout(() => m.delete().catch(() => {}), 2000));
            }

            const number = parseInt(args[0]);
            if (!isNaN(number)) {
                const fetched = await message.channel.messages.fetch({ limit: number + 1 });
                const messagesToDelete = fetched.filter(m => m.id !== message.id).first(number);

                for (const msg of messagesToDelete) {
                    await msg.delete().catch(() => {});
                }
                return message.channel.send(`𖤐 ${number} messages supprimés.`)
                    .then(m => setTimeout(() => m.delete().catch(() => {}), 2000));
            }

            const fetchedAll = await message.channel.messages.fetch({ limit: 100 });
            const messagesToDeleteAll = fetchedAll.filter(m => m.id !== message.id);
            for (const msg of messagesToDeleteAll.values()) {
                await msg.delete().catch(() => {});
            }
            return message.channel.send(`𖤐 Tous les messages récents supprimés.`)
                .then(m => setTimeout(() => m.delete().catch(() => {}), 2000));

        } catch (err) {
            console.error("Erreur lors du clear :", err);
        }
    }
};
