const fs = require('fs');
const path = require('path');
const { WebhookClient, MessageEmbed } = require('discord.js-selfbot-v13');

module.exports = {
    name: "dmlogger",
    description: "Gère le système de logging des DMs",
    run: async (client, message, args) => {
        setTimeout(() => message.delete().catch(() => {}), 2000);

        if (!args[0]) {
            return message.channel.send("𖤐 Usage : \n› +dmlogger <on/off/webhook> [url]")
                .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
        }

        const configPath = path.join(__dirname, "../../config.json");
        let config = JSON.parse(fs.readFileSync(configPath, "utf8"));

        if (!config.dmlogger) {
            config.dmlogger = {
                enabled: false,
                webhook: null
            };
        }

        switch (args[0].toLowerCase()) {
            case "on":
                config.dmlogger.enabled = true;
                fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
                message.channel.send("𖤐 DM Logger activé!")
                    .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
                break;

            case "off":
                config.dmlogger.enabled = false;
                fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
                message.channel.send("𖤐 DM Logger désactivé!")
                    .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
                break;

            case "webhook":
                if (!args[1]) {
                    return message.channel.send("𖤐 Veuillez fournir une URL de webhook!")
                        .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
                }

                try {
                    const webhook = new WebhookClient({ url: args[1] });
                    
                    const testEmbed = new MessageEmbed()
                        .setTitle("🔄 Test de connexion DM Logger")
                        .setColor("#2f3136")
                        .setDescription("Le système de logging est fonctionnel!")
                        .setFooter({ text: "DM Logger" })
                        .setTimestamp();

                    await webhook.send({
                        username: `${client.user.username}`,
                        avatarURL: client.user.displayAvatarURL(),
                        embeds: [testEmbed]
                    });

                    config.dmlogger.webhook = args[1];
                    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

                    message.channel.send("𖤐 Webhook mis à jour avec succès!")
                        .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
                } catch (err) {
                    message.channel.send("𖤐 Webhook invalide! Vérifiez l'URL.")
                        .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
                }
                break;

            default:
                message.channel.send("𖤐 Option invalide! Utilisez on/off/webhook")
                    .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
        }
    }
};