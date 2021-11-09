const Command = require('../../Structures/Command')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['joinchannel'],
            description: 'Joins your voice channel.',
            guildOnly: true,
            category: 'Music'
        })
    }

    async run(message, ...args) {
        const member = message.member;

        if (!member.voice.channel) return await message.channel.send({ content: '🚫 You are not connected to a voice channel!'})


        member.voice.channel.join().then(connection => message.channel.send({ content: `Successfully connected to **${member.voice.channel.name}**!`}))
    }
}