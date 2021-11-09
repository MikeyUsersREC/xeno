const Command = require('../../Structures/Command')
const Discord = require('discord.js')
const Mongoose = require('mongoose')
const Guild = require('../../Structures/Database/Schemas/Guild')
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'disable',
            aliases: ['disable-extension', 'disable-ext'],
            category: 'Utilities',
            args: true,
            userPerms: ['ADMINISTRATOR'],
            guildOnly: true,
            usage: '<Extension>'
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
            return await message.channel.send({ content: 'You have not put a valid extension [\'MeaxisNetwork\', \'Roblox\']' })
        }

        if (args[0].toLowerCase() === 'meaxisnetwork' && GuildProfile.extensions[0]['name'] === 'MeaxisNetwork' && GuildProfile.extensions[0]['status'] === true) {
            GuildProfile.extensions.forEach((dataset) => { if (dataset['name'] === 'MeaxisNetwork') dataset['status'] = false})
            await GuildProfile.save().catch(err => message.channel.send({content: err}))
            return await message.channel.send({ content: 'Successfully disabled the MeaxisNetwork extension.'})
        } else if (GuildProfile.extensions[0]['name'] === 'MeaxisNetwork' && GuildProfile.extensions[0]['status'] === false) {
            return await message.channel.send({ content: 'The MeaxisNetwork extension is already disabled.'})
        }

        if (args[0].toLowerCase() === 'roblox') {
            GuildProfile.extensions.forEach((dataset) => { if (dataset['name'] === 'Roblox') dataset['status'] = false})
            await GuildProfile.save().catch(err => await message.channel.send({content: err}))
            return await message.channel.send({ content: 'Successfully disabled the Roblox extension.'})
        } else if (GuildProfile.extensions.forEach((dataset) => { if (dataset['name'] === 'Roblox' && dataset['status'] === false) return true})) {
            return await message.channel.send({ content: 'The Roblox extension is already disabled.'})
        }
    }
}