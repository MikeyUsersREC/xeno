const Command = require('../../Structures/Command')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['loopqueue', 'loopq'],
            description: 'Loops the queue indefinitely.',
            category: 'Music',
            guildOnly: true
        })
    }

    async run(message) {
        if (!message.member.voice.channel) return await message.channel.send({ content: 'You are not in a voice channel!'})

        try {
            let mode = this.client.distube.setRepeatMode(message, 2)
			await message.channel.send({ content: mode === 2 ? 'Queue-loop has been enabled.' : 'Queue-loop has been disabled.'})
		} catch {
            return message.channel.send('An error occured')
        }

    }
}