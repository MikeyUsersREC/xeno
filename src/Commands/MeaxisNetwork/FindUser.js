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
            return message.channel.send({ content: 'You have not put a correct first argument. Correct arguments are: [\'discord\', \'username\']'})
        }

    

        if (choice === 'discord') {
            console.log('discord [success]')
            const Member = Utils.findMember(this.client, message, query, false)


            if (!Member) {
                console.log('not member [success]')
                return message.channel.send({ content: `Could not find a member with your query. Query: ${query}`})
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

                console.log(content)
                for (let key in content) {
                    let value = content[key]
                    console.log([key, value])
                    if (key !== null && key !== undefined && key !== 'titles' && value !== null) {
                        console.log([key, typeof(key)])
                        console.log([value, typeof(value)])
                        Embed.addField(key.toString()[0] + key.toString().split(1) ?? "Could not find variable", value.toString() ?? "null")
                        console.log(Embed)
        
                    }
                }

                let list = []
                for (let key of content.titles) {
                    list.push(key['name'])
                }

                if (list) {
                    Embed.addField('Titles', list.join(', '))
                }
                console.log(Embed)

                await message.channel.send({ embeds: [Embed]})
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

            console.log(content)

            for (let key in content) {
                let value = content[key]
                console.log([key, value])
                if (key !== null && key !== undefined && key !== 'titles' && value !== null) {
                    console.log([key, typeof(key)])
                    console.log([value, typeof(value)])
                    Embed.addField(key.toString()[0] + key.toString().split(1) ?? "Could not find variable", value.toString() ?? "null")
                    console.log(Embed)
    
                }
            }

            let list = []
            for (let key of content.titles) {
                list.push(key['name'])
            }

            if (list.length > 0) {
                Embed.addField('Titles', list.join(', '))
            }
            console.log(Embed)
            
            await message.channel.send({ embeds: [Embed]})
        }
    }
}