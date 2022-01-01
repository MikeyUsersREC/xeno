const Command = require('../../Structures/Command.js')
const { MessageEmbed } = require('discord.js')
const moment = require('moment')
const Utils = require('../../Structures/Util')

const Util = new Utils();

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone'
};
const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};
const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydney: 'Sydney',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
};

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["server", "si", "gi", "guildinfo"],
            category: "Information"
        })
    }

    async run(message) {
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache
        const presences = message.guild.members.cache.filter((member) => member.presence !== null)
        const channels = message.guild.channels.cache
        const emojis = message.guild.emojis.cache
    
        const embed = new MessageEmbed()
            .setDescription(`**Guild Information for ${message.guild.name}**`)
            .setColor(Util.getColor())
            .setThumbnail(message.guild.iconURL({ dynamic : true }))
            .addField('General', [
                `**❯ Name:** ${message.guild.name}`,
                `**❯ ID:** ${message.guild.id}`,
                `**❯ Owner:** ${await message.guild.fetchOwner() || 'N/A'} \`${await message.guild.fetchOwner().id || "Not Found"}\``,
                `**❯ Region:** ${regions[message.guild.region]}`,
                `**❯ Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
                `**❯ Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
                `**❯ Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
                `**❯ Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} <t:${moment(message.guild.createdTimestamp).unix()}:R>`,
                '\u200b'
            ].join('\n'))
            .addField('Statistics', [
				`**❯ Maximum Member Count:** ${message.guild.maximumMembers}`,
                `**❯ Role Count:** ${roles.length}`,
                `**❯ Emoji Count:** ${emojis.size}`,
                `**❯ Regular Emoji Count:** ${emojis.filter(emoji => !emoji.animated).size}`,
                `**❯ Animated Emoji Count:** ${emojis.filter(emoji => emoji.animated).size}`,
                `**❯ Member Count:** ${message.guild.memberCount}`,
                `**❯ Human Count:** ${members.filter(member => !member.user.bot).size}`,
                `**❯ Bot Count:** ${members.filter(member => member.user.bot).size}`,
                `**❯ Text Channels:** ${channels.filter(channel => channel.type === "text").size}`,
                `**❯ Voice Channels:** ${channels.filter(channel => channel.type === "voice").size}`,
                `**❯ Boost Count:** ${message.premiumSubscriptionCount || 0}`,
                '\u200b'
            ].join('\n'))

            // .addField('Presence', [
            //     `**❯ Online:** ${presences.filter(member => member.presence.status === "online").size}`,
            //     `**❯ Idle:** ${presences.filter(member => member.presence.status === "idle").size}`,
            //     `**❯ Do Not Disturb:** ${presences.filter(member => member.presence.status === "dnd").size}`,
            //     `**❯ Offline:** ${presences.filter(member => member.presence.status === "offline").size}`,
            //     '\u200b'
            // ].join('\n'))
    

            .setTimestamp();        
            await message.channel.send({ embeds: [embed]})
    }
}