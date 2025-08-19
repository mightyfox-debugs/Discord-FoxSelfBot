module.exports = {
    name: "unlock",
    description: "Unlock un salon (débloque @everyone ou un rôle spécifique)",
    run: async (client, message, args) => {
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        const target = role || message.guild.roles.everyone;

        try {
            await message.channel.permissionOverwrites.edit(target, { SEND_MESSAGES: true });
            await message.channel.send(`𖤐 Salon déverrouillé pour ${role ? role.name : "@everyone"}`);
        } catch (e) {
            await message.channel.send("𖤐 Impossible d’unlock ce salon.");
        }
    }
};
