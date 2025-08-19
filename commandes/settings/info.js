const { Client } = require("discord.js-selfbot-v13");
const fs = require("fs");
const path = require("path");

module.exports = {
    name: "info",
    description: "Affiche les informations du selfbot",
    run: async (client, message, args) => {
        const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

        function countCommands(dir) {
            let count = 0;
            const files = fs.readdirSync(dir);
            for (const file of files) {
                const fullPath = path.join(dir, file);
                if (fs.statSync(fullPath).isDirectory()) {
                    count += countCommands(fullPath);
                } else if (file.endsWith('.js')) {
                    count++;
                }
            }
            return count;
        }

        const commandesFolder = './commandes';
        const nbCommandes = countCommands(commandesFolder);

        try {
            const msg = await message.channel.send("S3LFBOT");
            const botLatency = msg.createdTimestamp - message.createdTimestamp;

            setTimeout(() => {
                msg.delete().catch(() => {});
            }, 1000);

            const infos = "𖤐 **Informations du Selfbot**\n" +
                "› Nom du compte : `" + client.user.tag + "`\n" +
                "› ID du compte : `" + client.user.id + "`\n" +
                "› Nombre de guilds : `" + client.guilds.cache.size + "`\n" +
                "› Nombre de commandes : `" + nbCommandes + "`\n" +
                "› Latence Bot : `" + Math.round(botLatency) + "ms`\n" +
                "› Latence API : `" + Math.round(client.ws.ping) + "ms`\n" +
                "› Version : `" + require("../../package.json").version + "`";

            await message.channel.send(infos);
        } catch (err) {
            console.error("Erreur lors de l'envoi du message info :", err);
        }
    }
};
