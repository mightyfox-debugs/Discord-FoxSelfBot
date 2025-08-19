const fs = require("fs");
const path = require("path");

module.exports = {
    name: "help",
    description: "Affiche la liste des catégories ou des commandes d'une catégorie",
    run: async (client, message, args) => {

        setTimeout(() => message.delete().catch(() => {}), 5000);

        const commandesPath = path.join(__dirname, "..");

        if (!args[0]) {

            const categories = fs.readdirSync(commandesPath).filter(file =>
                fs.statSync(path.join(commandesPath, file)).isDirectory()
            );
            
            let text = "# ִ𖤐 𝕱𝖔𝖝 \n𝖁𝖔𝖎𝖈𝖎 𝖑𝖊𝖘 𝖈𝖆𝖙é𝖌𝖔𝖗𝖎𝖊𝖘 :\n\n";
            categories.forEach(cat => {
                text += `> › **${cat}**\n`;
            });

            return message.channel.send(text)
                .then(msg => setTimeout(() => msg.delete().catch(() => {}), 12000));
        }

        const category = args[0];
        const categoryPath = path.join(commandesPath, category);

        if (!fs.existsSync(categoryPath)) {
            return message.channel.send(`𖤐 La catégorie "${category}" n'existe pas.`)
                .then(msg => setTimeout(() => msg.delete().catch(() => {}), 12000));
        }

        const commands = fs.readdirSync(categoryPath)
            .filter(file => file.endsWith(".js"))
            .map(file => file.replace(".js", ""));

        if (commands.length === 0) {
            return message.channel.send(`𖤐 Aucune commande trouvée dans la catégorie "${category}".`)
                .then(msg => setTimeout(() => msg.delete().catch(() => {}), 12000));
        }

        let text = `# ִ𖤐 𝕱𝖔𝖝 \n𝖁𝖔𝖎𝖈𝖎 𝖑𝖊𝖘 𝖈𝖔𝖒𝖒𝖆𝖓𝖉𝖊𝖘 :\n\n`;
        commands.forEach(cmd => {
            text += `> › ${cmd}\n `;
        });

        message.channel.send(text)
            .then(msg => setTimeout(() => msg.delete().catch(() => {}), 12000));
    }
};
