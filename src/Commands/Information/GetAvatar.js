const Command = require('../../Structures/Command')
const util = require('../../Structures/Util')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['avatar', 'getuseravatar', 'av'],
            description: 'Gets avatar from user provided.',
            category: 'Information'
        })
    }

    async run(message, ...args) {
        console.log(args)
        const target = args.join('')
        console.log(target)
        const member = new util().findMember(this.client, message, target)

        if (!member) {
            return message.channel.send('Sorry, you have not provided a valid member.')
        }
        message.reply(member.user.avatarURL({ dynamic: true }) || member.avatarURL({ dynamic: true}))
    }
}