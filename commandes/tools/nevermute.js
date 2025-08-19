const { Client } = require("discord.js-selfbot-v13");
const fs = require("fs");

let autoUndeafenEnabled = false;

module.exports = {
    name: "neverdeaf",
    description: "Active ou désactive l'auto undeafen et unmute",
    run: async (client, message, args) => {
        if (!args[0] || (args[0].toLowerCase() !== "on" && args[0].toLowerCase() !== "off")) {
            const msg = await message.channel.send("Veuillez utiliser `+neverdeaf on` ou `+neverdeaf off`.");
            setTimeout(() => msg.delete().catch(() => {}), 10000);
            return;
        }

        autoUndeafenEnabled = args[0].toLowerCase() === "on";

        const statusMsg = await message.channel.send(
            `Auto undeafen et unmute ont été **${autoUndeafenEnabled ? "activés" : "désactivés"}**.`
        );
        setTimeout(() => statusMsg.delete().catch(() => {}), 10000);

        await message.delete().catch(() => {});
    }
};