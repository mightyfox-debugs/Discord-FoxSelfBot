const figlet = require("figlet");
const util = require("util");
const figletAsync = util.promisify(figlet.text);

module.exports = {
    name: "ascii",
    description: "Génère un ASCII art du texte",
    run: async (client, message, args) => {
        const input = args.join(" ");
        if (!input) {
            return message.channel.send("𖤐 Usage : \n+ascii <texte>")
                .then(msg => setTimeout(() => msg.delete().catch(() => {}), 12000));
        }

        try {
            const ascii = await figletAsync(input, {
                font: "Standard",
                width: 80,
                whitespaceBreak: true
            });

            if (!ascii) {
                return message.channel.send("𖤐 Impossible de générer l'ASCII art.")
                    .then(msg => setTimeout(() => msg.delete().catch(() => {}), 12000));
            }

            const output = "```\n" + ascii + "\n```";

            if (output.length > 2000) {
                return message.channel.send("⚠️ Le résultat dépasse 2000 caractères. Raccourcis le texte ou change de font.")
                    .then(msg => setTimeout(() => msg.delete().catch(() => {}), 12000));
            }

            message.channel.send(output)
                .then(msg => setTimeout(() => msg.delete().catch(() => {}), 12000));

            setTimeout(() => message.delete().catch(() => {}), 5000);

        } catch (err) {
            console.error(err);
            message.channel.send("𖤐 Erreur lors de la génération de l'ASCII art.")
                .then(msg => setTimeout(() => msg.delete().catch(() => {}), 12000));
        }
    }
};
