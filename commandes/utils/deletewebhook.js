const { WebhookClient } = require("discord.js-selfbot-v13");

module.exports = {
    name: "deletewebhook",
    description: "Supprime un webhook via son URL",
    run: async (client, message, args) => {
        setTimeout(() => message.delete().catch(() => {}), 2000);

        if (!args[0]) {
            return message.channel.send("𖤐 Usage : \n› +deletewebhook <url>")
                .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
        }

        try {
            const url = args[0];
            const webhook = new WebhookClient({ url });
            await webhook.delete();

            message.channel.send("Webhook supprimé !")
                .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
        } catch (err) {
            message.channel.send("Impossible de supprimer le webhook. Vérifie l'URL !")
                .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
        }
    }
};
