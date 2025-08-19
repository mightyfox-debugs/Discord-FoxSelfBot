module.exports = {
    name: "renew",
    description: "Recrée le salon actuel avec les mêmes propriétés",
    run: async (client, message, args) => {
        try {
            const channel = message.channel;

            const cloneOptions = {
                type: channel.type,
                topic: channel.topic,
                nsfw: channel.nsfw,
                bitrate: channel.bitrate,
                userLimit: channel.userLimit,
                rateLimitPerUser: channel.rateLimitPerUser,
                parent: channel.parent,
                position: channel.rawPosition,
                permissionOverwrites: channel.permissionOverwrites.cache.map(overwrite => ({
                    id: overwrite.id,
                    allow: overwrite.allow.bitfield,
                    deny: overwrite.deny.bitfield,
                    type: overwrite.type
                }))
            };

            const newChannel = await channel.clone(cloneOptions);

            await channel.delete();

            await newChannel.setPosition(cloneOptions.position);

            await newChannel.send("𖤐 Ce salon a été recréé (renew).");
        } catch (e) {
            await message.channel.send("𖤐 Impossible de renew ce salon.");
        }
    }
};
