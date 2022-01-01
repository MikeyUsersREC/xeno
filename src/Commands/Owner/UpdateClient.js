const Command = require('../../Structures/Command')
const Discord = require('discord.js')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['updatebot', 'update', 'upd'],
            description: 'Updates the bot via the repository.',
            category: 'Owner',
            ownerOnly: true,
        })
    }


    async run(message, ...args) {
        exec('git pull origin main', (error, stdout) => {
            const response = stdout || error;
            message.channel.send({content: `**${response}**` })
        })
    }}