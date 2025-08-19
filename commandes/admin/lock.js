module.exports = {
    name: "lock",
    description: "Lock un salon (bloque @everyone ou un rôle spécifique)",
    run: async (client, message, args) => {
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        const target = role || message.guild.roles.everyone;

        try {
            await message.channel.permissionOverwrites.edit(target, { SEND_MESSAGES: false });
            await message.channel.send(`𖤐 Salon verrouillé pour ${role ? role.name : "@everyone"}`);
        } catch (e) {
            await message.channel.send("𖤐 Impossible de lock ce salon.");
        }
    }
};
