const Command = require('../../Structures/Command.js')
const ms = require('ms')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['ut'],
            category: "Utilities"
        })
    }

    async run(message) {
        message.channel.send({ content: `My uptime is: \`${ms(this.client.uptime, { long: true})}\``});

    }
}