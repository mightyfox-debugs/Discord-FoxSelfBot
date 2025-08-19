module.exports = {
    name: "terrorist",
    description: "Envoie un gif terrorist XD !",
    run: async (client, message, args) => {

        setTimeout(() => message.delete().catch(() => {}), 2000);

        const terroristGif = `https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXFjOGczZnV4c2Z6eWR2YWR5YzNmd3A3NThvMnhudHo4bmNhcnY1OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0Hlxx0OjnYMWZT3O/giphy.gif`;

        const msg = await message.channel.send(terroristGif);
    }
}
