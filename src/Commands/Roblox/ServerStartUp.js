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

        let channels = message.guild.channels.cache.filter((channel) => { channel.type === 'GUILD_TEXT' })
        if (channels) {
            message.channel.send({ content: 'What channel do you want to send this to?'})

            let filter = (msg) => msg.member.id === message.member.id 
            let MessageCollector = message.channel.createMessageCollector({ filter, time: 60000, max: 1 })

            MessageCollector.on('collect', (msg) => {
                if (!channels.fetch(message.content)) return message.channel.send('You have not selected a valid channel.');
                else {
                    let ssuChannel = channels.fetch(message.content)

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
                    return message.channel.send({embeds: [NewOptionEmbed]})
                }
            })
    
    
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
            }
        }
    }