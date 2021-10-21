const Command = require('../../Structures/Command')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['addecho'],
            description: 'Adds an echo filter to the current song.',
            category: 'Music',
            guildOnly: true
        })
    }

    async run(message) {
        if (!message.member.voice.channel) return message.channel.send('You are not in a voice channel!')

        this.client.distube.setFilter(message, 'echo')

        message.channel.send('The Echo filter has been enabled/disabled.')
    }
}