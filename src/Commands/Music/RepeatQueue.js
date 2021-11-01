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
        if (!message.member.voice.channel) return message.channel.send({ content: 'You are not in a voice channel!'})

        let mode = this.client.distube.setRepeatMode(message, 2)
        message.channel.send({ content: mode === 2 ? 'Queue-loop has been enabled.' : 'Queue-loop has been disabled.'})
    }
}