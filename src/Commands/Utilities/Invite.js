const Command = require('../../Structures/Command')
const { Permissions } = require('discord.js')


module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['invitebot'],
            description: 'Invite the bot to your server.',
            category: 'Utilities'
        })
    }

    async run(message) {
        const invite = this.client.generateInvite({
            permissions: [
                Permissions.FLAGS.ADMINISTRATOR,
                Permissions.FLAGS.MANAGE_GUILD,
                Permissions.FLAGS.MANAGE_ROLES,
                Permissions.FLAGS.SEND_MESSAGES,
            ],
            
            scope: [
                'bot',
                'application.commands'
            ]
        })

        message.reply(`${invite}`)
    }
}