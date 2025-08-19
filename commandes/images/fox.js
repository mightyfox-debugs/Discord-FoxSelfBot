const fs = require("fs");

module.exports = {
    name: "fox",
    description: "Envoie une image aléatoire de renard",

    run: async (client, message, args) => {
        const images = [
            "https://i.ibb.co/0jSHJc5F/fox-face-logo-vector-icon.jpg",
            "https://i.ytimg.com/vi/zpLWd0bFR60/hq720.jpg",
            "https://www.wildlifetrusts.org/sites/default/files/styles/spotlight_default/public/2017-12/Fox%20©JonHawkins0022.jpg",
            "https://media.4-paws.org/e/d/2/a/ed2a6d1b6cecdebba7102baf4f1cf9c8a0e3a1c7/VIER%20PFOTEN_2022-10-05_00103-1824x1263.jpeg",
            "https://shop.wwf.ca/cdn/shop/files/Dmitry-Deshevykh-WWF-Russia_red_fox.jpg?v=1694548960&width=1024",
            "https://www.publicdomainpictures.net/pictures/250000/nahled/fox-in-snow.jpg",
            "https://t3.ftcdn.net/jpg/06/07/00/66/360_F_607006632_bVtEg7QUahZtwfIt8ZNhBBaa3DNcGtfP.jpg"
        ];

        const imageChoisie = images[Math.floor(Math.random() * images.length)];

        try {
            if (imageChoisie.startsWith("http")) {
                await message.channel.send(imageChoisie);
            } else {
                if (fs.existsSync(imageChoisie)) {
                    await message.channel.send({ files: [imageChoisie] });
                } else {
                    await message.channel.send("𖤐 Fichier local introuvable !");
                }
            }
        } catch (err) {
            console.error("Erreur randomimage:", err);
        }
    }
};
