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
            category: 'Roblox',
            args: true,
            usage: '<code>'
        })
    }

    async run(message, ...args) {
        let ServerCode = args[0];
        

        const Embed = new Discord.MessageEmbed()
            .setTitle('Server Start Up')
            .setColor(Utils.getColor())
            .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setThumbnail(message.guild.iconURL({ dyanmic: true }))
            .setDescription('What channel would you like this to be sent into?');
        
        let ssuChannel;

        let channels = message.guild.channels.cache.filter((channel) => { channel.type === 'GUILD_TEXT'}).array()

        const components = (state) => [
            new Discord.MessageActionRow().addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId('ssu-menu-1')
                    .setPlaceholder('SSU Channel')
                    .setDisabled(state)
                    .addOptions(
                        channels.map(channel => {
                            return {
                                label: channel.name,
                                value: channel.name.toLowerCase(),
                                description: channel.description || 'No description provided.'
                            }})
                        )
                    )
        ]

        const initialMessage = await message.channel.send( { embeds: [Embed], components: components(false) } )

        const filter = (interaction) => interaction.user.id === message.author.id;

        const collector = initialMessage.createMessageComponentCollector( { filter, componentType: 'SELECT_MENU'} )

        collector.on('collect', (interaction) => {
            const [ value ] = interaction.values;

            ssuChannel = message.guild.channels.cache.find(channel => channel.name === value.toLowerCase())
            
            if (!ssuChannel) return console.log('ERR: Not found channel.')
            if (ssuChannel.type !== 'GUILD_TEXT') return message.channel.send('Not selected text channel.')
                const NewOptionEmbed = new Discord.MessageEmbed()
                    .setTitle('Server Start Up')
                    .setColor(Utils.getColor())
                    .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setThumbnail(message.guild.iconURL({ dyanmic: true }))
                    .addFields([
                        {
                            name: 'Server Code',
                            value: args[0],
                            inline: false
                        },
                        {
                            name: 'Channel',
                            value: ssuChannel.toString(),
                            inline: false
                        }
                    ]);


            const SSUEmbed = new Discord.MessageEmbed()
                .setTitle('Server Start Up')
                .setColor(Utils.getColor())
                .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
                .setTimestamp()
                .setThumbnail(message.guild.iconURL({ dyanmic: true }))
                .addField('What is an SSU?', 'Server Start Ups, often abreviated as SSUs, are events to start the server up and get players in the server to roleplay. These are announced frequently throughout the day to keep activity.')
                .addField('How do I join the SSU?', 'To join the SSU, you need to enter the Emergency Response: Liberty County game, press the Menu button in the top right corner, click the Servers tab and enter in the code below')
                .addField('Server Code', `\`${ServerCode}\``);
            
            ssuChannel.send({ content: '@everyone', embeds: [SSUEmbed] }).then().catch(err => message.channel.send({ content: err}))
            interaction.reply({embeds: [NewOptionEmbed]})
        })
        }
}