const Command = require('../../Structures/Command.js')
const { MessageEmbed } = require('discord.js');
const moment = require('moment')

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["ui", "memberinfo", "whois"],
            category: "Information"
        })
    }

    async run(message, ...args) {

        let target = args.join(' ')

        let util = this.client.utils;
        const member = util.findMember(this.client, message, target, false)

        if (!member) {
            return message.channel.send({ content: 'You have not entered a user object.'})
        }
        
        const roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString()).slice(0, -1)
        const userFlags = member.user.flags.toArray()

        const embed = new MessageEmbed()
            .setThumbnail(member.user.displayAvatarURL({ dynamic : true, size : 512 }))


            .addField('User Properties', [
                `**❯ Username:** ${member.user.username}`,
                `**❯ Discriminator:** ${member.user.discriminator}`,
                `**❯ ID:** ${member.id}`,
                `**❯ Flags:** ${userFlags.length ? userFlags.map(Flag => flags[Flag]).join(', ') : 'None'}`,
                `**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL( { dynamic: true } )})`,
                `**❯ Time Registered:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} <t:${moment(member.user.createdTimestamp).unix()}:R>`,
                "\u200b",
            ].join('\n'))

            .addField('Member Properties', [
                `**❯ Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
                `**❯ Join Date:** ${moment(member.joinedAt).format('LT')} ${moment(member.joinedAt).format('LL')} <t:${moment(member.joinedAt).unix()}:R>`,
                `**❯ Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : "None"}`,
                `**❯ Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(',\n') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
                "\u200b",
            ].join('\n'))


            .setColor(member.displayHexColor || util.getColor())
    

        message.channel.send({ embeds: [embed]})
}
}