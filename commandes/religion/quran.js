const fetch = require("node-fetch");

module.exports = {
    name: "quran",
    description: "Get a random Quran verse",
    run: async (client, message, args) => {
        try {
            await message.delete();

            const response = await fetch("https://api.alquran.cloud/v1/ayah/random/en.asad");
            const data = await response.json();

            if (!data.data) return message.channel.send("Impossible de récupérer un verset.");

            const verse = data.data;
            const msg = `📖 **${verse.surah.englishName} (${verse.surah.number}:${verse.numberInSurah})**\n` +
                        `${verse.text}`;

            await message.channel.send(msg);
        } catch (err) {
            console.error("Erreur lors de la récupération du verset :", err);
        }
    }
};
