module.exports = {
    name: "spam",
    description: "Envoie un message plusieurs fois avec un délai",
    run: async (client, message, args) => {

        setTimeout(() => message.delete().catch(() => {}), 5000);

        if (!args[0] || !args[1] || !args[2]) {
            return message.channel.send("𖤐 Usage: \n› +spam <message> <nombre> <delay en ms>")
                .then(msg => setTimeout(() => msg.delete().catch(() => {}), 12000));
        }

        const msgText = args[0];
        const count = parseInt(args[1]);
        const delay = parseInt(args[2]);

        if (isNaN(count) || isNaN(delay)) {
            return message.channel.send("𖤐 Le nombre et le délai doivent être des nombres valides.")
                .then(msg => setTimeout(() => msg.delete().catch(() => {}), 12000));
        }

        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                message.channel.send(msgText)
                    .then(msg => setTimeout(() => msg.delete().catch(() => {}), 12000))
                    .catch(() => {});
            }, i * delay);
        }
    }
};
