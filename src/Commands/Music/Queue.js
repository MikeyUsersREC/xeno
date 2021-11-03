const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['viewqueue', 'viewq'],
            description: 'Sends the current queue.',
            guildOnly: true,
            category: 'Music'
        })
    }

    async run(message) {

        if (!message.member.voice.channel) return message.channel.send({ content: 'You are not in a voice channel!'})

        const queue = this.client.distube.getQueue(message)

        if (!queue) {
            return message.channel.send({ content: 'No queue available.'})
        }
    
        const Embed = new MessageEmbed()
            .setTitle(`Music Queue`)
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic : true }))
            .setColor(this.client.utils.getColor())
            .setThumbnail(this.client.user.avatarURL())
            .setTimestamp()

        console.log(queue.songs)
		
		if (queue.songs.length > 25) { return message.channel.send({ content: 'Too many songs in queue.')
        
        queue.songs.map((song, id) => Embed.addField(song.name, [`Duration: ${song.formattedDuration}`, `Views: ${song.views}`,  `Likes: ${song.likes}`, `Video: [Watch on YouTube](${song.url})`].join('\n')))
        message.channel.send({ embeds: [Embed]})

    }



}