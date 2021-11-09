const Command = require('../../Structures/Command')

const responses = [
    'Yes.',
    'That will happen.',
    'No.',
    'Most likely.',
    'Probably.',
    "Probably not",
    "Might happen.",
    "Maybe."
]

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["predict"],
            category: "Fun"
        })
    }

    async run(message) {
        await message.channel.send({ content: `${message.content.endsWith('?') ? responses[Math.floor(Math.random() * responses.length)] : "You do not have a valid question."}`})
    }
}