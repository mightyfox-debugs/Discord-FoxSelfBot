const { Client } = require("discord.js-selfbot-v13");

module.exports = {
    name: "timeout",
    description: "Met un membre en timeout (mute temporaire)",
    run: async (client, message, args) => {
        if (message.author.id === client.user.id) return;

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send("Veuillez mentionner un membre pour le timeout.");

        const duration = parseInt(args[1]);
        if (isNaN(duration) || duration <= 0) return message.channel.send("Veuillez spécifier une durée valide en minutes.");

        const reason = args.slice(2).join(" ") || "Pas de raison fournie";

        try {
            const timeoutDuration = Date.now() + duration * 60 * 1000;
            await member.timeout(timeoutDuration, reason);

            const msg = await message.channel.send(`${member.user.tag} a été mis en timeout pendant ${duration} minute(s).`);

            setTimeout(() => message.delete().catch(() => {}), 1000);
        } catch (err) {
            console.error("Erreur timeout :", err);
            message.channel.send("Impossible de mettre ce membre en timeout.");
        }
    }
};
