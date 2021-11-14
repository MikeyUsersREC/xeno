const Command = require('../../Structures/Command')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['leavechannel'],
            description: 'Leaves your voice channel.',
            guildOnly: true,
            category: 'Music'
        })
    }

    async run(message, ...args) {
        const member = message.member;

        if (!this.client.voice.connections.some(conn => conn.channel.id === member.voice.channel.id)) return await message.channel.send({ content: '🚫 I am not connected to a voice channel that you are in!'})


        this.client.distube.voices.leave(member.voice.channel)
        return await message.channel.send({ content: `Successfully disconnected from **${member.voice.channel.name}**!`})
    }
}