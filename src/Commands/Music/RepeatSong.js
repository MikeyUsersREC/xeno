const Command = require('../../Structures/Command')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['loopsong', 'loop'],
            description: 'Loops the song indefinitely.',
            category: 'Music',
            guildOnly: true
        })
    }

    async run(message) {
        if (!message.member.voice.channel) return await message.channel.send({ content: 'You are not in a voice channel!'})

        try {
            let mode = this.client.distube.setRepeatMode(message, 1)
        } catch {
            return message.channel.send('An error occured')
        }
        await message.channel.send({ content: mode === 1 ? 'Loop has been enabled.' : 'Loop has been disabled.'})
    }
}