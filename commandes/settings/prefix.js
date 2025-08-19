const fs = require("fs");

module.exports = {
    name: "prefix",
    description: "Change le préfixe du bot",
    run: async (client, message, args) => {

        setTimeout(() => message.delete().catch(() => {}), 2000);

        if (!args[0]) {
            return message.channel.send(`⚙️ Préfixe actuel : \`${client.prefix}\``)
                .then(msg => setTimeout(() => msg.delete().catch(() => {}), 12000));
        }

        const newPrefix = args[0];
        client.prefix = newPrefix;

        let config = require("../../config.json");

        config.prefix = newPrefix;
        fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));

        message.channel.send(`𖤐 Préfixe changé en : \`${newPrefix}\``)
            .then(msg => setTimeout(() => msg.delete().catch(() => {}), 12000));
    }
};
