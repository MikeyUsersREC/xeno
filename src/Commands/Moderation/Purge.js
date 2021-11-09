const Command = require('../../Structures/Command')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['purgemessages', 'purgechannel'],
            description: 'Purges the current channel\'s messages.',
            args: true,
            botPerms: 'MANAGE_MESSAGES',
            userPerms: 'MANAGE_MESSAGES',
            guildOnly: true,
            category: 'Moderation'
        })
    }

    async run(message, ...args) {
        let limit = parseInt(args[0]);

        if (limit > 100 || limit === 100) limit = 99

        message.delete()

        message.channel.messages.fetch( { limit: limit })
            .then(messages => message.channel.bulkDelete(messages));

        await message.channel.send({ content: `Successfully deleted ${limit} messages, requested by ${message.author.username}.` })
    }
}