const { MessageEmbed, MessageActionRow, } = require('discord.js')
const Command = require('../Structures/Command.js')
const Discord = require('discord.js')
module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["commands", "cmds"],
            description: "Displays all commands"
        })
    }

    async run(message, ...args) {

        const command = args[0]

        const embed = new MessageEmbed()
            .setColor(this.client.utils.getColor())
            .setAuthor(`${message.guild.name} Help Menu`, message.guild.iconURL({ dynamic: true }))
            .setThumbnail(this.client.user.displayAvatarURL())
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
        
        if (command) {
            const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command))

            if (!cmd) return await message.channel.send({ content: `Invalid command name:\n\`${command}\`` })

            embed.setAuthor(`${this.client.utils.capitalise(cmd.name)} Command Help`, this.client.user.displayAvatarURL());
            embed.setDescription([
                `**❯ Aliases:** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(' ') : 'No Aliases'}`,
                `**❯ Description:** ${cmd.description}`,
                `**❯ Category:** ${cmd.category}`,
                `**❯ Usage:** ${cmd.usage}`,
            ].join('\n'))

            await message.channel.send({ embeds: [embed]})
        
        } else {
            embed.setDescription([
                `**❯ These are the available commands for** ${message.guild.name}`,
                `**❯ The bot's prefix is:** \`${this.client.prefix}\``,
                `**❯ Command Parameters:** \`<>\` is Required & \`[]\` is Optional`
            ].join('\n'))


            let categories;
            if (!this.client.owners.includes(message.author.id)) {
                categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'Owner').map(cmd => cmd.category))
            } else {
                categories = this.client.utils.removeDuplicates(this.client.commands.map(cmd => cmd.category))
            }

            for (const category of categories) {
                embed.addField(`**${this.client.utils.capitalise(category)}**`, this.client.commands.filter(cmd => cmd.category === category).map(cmd => `\`${cmd.name}\``).join(' '))
            }


            const components = (state) => [
                new Discord.MessageActionRow().addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId('help-menu')
                        .setPlaceholder('Help Category')
                        .setDisabled(state)
                        .addOptions(
                            categories.map( (cmd) => {
                                return {
                                    label: cmd,
                                    value: cmd.toLowerCase(),
                                    description: `${cmd} Commands`
                                }
                            })
                        )
                )
            ]

            const initalMessage = await message.channel.send( { embeds: [embed], components: components(false) } )

            const filter = (interaction) => interaction.user.id === message.author.id;

            const collector = message.channel.createMessageComponentCollector( { filter, componentType: 'SELECT_MENU'} )

            collector.on('collect', (interaction) => {
                const [ directory ] = interaction.values
                const category = categories.find(x => x.toLowerCase() === directory)

                const categoryEmbed = new MessageEmbed()
                    .setColor(this.client.utils.getColor())
                    .setAuthor(`${message.guild.name} Help Menu`, message.guild.iconURL({ dynamic: true }))
                    .setThumbnail(this.client.user.displayAvatarURL())
                    .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                    .addFields(this.client.commands.filter(x => x.category === category).map((command) => {
                        return {
                            name: `${command.name[0].toUpperCase()}${command.name.slice(1)}`,
                            value: command.description,
                            inline: true
                        }
                    }))
                    

                interaction.update({ embeds: [categoryEmbed]})
            })
        }

    }
    
}
