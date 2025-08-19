const fs = require("fs");
const path = require("path");

module.exports = {
    name: "backup",
    description: "Système de backup serveur (roles, salons, catégories, emojis, etc.)",
    run: async (client, message, args) => {

        if (!fs.existsSync("./backups")) fs.mkdirSync("./backups");

        const subCommand = args[0];

        if (!subCommand) return message.channel.send("Utilisation : +backup <create/load/delete/list/info> [arguments]");

        if (subCommand.toLowerCase() === "create") {
            const guildId = args[1];
            if (!guildId) return message.channel.send("Indique l'ID du serveur à backup.");
            
            const guild = client.guilds.cache.get(guildId);
            if (!guild) return message.channel.send("Serveur introuvable.");

            const data = {
                name: guild.name,
                iconURL: guild.iconURL(),
                roles: [],
                channels: [],
                emojis: []
            };

            guild.roles.cache.sort((a,b)=>a.position-b.position).forEach(r => {
                if(r.managed) return;
                data.roles.push({
                    name: r.name,
                    color: r.color,
                    hoist: r.hoist,
                    permissions: r.permissions.bitfield.toString(),
                    mentionable: r.mentionable
                });
            });

            guild.channels.cache.sort((a,b)=>a.position-b.position).forEach(c => {
                data.channels.push({
                    name: c.name,
                    type: c.type,
                    parent: c.parentId,
                    position: c.position,
                    nsfw: c.nsfw,
                    topic: c.topic,
                    rateLimitPerUser: c.rateLimitPerUser,
                    permissionOverwrites: c.permissionOverwrites.map(p => ({
                        id: p.id,
                        type: p.type,
                        allow: p.allow.bitfield.toString(),
                        deny: p.deny.bitfield.toString()
                    }))
                });
            });

            guild.emojis.cache.forEach(e => {
                data.emojis.push({
                    name: e.name,
                    url: e.url,
                    animated: e.animated
                });
            });

            const backupId = `${guild.id}_${Date.now()}`;
            const filePath = path.join("./backups", `${backupId}.json`);
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

            return message.channel.send(`𖤐 Backup créé avec l'ID : \`${backupId}\``);
        }

        if (subCommand.toLowerCase() === "load") {
            const backupId = args[1];
            const targetGuildId = args[2];
            if (!backupId || !targetGuildId) return message.channel.send("𖤐 Utilisation : +backup load <backup_id> <server_id>");

            const backupPath = path.join("./backups", `${backupId}.json`);
            if (!fs.existsSync(backupPath)) return message.channel.send("𖤐 Backup introuvable.");

            const guild = client.guilds.cache.get(targetGuildId);
            if (!guild) return message.channel.send("𖤐 Serveur cible introuvable.");

            const data = JSON.parse(fs.readFileSync(backupPath, "utf8"));

            await guild.roles.cache.forEach(r => { if(!r.managed) r.delete().catch(()=>{}); });
            await guild.channels.cache.forEach(c => c.delete().catch(()=>{}));

            for (const r of data.roles) {
                await guild.roles.create({
                    name: r.name,
                    color: r.color,
                    hoist: r.hoist,
                    permissions: BigInt(r.permissions),
                    mentionable: r.mentionable
                }).catch(()=>{});
            }

            const roleMap = {};
            guild.roles.cache.forEach(r => roleMap[r.name] = r.id);

            for (const c of data.channels) {
                const options = {
                    type: c.type,
                    topic: c.topic,
                    nsfw: c.nsfw,
                    parent: c.parent,
                    position: c.position,
                    rateLimitPerUser: c.rateLimitPerUser,
                    permissionOverwrites: c.permissionOverwrites.map(p => ({
                        id: roleMap[p.id] || p.id,
                        allow: BigInt(p.allow),
                        deny: BigInt(p.deny),
                        type: p.type
                    }))
                };
                await guild.channels.create(c.name, options).catch(()=>{});
            }

            for (const e of data.emojis) {
                await guild.emojis.create(e.url, e.name).catch(()=>{});
            }

            return message.channel.send(`𖤐 Backup \`${backupId}\` chargé sur le serveur ${guild.name}.`);
        }

        if (subCommand.toLowerCase() === "delete") {
            const backupId = args[1];
            if (!backupId) return message.channel.send("𖤐 Indique l'ID du backup à supprimer.");
            const filePath = path.join("./backups", `${backupId}.json`);
            if (!fs.existsSync(filePath)) return message.channel.send("𖤐 Backup introuvable.");
            fs.unlinkSync(filePath);
            return message.channel.send(`𖤐 Backup \`${backupId}\` supprimé.`);
        }

        if (subCommand.toLowerCase() === "list") {
            const files = fs.readdirSync("./backups").filter(f => f.endsWith(".json"));
            if (files.length === 0) return message.channel.send("𖤐 Aucun backup trouvé.");
            return message.channel.send("𖤐 **Backups disponibles :**\n" + files.join("\n"));
        }

        if (subCommand.toLowerCase() === "info") {
            const backupId = args[1];
            if (!backupId) return message.channel.send("𖤐 Indique l'ID du backup.");
            const backupPath = path.join("./backups", `${backupId}.json`);
            if (!fs.existsSync(backupPath)) return message.channel.send("𖤐 Backup introuvable.");
            const data = JSON.parse(fs.readFileSync(backupPath, "utf8"));
            return message.channel.send(
                `📄 **Backup Info**\n` +
                `Nom du serveur : ${data.name}\n` +
                `Roles : ${data.roles.length}\n` +
                `Salons : ${data.channels.length}\n` +
                `Emojis : ${data.emojis.length}`
            );
        }

        return message.channel.send("𖤐 Sous-commande inconnue.");
    }
};
