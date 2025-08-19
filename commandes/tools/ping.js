module.exports = {
    name: "ping",
    description: "Donne la latence du bot et l'API Discord",
    run: async (client, message, args) => {

        setTimeout(() => message.delete().catch(() => {}), 2000);

        const msg = await message.channel.send("Calcul en cours...");
        const botLatency = msg.createdTimestamp - message.createdTimestamp;

        const apiLatency = Math.round(client.ws.ping);

        const text = `🏓 Pong !\nLatence du bot : ${botLatency}ms\nLatence de l'API Discord : ${apiLatency}ms`
        
        msg.edit(text).then(msg => setTimeout(() => msg.delete().catch(() => {}), 12000));

    }
}