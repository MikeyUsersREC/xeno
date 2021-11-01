const Command = require('../../Structures/Command')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['playsound'],
            description: 'Plays music in the current voice channel.',
            guildOnly: true,
            category: 'Music',
            args: true
        })
    }

    async run(message, ...search) {
        if (!message.member.voice.channel) return message.channel.send({ content: 'You are not in a voice channel!'})

        let query = search.join(' ')

        this.client.distube.play(message, query)


    }



}