const Command = require('../../Structures/Command')
const Utils = require('../../Structures/Util')
const Discord = require('discord.js')

const Util = new Utils();

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['removeroles', 'roleremove'],
            args: true,
            usage: '<Member> <Role>',
            guildOnly: true,
            description: 'Removes a role from a specific member.',
            userPerms: 'MANAGE_ROLES',
            botPerms: 'MANAGE_ROLES',
            category: 'Moderation'
        })
    }

    async run(message, ...args) {

        let target = args[0]
        let rolename = args[1]

        target = Util.findMember(this.client, message, target, false);
        const role = message.guild.roles.cache.get(rolename) || message.mentions.roles.last() || null
        if (role === null) {
            return message.channel.send({ content: 'Sorry, you have not provided a correct identifier for a role.' })
        }
        
        if (role.position > message.member.roles.highest.position) {
            return message.channel.send({ content: 'You cannot give a role higher than your own role.'})
        }


        if (!target.roles.cache.has(rolename)) return message.channel.send({ content: 'This person does not have the role you have provided.'});

        try {
            target.roles.remove(role)
            message.channel.send({ content: `Successfully removed **${role.name}** from **${target.user.username}**.`})
        } catch(err) {
            message.channel.send({ content: 'An error has occured that has prevented your command from running correctly. Double-check that the user you are trying to remove a role from has that role before contacting support.'})
            console.error(err)
        }
    }
}