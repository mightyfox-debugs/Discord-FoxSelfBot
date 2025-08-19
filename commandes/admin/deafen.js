const { Client } = require("discord.js-selfbot-v13");

module.exports = {
    name: "deafen",
    description: "Deafen un membre dans un canal vocal (mute + écoute)",
    run: async (client, message, args) => {
        if (message.author.id === client.user.id) return;

        const config = require("../../config.json");
        if (!config.MODERATION_DEAFEN) return message.channel.send("Vous n'avez pas la permission de deafen.");

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send("Veuillez mentionner un membre à deafen.");

        try {
            await member.voice.setDeaf(true, "Deafen command");
            const msg = await message.channel.send(`${member.user.tag} a été deafen en vocal.`);
            
            setTimeout(() => message.delete().catch(() => {}), 1000);
        } catch (err) {
            console.error("Erreur deafen :", err);
            message.channel.send("Impossible de deafen ce membre.");
        }
    }
};
