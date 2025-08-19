const { Message } = require("discord.js-selfbot-v13");

module.exports = {
    name: "roleall",
    description: "Ajoute un rôle à tous les membres du serveur",
    /**
     * 
     * @param {import("discord.js-selfbot-v13").Client} client 
     * @param {Message} message 
     * @param {string[]} args 
     */
    run: async (client, message, args) => {
        if (!message.guild) return message.channel.send("𖤐 Cette commande doit être utilisée dans un serveur.");
        
        const roleArg = args[0];
        if (!roleArg) return message.channel.send("𖤐 Utilisation : \n› +roleall <@mentions/id/nom>");

        let role = message.mentions.roles.first() 
                || message.guild.roles.cache.get(roleArg) 
                || message.guild.roles.cache.find(r => r.name.toLowerCase() === roleArg.toLowerCase());

        if (!role) return message.channel.send("𖤐 Rôle introuvable.");
        
        message.channel.send(`𖤐 Ajout du rôle **${role.name}** à tous les membres...`);

        let success = 0, failed = 0;
        for (const member of message.guild.members.cache.values()) {
            try {
                await member.roles.add(role.id);
                success++;
            } catch {
                failed++;
            }
        }

        message.channel.send(`𖤐 Terminé : **${success}** succès, **${failed}** erreurs.`);
    }
};
