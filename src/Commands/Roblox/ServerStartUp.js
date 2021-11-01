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
        
        message.channel.send({ embeds: [Embed]})

        let ssuChannel;

        await message.channel.awaitMessages(msg => msg.author === message.author, { max: 1, time: 60000}).then(collected => {
            let msg = collected.first()
            if (message.guild.channels.cache.find(channel => channel.name === msg.content.toLowerCase())) {
                ssuChannel = message.guild.channels.cache.find(channel => channel.name === msg.content.toLowerCase())
                
                const NewOptionEmbed = new Discord.MessageEmbed()
                    .setTitle('Server Start Up')
                    .setColor(Utils.getColor())
                    .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
                    .setTimestamp()
                    .setThumbnail(message.guild.iconURL({ dyanmic: true }))
                    .setDescription('What server code do you want to be displayed?');

                message.channel.send({ embeds: [NewOptionEmbed]})
            
            } else {
                return message.channel.send({ content: 'You have not put a correct channel name.'})
            }
        })

        await message.channel.awaitMessages(optionMsg => optionMsg.author === message.author, { max: 1, time: 60000}).then(collected => {
            let optionMsg = collected.first()

            const SSUEmbed = new Discord.MessageEmbed()
                .setTitle('Server Start Up')
                .setColor(Utils.getColor())
                .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
                .setTimestamp()
                .setThumbnail(message.guild.iconURL({ dyanmic: true }))
                .addField('What is an SSU?', 'Server Start Ups, often abreviated as SSUs, are events to start the server up and get players in the server to roleplay. These are announced frequently throughout the day to keep activity.')
                .addField('How do I join the SSU?', 'To join the SSU, you need to enter the Emergency Response: Liberty County game, press the Menu button in the top right corner, click the Servers tab and enter in the code below')
                .addField('Server Code', `\`${optionMsg}\``);
            
            ssuChannel.send(SSUEmbed).then().catch(err => message.channel.send({ content: err}))

        })



    }
}