const Command = require('../../Structures/Command')
const Util = require('../../Structures/Util')
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['getmemberid', 'fetchid', 'getid'],
            category: 'Moderation',
            guildOnly: true
        })
    }

    async run(message, ...args) {
        console.log(args)
        const target = args.join('')
        console.log(target)
        const member = new Util().findMember(this.client, message, target)

        if (!member) {
            return message.channel.send({ content: 'Sorry, you have not provided a valid member.' })
        }
        message.reply({ content: `${member.tag || member.user.tag}'s ID: \`${member.id}\`'` })
    }
}