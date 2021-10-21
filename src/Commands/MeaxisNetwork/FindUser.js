const Command = require('../../Structures/Command')
const fetch = require('node-fetch')
let Utils = require('../../Structures/Util')
const discord = require('discord.js')

Utils = new Utils()

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'finduser',
            description: 'Fetches a User on the MeaxisNetwork.',
            category: 'MeaxisNetwork',
            args: true,
            usage: '<discord/username> <query>'
        })
    }

    async run(message, ...args) {
        const choice = args[0]
        const query = args[1]

        console.log(choice)
        console.log(query)

        if (choice.toLowerCase() !== 'discord' && choice.toLowerCase() !== 'username') {
            return message.channel.send('You have not put a correct first argument. Correct arguments are: [\'discord\', \'username\']')
        }

    

        if (choice === 'discord') {
            console.log('discord [success]')
            const Member = Utils.findMember(this.client, message, query, false)


            if (!Member) {
                console.log('not member [success]')
                return message.channel.send(`Could not find a member with your query. Query: ${query}`)
            } else {
                console.log('member [success]')
                let url = `https://api.meaxisnetwork.net/v3/users/search?from=discord&query=${Member.id}`;
                console.log(url)

                let content = await fetch(url)
                    .then(content => content.json());
                
                let Embed = new discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
                    .setColor(Utils.getColor())
                    .setTimestamp()
                    .setTitle(content.username)
                    .setThumbnail(content.avatar);

                for (let [key, value] of Object.entries(content)) {
                    if (value && key !== 'titles') {
                        Embed.addField(Utils.capitalise(key), value)
                    }
                } 

                let list = []
                for (let key of content.titles) {
                    list.push(key['name'])
                }

                if (list) {
                    Embed.addField('Titles', list.join(', '))
                }
                
                await message.channel.send(Embed)
            }
        } else if (choice  === 'username') {
            console.log('member [success]')
            let url = `https://api.meaxisnetwork.net/v3/users/search?from=username&query=${query}`;
            console.log(url)

            let content = await fetch(url)
                .then(content => content.json());
            
            let Embed = new discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
                .setColor(Utils.getColor())
                .setTimestamp()
                .setTitle(content.username)
                .setThumbnail(content.avatar);

            for (let [key, value] of Object.entries(content)) {
                if (value && key !== 'titles') {
                    Embed.addField(Utils.capitalise(key), value)
                }
            } 

            let list = []
            for (let key of content.titles) {
                list.push(key['name'])
            }

            if (list.length > 0) {
                Embed.addField('Titles', list.join(', '))
            }
            
            await message.channel.send(Embed)
        }
    }
}