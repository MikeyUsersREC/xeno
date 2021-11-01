const Command = require('../../Structures/Command')
const fetch = require('node-fetch')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'docs',
            aliases: ['discordjs', 'discord.js'],
            category: 'Information',
            usage: '<query>',
            botPerms: ['ADD_REACTIONS', ['MANAGE_MESSAGES']],
            args: true
        })
    }

    async run(message, ...args) {
        const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(args)}`

        const docFetch = await fetch(url)
        const embed = await docFetch.json();

        if (!embed || embed.error) {
            return message.channel.send({ content: `"${query}" couldn't be located within the discord.js documentation (<https://discord.js.org>)`})
        }

        if (!message.guild) {
            return message.channel.send({ embeds: [embed] })
        }

        const msg = await message.channel.send({ embeds: [embed] })
        msg.react('🗑️');

        let react;
        try {
            react = await message.awaitReactions(
                (reaction, user ) => reaction.emoji.name === '🗑️' && user.id === message.author.id,
                { max: 1, time: 10000, errors: ['time'] }
            )
        } catch (error) {
            msg.reactions.removeAll();
        }

        if (react && react.first()) message.delete()

        return message;
    }
}