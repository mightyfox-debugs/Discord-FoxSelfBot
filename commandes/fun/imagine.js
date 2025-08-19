const { Client, MessageAttachment } = require("discord.js-selfbot-v13");
const fetch = require("node-fetch");
const fs = require("fs");

module.exports = {
    name: "imagine",
    description: "Génère une image AI à partir d'un prompt",
    run: async (client, message, args) => {
        const prompt = args.join(" ");
        if (!prompt) return message.channel.send("𖤐 Veuillez fournir un prompt !").then(msg => {
            setTimeout(() => msg.delete().catch(() => {}), 2000);
        });

        await message.react("🤖").catch(() => {});

        try {
            const seed = Math.floor(Math.random() * 2 ** 32);
            const encodedPrompt = encodeURIComponent(prompt);
            const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&model=flux&nologo=true&private=true&enhance=false&safe=false&seed=${seed}`;

            const response = await fetch(imageUrl);
            if (!response.ok) return message.channel.send(`Erreur lors du téléchargement de l'image: ${response.status}`);

            const buffer = await response.buffer();
            const attachment = new MessageAttachment(buffer, "ai_image.png");

            await message.channel.send({ content: prompt, files: [attachment] });

            setTimeout(() => {
                message.delete().catch(() => {});
            }, 1000);

        } catch (err) {
            console.error("Erreur lors de la génération de l'image AI :", err);
        }
    }
};
