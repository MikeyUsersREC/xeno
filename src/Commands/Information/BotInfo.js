const { MessageEmbed, djsversion } = require('discord.js')
const { version } = require('../../../package.json')
const Command = require('../../Structures/Command')
const { utc } = require('moment')
const os = require('os')
const ms = require('ms')
const Utils = require('../../Structures/Util')

const Util = new Utils();
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["bot-info", "info", "bot"],
            category: "Information"
        })
    }

    async run(message) {
        const core = os.cpus()[0]
        const embed = new MessageEmbed()
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor(message.guild.me.displayHexColor || Util.getColor())
            .addField('General', [
                `**❯ Client:** ${this.client.user.tag} \`${this.client.user.id}\``,
                `**❯ Commands:** ${this.client.commands.size}`,
                `**❯ Servers:** ${this.client.guilds.cache.size.toLocaleString()}`,
                `**❯ Users:** ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
                `**❯ Channels:** ${this.client.channels.cache.size.toLocaleString()}`,
                `**❯ Creation Date:** ${utc(this.client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
                `**❯ Node.js:** ${process.version}`,
                `**❯ Version:** v${version}`,
                `**❯ discord.js:** ${djsversion}`,
                '\u200b'
            ])
            .addField('System', [
                `**❯ Platform:** ${process.platform}`,
                `**❯ Uptime:** ${ms(os.uptime() * 1000, { long : true})}`,
                `**❯ CPU:**`,
                `\u3000 Cores: N/A`,
                `\u3000 Model: N/A`,
                `\u3000 Speed: N/A`
                // `**❯ Memory:**`,
                // `\u3000 Total: ${this.client.utils.formatBytes(process.memory_usage().heapTotal)}`
                // `\u3000 Used: ${this.client.utils.formatBytes(process.memory_usage().heapUsed)}`
            ])
            .setTimestamp()


        message.channel.send(embed)
    }
}