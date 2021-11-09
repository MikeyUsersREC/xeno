const Command = require('../../Structures/Command')
const Discord = require('discord.js')
const { exec } = require('child_process')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['exec'],
            description: 'Executes commands in the console.',
            category: 'Owner',
            ownerOnly: true,
            usage: '<query>',
            args: true
        })
    }


    async run(message, ...args) {
        exec(args.join(' '), (error, stdout) => {
            const response = stdout || error;
            message.channel.send({content: Discord.Formatters.codeBlock(response) })
        })
    }}