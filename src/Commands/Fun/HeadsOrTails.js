const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')
const Utils = require('../../Structures/Util')
const Util = new Utils();
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['coinflip'],
            description: 'Plays \'Coinflip\'',
            category: 'Fun',
        })
    }

    async run(message, ...args) {
        const choices = [
            'Heads',
            'Tails'
        ]
        const picked = choices[Math.floor(Math.random() * choices.length)]

        const Embed = new MessageEmbed()
            .setColor(Util.getColor())
            .setAuthor(message.author.username, message.author.displayAvatarURL( { dynamic: true }))
            .setTitle('Coinflip')
            .setDescription('Heads or Tails? Please wait a couple seconds for the results to appear.')
            .setTimestamp()



        let msg = await message.channel.send({ embeds: [Embed]})

        setTimeout(function() {msg.edit({ embeds: [Embed.addField('Result', `${picked}!`).setColor(picked === 'Heads' ? 0x3498DB : 0xE74C3C)]})}, 10000)
}
}