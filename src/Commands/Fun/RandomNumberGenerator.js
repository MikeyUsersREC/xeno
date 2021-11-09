const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')
const Utils = require('../../Structures/Util')

const Util = new Utils();
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['rng', 'pickanumber', 'numberpicker'],
            description: 'Picks a number between a selected range',
            category: 'Fun',
            args: true,
            usage: '<minimum> <maximum>'
        })
    }

    async run(message, ...args) {

        let first = args[0]
        let second = args[1]
        if (first !== undefined && second !== undefined) {

            const randomNumber = Math.floor(Math.random() * (parseInt(second) - parseInt(first)) + parseInt(first));

            const Embed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL( { dynamic: true }))
                .setColor(Util.getColor())
                .setTimestamp()
                .setTitle('Random Number Generator')
                .addField(`Picked between ${first} and ${second}`, [
                    `❯ The number is ${randomNumber}`
                ].join('\n'));

                await message.channel.send({ embeds: [Embed]})
            } else {
                await message.channel.send({ content: 'You have not provided 2 numbers.'})
        }
    }
}