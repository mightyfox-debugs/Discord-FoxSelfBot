const { Client } = require('discord.js-selfbot-v13');
let currentVoice = null;

module.exports = {
    name: "afkvocal",
    description: "Commandes AFK Vocal",
    run: async (client, message, args) => {

        const sub = args[0];

        if (sub === "connect") {
            const guildId = args[1];
            const channelId = args[2];

            if (!guildId || !channelId) return message.channel.send("𖤐 Usage : \n› +afkvocal connect <guildId> <channelId>");

            try {
                const guild = await client.guilds.fetch(guildId);
                const channel = await guild.channels.fetch(channelId);

                if (!channel || channel.type !== 'GUILD_VOICE') return message.channel.send("Ce n'est pas un channel vocal valide.");

                currentVoice = await client.voice.joinChannel(channel, { selfDeaf: true });
                message.channel.send(`𖤐 Connecté au vocal: ${channel.name}`);
            } catch (err) {
                console.error(err);
                message.channel.send("Impossible de rejoindre le vocal.");
            }

        } else if (sub === "disconnect") {
            if (currentVoice) {
                currentVoice.disconnect();
                currentVoice = null;
                message.channel.send("Déconnecté du vocal.");
            } else {
                message.channel.send(`**${client.user.tag}** n'est connecté à aucun salon vocal.`);
            }

        } else if (sub === "info") {
            if (currentVoice) {
                message.channel.send(`**${client.user.tag}** viens de se connecter au vocal: ${currentVoice.channel.name}`);
            } else {
                message.channel.send(`**${client.user.tag}** n'est connecté à aucun salon vocal.`);
            }

        } else {
            message.channel.send("𖤐 Usage : \n› +afkvocal connect <server_id> <salon_id>\n› +afkvocal disconnect\n› +afkvocal info");
        }
    }
};
