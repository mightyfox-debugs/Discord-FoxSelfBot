module.exports = {
    name: "bomb",
    description: "Anime un message style explosion",
    run: async (client, message, args) => {

        setTimeout(() => message.delete().catch(() => {}), 5000);

        const frames = [
            ":bomb: ---------------- :fire:",
            ":bomb: --------------- :fire:",
            ":bomb: -------------- :fire:",
            ":bomb: ------------- :fire:",
            ":bomb: ------------ :fire:",
            ":bomb: ----------- :fire:",
            ":bomb: ---------- :fire:",
            ":bomb: --------- :fire:",
            ":bomb: -------- :fire:",
            ":bomb: ------- :fire:",
            ":bomb: ------ :fire:",
            ":bomb: ----- :fire:",
            ":bomb: ---- :fire:",
            ":bomb: --- :fire:",
            ":bomb: -- :fire:",
            ":bomb: - :fire:",
            ":bomb:  :fire:",
            ":boom:"
        ];

        const msg = await message.channel.send(frames[0]);

        let i = 1;
        const interval = setInterval(() => {
            if (i >= frames.length) {
                clearInterval(interval); 
                setTimeout(() => msg.delete().catch(() => {}), 5000);
            } else {
                msg.edit(frames[i]).catch(() => clearInterval(interval));
                i++;
            }
        }, 2000);
    }
}
