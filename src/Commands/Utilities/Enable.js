const Command = require('../../Structures/Command')
const Discord = require('discord.js')
const Mongoose = require('mongoose')
const Guild = require('../../Structures/Database/Schemas/Guild')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'enable',
            aliases: ['enable-extension', 'enable-ext'],
            category: 'Utilities',
            args: true,
            userPerms: ['ADMINISTRATOR'],
            guildOnly: true
        })
    }

    async run(message, ...args) {
        let GuildProfile = await Guild.findOne({ GuildId: message.guild.id })

        if (!GuildProfile) {
            GuildProfile = await new Guild({
                _id: Mongoose.Types.ObjectId(),
                GuildId: message.guild.id,
                extensions: [
                    { name: 'MeaxisNetwork', status: false},
                    { name: 'Roblox', status: false}
                ]
            })

            await GuildProfile.save().catch(err => console.log(err))
        }

        if (!args[0].toLowerCase() === 'meaxisnetwork' && !args[0].toLowerCase() === 'roblox') {
            return message.channel.send('You have not put a valid extension [\'MeaxisNetwork\', \'Roblox\']')
        }

        if (args[0].toLowerCase() === 'meaxisnetwork') {
            GuildProfile.extensions.forEach((dataset) => { if (dataset['name'] === 'MeaxisNetwork') dataset['status'] === true})
            await GuildProfile.save().catch(err => message.channel.send(err))
            return message.channel.send('Successfully enabled the MeaxisNetwork extension.')
        } else if (GuildProfile.extensions.forEach((dataset) => { if (dataset['name'] === 'MeaxisNetwork' && dataset['status'] === true) return true})) {
            return message.channel.send('The MeaxisNetwork extension is already enabled.')
        }

        if (args[0].toLowerCase() === 'roblox') {
            GuildProfile.extensions.forEach((dataset) => { if (dataset['name'] === 'Roblox') dataset['status'] === true})
            await GuildProfile.save().catch(err => message.channel.send(err))
            return message.channel.send('Successfully enabled the Roblox extension.')
        } else if (GuildProfile.extensions.forEach((dataset) => { if (dataset['name'] === 'Roblox' && dataset['status'] === true) return true})) {
            return message.channel.send('The Roblox extension is already enabled.')
        }
    }
}