const Command = require('../../Structures/Command')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['resumesong', 'unpause'],
            description: 'Resumes the queue.',
            guildOnly: true,
            category: 'Music'
        })
    }

    async run(message) {

        if (!message.member.voice.channel) return message.channel.send('You are not in a voice channel!')

        this.client.distube.resume(message)
        
        member.channel.send('Resumed the queue!')
    }



}