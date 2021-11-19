const Command = require('../../Structures/Command')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['makevaporwave'],
            description: 'Adds a vaporwave filter to the current song.',
            category: 'Music',
            guildOnly: true
        })
    }

    async run(message) {
        if (!message.member.voice.channel) return await message.channel.send({ content: 'You are not in a voice channel!'})

        this.client.distube.setFilter(message, 'vaporwave').catch(err => { return message.channel.send('An error occured.') })

        await message.channel.send({ content: 'The Vaporwave filter has been toggled.' })
    }
}