const { Client } = require("discord.js-selfbot-v13");
const fs = require("fs");
const path = require("path");

const config = require("./config.json");
const client = new Client({ checkUpdate: false });

global.autoUndeafenEnabled = false;

client.prefix = config.prefix;

client.sendTempMessage = (channel, content, delay = 4000) => {
    channel.send(content).then(msg => {
        setTimeout(() => msg.delete().catch(() => {}), delay);
    });
};

client.commands = new Map();
const commandFolders = fs.readdirSync(path.join(__dirname, "commandes"));

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(path.join(__dirname, "commandes", folder)).filter(f => f.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./commandes/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.on("messageCreate", message => {
    if (message.author.id !== client.user.id) return;
    if (!message.content.startsWith(client.prefix)) return;

    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const cmdName = args.shift().toLowerCase();

    const command = client.commands.get(cmdName);
    if (command) {
        command.run(client, message, args);
    }
});

client.on("voiceStateUpdate", async (oldState, newState) => {
    if (!global.autoUndeafenEnabled) return;
    if (newState.member.id !== client.user.id) return;

    if (oldState.selfDeaf === false && newState.selfDeaf === true) {
        try { await newState.setDeaf(false, "Auto Undeafen"); } catch {}
    }

    if (oldState.selfMute === false && newState.selfMute === true) {
        try { await newState.setMute(false, "Auto Unmute"); } catch {}
    }
});

const lastDeleted = new Map();

client.on("messageDelete", msg => {
    if (!msg.author || msg.author.bot) return;
    lastDeleted.set(msg.channel.id, { content: msg.content, author: msg.author.tag });
});

client.lastDeleted = lastDeleted;


client.login(config.token).then(() => {
    console.log("Connecté au compte " + client.user.tag);
});
