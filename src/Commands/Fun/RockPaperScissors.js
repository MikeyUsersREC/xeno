const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')
const Utils = require('../../Structures/Util')

const Util = new Utils();
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['rps', 'rock', 'paper', 'scissors', 'rpsgame'],
            description: 'Plays the \'Rock Paper Scissors game\'',
            category: 'Fun'
        })
    }

    async run(message, [choice]) {
        if (choice !== undefined) {

            const choices = [
                'rock',
                'paper',
                'scissors'
            ];

            const picked = choices[Math.floor(Math.random() * choices.length)]

            const Embed = new MessageEmbed()
                .setColor(Util.getColor())
                .setAuthor(message.author.username, message.author.displayAvatarURL( { dynamic: true }))
                .setTitle('Rock Paper Scissors')
                .addField(message.author.username, `${choice.trim().replace(/^\w/, (c) => c.toUpperCase())}`)
                .addField(this.client.user.username, `${picked.replace(/^\w/, (c) => c.toUpperCase())}`)
                .setTimestamp()

            message.channel.send({ embeds: [Embed]})
        } else {
            return message.channel.send({ content: "You have not picked a valid option. Options are [rock, paper, scissors]" })
        }
    }
}