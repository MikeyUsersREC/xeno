const Command = require('../../Structures/Command')
const Utils = require('../../Structures/Util')
const Discord = require('discord.js')

const Util = new Utils();

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['softban', 'sbi'],
            args: true,
            usage: '<Member> [Reason]',
            guildOnly: true,
            description: 'Bans the member from your discord server without deleting any of their messages.',
            userPerms: 'BAN_MEMBERS',
            botPerms: 'BAN_MEMBERS',
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
            return message.channel.send({ content: 'You cannot ban this user since they are higher than you.'})
        }

        const Embed = new Discord.MessageEmbed()
            .addField('Member', `${target.user.tag}`, true)
            .addField('Moderator', `${message.member.user.tag}`, true)
            .addField('Reason', `${reason}`, false)
            .setTimestamp()
            .setColor(Util.getColor());

        if (target === message.guild.owner) {
            return message.channel.send({ content: 'You are not permitted to ban the server owner.'})
        }

        // if (Member.roles.highest.position >= message.guild.members.cache.get(this.client.user.id).roles.highest.position) {
        //     return message.channel.send('I cannot ban the user since their highest role is above me.')
        // }


        try {
            target.ban({reason: `Requested by ${message.member.username}: ${reason}`, days: 0})
            message.channel.send({ embeds: [Embed]})
        } catch(err) {
            message.channel.send({ content: 'An error has occured that has prevented your command from running correctly.'})
            console.error(err)
        }
    }
}