module.exports = {
    name: "virus",
    description: "Anime un message de type packing/injection",
    run: async (client, message, args) => {
              
        if (!args[0]) {
            return message.channel.send("Veuillez mettre un nom de fichier à injecter !")
                .then(msg => setTimeout(() => msg.delete().catch(() => {}), 5000));
        }

        setTimeout(() => message.delete().catch(() => {}), 2000);

        const text = args.join(" ");

        const frames = [
            `\`\`[] / ${text}.exe Packing files.\`\``,
            `\`\`[▓▓▓                    ] / ${text}.exe Packing files..\`\``,
            `\`\`[▓▓▓▓▓▓▓                ] - ${text}.exe Packing files..\`\``,
            `\`\`[▓▓▓▓▓▓▓▓▓▓▓▓           ] \\ ${text}.exe Packing files..\`\``,
            `\`\`[▓▓▓▓▓▓▓▓▓▓▓▓▓▓         ] | ${text}.exe Packing files..\`\``,
            `\`\`[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      ] / ${text}.exe Packing files..\`\``,
            `\`\`[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   ] - ${text}.exe Packing files..\`\``,
            `\`\`[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] \\ ${text}.exe Packing files..\`\``,
            `\`\`Successfully downloaded ${text}.exe\`\``,
            `\`\`Injecting ${text}.exe.   |\`\``,
            `\`\`Injecting ${text}.exe.  /\`\``,
            `\`\`Injecting ${text}.exe... -\`\``,
            `\`\`Successfully Injected ${text}.exe\`\``
        ];

        const msg = await message.channel.send(frames[0]);

        let i = 1;
        const interval = setInterval(() => {
            if (i >= frames.length) {
                clearInterval(interval);
            } else {
                msg.edit(frames[i]).catch(() => {});
                i++;
            }
        }, 2000);
    }
};
