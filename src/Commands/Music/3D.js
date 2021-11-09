const Command = require('../../Structures/Command')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['add3d', 'make3d'],
            description: 'Adds a 3D filter to the current song.',
            category: 'Music',
            guildOnly: true
        })
    }

    async run(message) {
        if (!message.member.voice.channel) return await message.channel.send({ content: 'You are not in a voice channel!'})

        this.client.distube.setFilter(message, '3d')

        await message.channel.send({ content: 'The 3D filter has been toggled.'})
    }
}