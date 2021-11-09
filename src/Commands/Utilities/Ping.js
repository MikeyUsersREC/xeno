const Command = require('../../Structures/Command.js')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["pong"],
            category: "Utilities"
        })
    }

    async run(message) {
        const msg = await message.channel.send({ content: 'Pinging from CSA...' })

        const latency = msg.createdTimestamp - message.createdTimestamp

        await msg.edit({ content: `Latency: \`${latency}ms\`\nAPI Latency: \`${Math.round(this.client.ws.ping)}ms\``})
    }
}