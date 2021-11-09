const Command = require('../../Structures/Command')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['makekareoke'],
            description: 'Adds a kareoke filter to the current song.',
            category: 'Music',
            guildOnly: true
        })
    }

    async run(message) {
        if (!message.member.voice.channel) return await message.channel.send({ content: 'You are not in a voice channel!'})

        this.client.distube.setFilter(message, 'kareoke')

        await message.channel.send({ content: 'The Kareoke filter has been toggled.'})
    }
}