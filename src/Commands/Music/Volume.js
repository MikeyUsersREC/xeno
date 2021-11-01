const Command = require('../../Structures/Command')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['changevolume', 'vol'],
            description: 'Changes the volume of the queue.',
            guildOnly: true,
            category: 'Music'
        })
    }

    async run(message, ...args) {

        let volume = parseInt(args.join(''))

        if (!message.member.voice.channel) return message.channel.send({ content: 'You are not in a voice channel!'})

        this.client.distube.setVolume(message, volume)

        message.channel.send({ content: `Successfully set the volume to \`${volume}\``})
    }



}