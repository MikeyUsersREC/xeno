const Command = require('../../Structures/Command')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['addsurroundsound', 'makesurround'],
            description: 'Adds a surround-sound filter to the current song.',
            category: 'Music',
            guildOnly: true
        })
    }

    async run(message) {
        if (!message.member.voice.channel) return await message.channel.send({ content: 'You are not in a voice channel!'})

        this.client.distube.setFilter(message, 'surround').catch(err => { return message.channel.send('An error occured.') })

        await message.channel.send({ content: 'The Surround filter has been toggled.' })
    }
}