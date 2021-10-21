const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const Utils = require('../../Structures/Util')

const Util = new Utils();
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
            aliases: ['minfo', 'messageinformation', 'getmessage', 'getmsg'],
            description: 'Gets information about a given message.',
            category: 'Information',
            args: true
        })
    }

    async run(message, ...id) {

        id = id[0]


        console.log(id)
        console.log(typeof id)

        let IdentifiedMessage = await message.channel.messages.fetch(id)
        
        console.log(IdentifiedMessage);
        console.log(typeof IdentifiedMessage)

        if (!IdentifiedMessage) {
            return message.channel.send('Sorry, the provided Message ID could not be found in the current channel.')
        }

        console.log(IdentifiedMessage)
        console.log(typeof IdentifiedMessage)

        const CheckOrCross = (bool) => bool ? '✅' : '❎'

        const Embed = new MessageEmbed()
            .setAuthor(IdentifiedMessage.author.username, IdentifiedMessage.author.displayAvatarURL({ dynamic: true }))
            .setColor(Util.getColor())
            .setTitle(`Message Information \`${IdentifiedMessage.id}\``)
            .addField('General', [
                `**❯ ID:** ${IdentifiedMessage.id}`,
                `**❯ Author:** ${IdentifiedMessage.author}`,
                `**❯ Created At:** ${moment(IdentifiedMessage.createdTimestamp).format('LT')} ${moment(IdentifiedMessage.createdTimestamp).format('LL')} <t:${moment(IdentifiedMessage.createdTimestamp).unix()}:R>}`,
                `**❯ Type:** \`${IdentifiedMessage.type}\``,
                `**❯ URL:** ${IdentifiedMessage.url}`
            ])       

            .addField('Author Information', [
                `**❯ Username:** ${IdentifiedMessage.author.username}`,
                `**❯ Discriminator:** ${IdentifiedMessage.author.discriminator}`,
                `**❯ Tag:** ${IdentifiedMessage.author.tag}`,
                `**❯ ID:** ${IdentifiedMessage.author.id}`,
                `**❯ Created At:** ${moment(IdentifiedMessage.author.createdTimestamp).format('LT')} ${moment(IdentifiedMessage.author.createdTimestamp).format('LL')} <t:${moment(IdentifiedMessage.author.createdTimestamp).unix()}:R>}`,
                `**❯ Avatar Hash:** \`${IdentifiedMessage.author.avatar}\``,
                `**❯ Flags:** ${IdentifiedMessage.author.flags.toArray().length ? IdentifiedMessage.author.flags.toArray().map(Flag => flags[Flag]).join(', ') : 'None'}`,
                `**❯ System Account:** ${CheckOrCross(IdentifiedMessage.author.system)}`,
                `**❯ Bot Account:** ${CheckOrCross(IdentifiedMessage.author.bot)}`,
                `**❯ Partial:** ${CheckOrCross(IdentifiedMessage.author.partial)}`
            ])


            .addField('Other', [
                `**❯ Text-To-Speech: ** ${CheckOrCross(IdentifiedMessage.tts)}`,
                `**❯ System Message:** ${CheckOrCross(IdentifiedMessage.system)}`,
                `**❯ Pinned:** ${CheckOrCross(IdentifiedMessage.pinned)}`,
                `**❯ Partial:** ${CheckOrCross(IdentifiedMessage.partial)}`,
                `**❯ Deleted:** ${CheckOrCross(IdentifiedMessage.deleted)}`,
                `**❯ Crosspostable:** ${CheckOrCross(IdentifiedMessage.crosspostable)}`,
                `**❯ From Webhook:** ${CheckOrCross(message.webhookId ? true : false)}`
            ])
            .setThumbnail(IdentifiedMessage.author.avatarURL({ dynamic: true }))
            .setTimestamp();
        
        message.channel.send(Embed)
    }
}