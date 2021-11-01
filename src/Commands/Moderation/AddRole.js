const Command = require('../../Structures/Command')
const Utils = require('../../Structures/Util')
const Discord = require('discord.js')

const Util = new Utils();

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['addroles', 'roleadd'],
            args: true,
            usage: '<Member> <Role>',
            guildOnly: true,
            description: 'Adds a role to a specific member.',
            userPerms: 'MANAGE_ROLES',
            botPerms: 'MANAGE_ROLES',
            category: 'Moderation'
        })
    }

    async run(message, ...args) {

        let target = args[0]
        let role = args[1]

        target = Util.findMember(this.client, message, target, false);
        role = message.guild.roles.cache.get(role) || message.mentions.roles.last() || null
        if (role === null) {
            return message.channel.send({ content: 'Sorry, you have not provided a correct identifier for a role.'})
        }
        
        if (role.position > message.member.roles.highest.position) {
            return message.channel.send({ content: 'You cannot give a role higher than your own role.'})
        }

        try {
            target.roles.add(role).then(response => console.log(response))
            message.channel.send({ content: `Successfully given **${role.name}** to **${target.user.username}**.` })
        } catch(err) {
            message.channel.send({ content: 'An error has occured that has prevented your command from running correctly.' })
            console.error(err)
        }
    }
}