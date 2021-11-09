const Command = require('../../Structures/Command')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['pausesong'],
            description: 'Pauses the current song.',
            guildOnly: true,
            category: 'Music'
        })
    }

    async run(message) {

        if (!message.member.voice.channel) return await message.channel.send({ content: 'You are not in a voice channel!'})

        this.client.distube.pause()

        await member.channel.send({ content: 'Paused the queue!'})
    }



}