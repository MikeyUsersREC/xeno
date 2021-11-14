const Command = require('../../Structures/Command')
const Discord = require('discord.js')
let Utils = require('../../Structures/Util')

Utils = new Utils();

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'serverstartup',
            aliases: ['ssu'],
            description: 'Sends a message regarding a Server Start Up (Emergency Response: Liberty County) in a designated channel.',
            botPerms: 'MANAGE_CHANNELS',
            userPerms: 'MANAGE_CHANNELS',
            category: 'Roblox'
        })
    }

    async run(message) {
        const Embed = new Discord.MessageEmbed()
            .setTitle('Server Start Up')
            .setColor(Utils.getColor())
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setThumbnail(message.guild.iconURL({ dyanmic: true }))
            .setDescription('What channel would you like this to be sent into?');
        
        let ssuChannel;

        const components = (state) => [
            new Discord.MessageActionRow().addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId('ssu-menu-1')
                    .setPlaceholder('SSU Channel')
                    .setDisabled(state)
                    .addOptions(
                        message.guild.channels.cache.map(channel => {
                            return {
                                label: channel.name,
                                value: channel.name.toLowerCase(),
                                description: channel.description || 'No description provided.'
                            }
                        })
                    )
            )
        ]

        const initalMessage = await message.channel.send( { embeds: [Embed], components: components(false) } )

        const filter = (interaction) => interaction.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector( { filter, componentType: 'SELECT_MENU'} )

        collector.on('collect', (interaction) => {
            ssuChannel = message.guild.channels.cache.find(channel => channel.name === msg.content.toLowerCase())
                
                const NewOptionEmbed = new Discord.MessageEmbed()
                    .setTitle('Server Start Up')
                    .setColor(Utils.getColor())
                    .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setThumbnail(message.guild.iconURL({ dyanmic: true }))
                    .setDescription('What server code do you want to be displayed?');

            message.channel.send({ embeds: [NewOptionEmbed]})
        })


        const MessageFilter = (msg) => msg.author.id === message.author.id;

        const MessageCollector = message.channel.createMessageCollector({ MessageFilter, time: 60000, max: 1});

        MessageCollector.on('collect', (ServerCode) => {

            const SSUEmbed = new Discord.MessageEmbed()
                .setTitle('Server Start Up')
                .setColor(Utils.getColor())
                .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
                .setTimestamp()
                .setThumbnail(message.guild.iconURL({ dyanmic: true }))
                .addField('What is an SSU?', 'Server Start Ups, often abreviated as SSUs, are events to start the server up and get players in the server to roleplay. These are announced frequently throughout the day to keep activity.')
                .addField('How do I join the SSU?', 'To join the SSU, you need to enter the Emergency Response: Liberty County game, press the Menu button in the top right corner, click the Servers tab and enter in the code below')
                .addField('Server Code', `\`${ServerCode.content}\``);
            
            ssuChannel.send({ content: '@everyone', Embeds: [SSUEmbed] }).then().catch(err => message.channel.send({ content: err}))

        })
    }
}