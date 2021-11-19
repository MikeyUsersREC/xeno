const Command = require('../../Structures/Command')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['addreverse', 'reversesong'],
            description: 'Adds a reverse filter to the current song.',
            category: 'Music',
            guildOnly: true
        })
    }

    async run(message) {
        if (!message.member.voice.channel) return await message.channel.send({ content: 'You are not in a voice channel!'})

        this.client.distube.setFilter(message, 'reverse').catch(err => { return message.channel.send('An error occured.') }).catch(err => { return message.channel.send('An error occured.') })

        await message.channel.send({ content: 'The Reverse filter has been toggled.'})
    }
}