module.exports = {
    name: "snipe",
    run: (client, message, args) => {
        const snipe = client.lastDeleted.get(message.channel.id);
        if (!snipe) return message.channel.send("Aucun message supprimé à sniper !");
        message.channel.send(`**${snipe.author}:** ${snipe.content}`);
    }
};
