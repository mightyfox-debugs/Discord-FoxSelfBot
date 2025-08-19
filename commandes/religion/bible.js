const fetch = require("node-fetch");

module.exports = {
    name: "bilbe",
    description: "Get a random Bible verse",
    run: async (client, message, args) => {
        try {
            await message.delete();

            const response = await fetch("https://bible-api.com/data/kjv/random");
            const data = await response.json();

            if (!data.random_verse) return message.channel.send("Impossible de récupérer un verset.");

            const verse = data.random_verse;
            const translation = data.translation?.identifier?.toUpperCase() || "KJV";

            const msg = `📖 ${verse.text}\n> - ${verse.book} ${verse.chapter}:${verse.verse} (${translation})`;

            await message.channel.send(msg);
        } catch (err) {
            console.error("Erreur lors de la récupération du verset :", err);
        }
    }
};
