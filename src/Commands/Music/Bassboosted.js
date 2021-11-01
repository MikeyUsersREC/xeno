const Command = require('../../Structures/Command')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['addbass', 'makebassboosted'],
            description: 'Adds a bass-boosted filter to the current song.',
            category: 'Music',
            guildOnly: true
        })
    }

    async run(message) {
        if (!message.member.voice.channel) return message.channel.send({ content: 'You are not in a voice channel!'})

        this.client.distube.setFilter(message, 'bassboost')

        message.channel.send({ content: 'The bass-boosted filter has been toggled.'})
    }
}