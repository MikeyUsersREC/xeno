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

        if (!message.member.voice.channel) return await message.channel.send({ content: 'You are not in a voice channel!'})

		try {
			this.client.distube.setVolume(message, volume)
			await message.channel.send({ content: `Successfully set the volume to \`${volume}\``})
		} catch { message.channel.send({content: 'An error occured.'}) }
		
    }



}