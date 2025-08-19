const { Client } = require("discord.js-selfbot-v13");

module.exports = {
    name: "ban",
    description: "Bannir un membre",
    run: async (client, message, args) => {
        if (message.author.id === client.user.id) return;

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send("Veuillez mentionner un membre à bannir.");

        const reason = args.slice(1).join(" ") || "Pas de raison fournie";

        try {
            await member.ban({ reason });
            const msg = await message.channel.send(`${member.user.tag} a été banni.`);

            setTimeout(() => message.delete().catch(() => {}), 1000);
        } catch (err) {
            console.error("Erreur ban :", err);
            message.channel.send("Impossible de bannir ce membre.");
        }
    }
};
