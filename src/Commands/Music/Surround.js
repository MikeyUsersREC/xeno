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
        if (!message.member.voice.channel) return message.channel.send('You are not in a voice channel!')

        this.client.distube.setFilter(message, 'surround')

        message.channel.send('The Surround filter has been enabled/disabled.')
    }
}