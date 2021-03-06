const Command = require('../../Structures/Command')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['skipsong'],
            description: 'Skips the current song.',
            guildOnly: true,
            category: 'Music'
        })
    }

    async run(message) {
        if (!message.member.voice.channel) return await message.channel.send({ content: 'You are not in a voice channel!'})

        this.client.distube.skip(message).catch(err => console.log(err))

        await message.channel.send({ content: 'Successfully skipped the current song!'})
    }



}