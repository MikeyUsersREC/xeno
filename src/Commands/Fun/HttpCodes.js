const Command = require('../../Structures/Command')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'httpcodes',
            aliases: ['httpcat', '404cat', 'cathttp'],
            description: 'Sends an image of a HTTP code represented by a cat',
            category: 'Fun',
            args: true,
            usage: '<code>'
        })
    }

    async run(message, ...args) {
        const HttpCode = args[0]

        await message.channel.send({ content: `https://http.cat/${HttpCode}`})
    }
}