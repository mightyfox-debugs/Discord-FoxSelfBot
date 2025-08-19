const { Buffer } = require("buffer");

module.exports = {
    name: "halftoken",
    description: "Generate user's half token",
    run: async (client, message, args) => {
        try {
            await message.delete();

            const userMention = message.mentions.users.first();
            if (!userMention) return message.channel.send("⚠️ Veuillez mentionner un utilisateur.").then(msg => {
                setTimeout(() => msg.delete().catch(() => {}), 10000);
            });

            const halfToken = Buffer.from(userMention.id, "ascii").toString("base64");

            await message.channel.send(`> Le début de token de ${userMention} est : \`${halfToken}\``);
        } catch (err) {
            console.error("Erreur lors du Half Token :", err);
        }
    }
};
