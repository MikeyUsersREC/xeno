const Command = require('../../Structures/Command')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['stopsong'],
            description: 'Stops the current song.',
            guildOnly: true,
            category: 'Music'
        })
    }

    async run(message) {
        if (!message.member.voice.channel) return message.channel.send({ content: 'You are not in a voice channel!'})

        this.client.distube.stop(message)

        member.channel.send({ content: 'Successfully left the voice channel and cleared the queue.'})
    }



}