const Command = require('../../Structures/Command')
const Utils = require('../../Structures/Util')
const Discord = require('discord.js')

const Util = new Utils();

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['kickmember', 'boot', 'ki'],
            args: true,
            usage: '<Member> [Reason]',
            guildOnly: true,
            description: 'Kicks the member from your discord server.',
            userPerms: 'KICK_MEMBERS',
            botPerms: 'KICK_MEMBERS',
            category: 'Moderation'
        })
    }

    async run(message, ...args) {

        let target = args[0]
        delete args[0]
        let reason = args.join(' ')

        target = Util.findMember(this.client, message, target, false);
        if (!reason) {
            reason = 'No Reason Provided'
        }
        

        const member_role = message.member.roles.highest.position
        const target_role = target.roles.highest.position


        console.log([member_role, target_role])
        if (target_role > member_role && !message.member === message.guild.owner) {
            return await message.channel.send({ content: 'You cannot kick this user since they are higher than you.'})
        }

        const Embed = new Discord.MessageEmbed()
            .addField('Member', `${target.user.tag}`, true)
            .addField('Moderator', `${message.member.user.tag}`, true)
            .addField('Reason', `${reason}`, false)
            .setTimestamp()
            .setColor(Util.getColor());

        if (target === message.guild.owner) {
            return await message.channel.send({ content: 'You are not permitted to kick the server owner.'})
        }

        // if (Member.roles.highest.position >= message.guild.members.cache.get(this.client.user.id).roles.highest.position) {
        //     return message.channel.send('I cannot ban the user since their highest role is above me.')
        // }


        try {
            target.kick(`Requested by ${message.member.username}: ${reason}`)
            await message.channel.send({ embeds: [Embed]})
        } catch(err) {
            await message.channel.send({ content: 'An error has occured.' })
            console.error(err)
        }
    }
}