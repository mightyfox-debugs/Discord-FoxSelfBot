const { Client } = require("discord.js-selfbot-v13");

module.exports = {
    name: "mute",
    description: "Mute un membre dans un canal vocal",
    run: async (client, message, args) => {
        if (message.author.id === client.user.id) return;

        const config = require("../../config.json");
        if (!config.MODERATION_MUTEVC) return message.channel.send("Vous n'avez pas la permission de mute en vocal.");

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send("Veuillez mentionner un membre à mute dans le vocal.");

        try {
            await member.voice.setMute(true, "Mute command");
            const msg = await message.channel.send(`${member.user.tag} a été mute en vocal.`);
            
            setTimeout(() => message.delete().catch(() => {}), 1000);
        } catch (err) {
            console.error("Erreur mute :", err);
            message.channel.send("Impossible de mute ce membre en vocal.");
        }
    }
};
