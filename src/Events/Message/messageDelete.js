const Event = require('../../Structures/Event');
const Embed = require('../../Structures/Embed');
const Utils = require('../../Structures/Util')
module.exports = class extends Event {

    async run(message) {
        if (!message.guild || message.author.bot) return;
        const attachments = message.attachments.size ? message.attachments.map(attachment => attachment.proxyURL) : null;
        const embed = new Embed()
            .setColor(new Utils().getColor())
            .setAuthor(message.author.tag, this.client.user.displayAvatarURL({ dynamic: true }))
            .setTitle('Message deleted')
            .setDescription([
                `**❯ Message ID:** ${message.id}`,
                `**❯ Channel:** ${message.channel}`,
                `**❯ Author:** ${message.member.displayName}`,
            ])

    if (message.content.length) {
        embed.splitFields(`**❯ Deleted Message:** ${message.content}`)
    }

    const channel = message.guild.channels.cache.find(ch => ch.name === 'logs') 

    if (channel) channel.send(embed);
    }
}