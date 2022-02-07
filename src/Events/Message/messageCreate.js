const Event = require('../../Structures/Event')
const Guild = require('../../Structures/Database/Schemas/Guild')
const Mongoose = require('mongoose')

module.exports = class extends Event {

    async run(message) {
        const mentionRegex = RegExp(`^<@!?${this.client.user.id}>$`);
        const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}> `);

        if (message.author.bot) {
            return
        }

        if (message.content.match(mentionRegex)) await message.channel.send({ content: `My prefix for ${message.guild.name} is \`${this.client.prefix}\`.`})

        const prefix = message.content.match(mentionRegexPrefix) ?
            message.content.match(mentionRegexPrefix)[0] : this.client.prefix;
        
        const [cmd,  ...args] = message.content.slice(prefix.length).trim().split(/ +/g)
        const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()))
        if (!message.content.startsWith(prefix)) return;
        if (command) {
            if (command.ownerOnly && !this.client.utils.checkOwner(message.author.id)) {
                return message.reply({ content: 'Sorry, this command can only be used by the bot owners.' })
            }

            if (command.guildOnly && !message.guild) {
                return message.reply({ content: 'Sorry, this command can only be used in a discord server.'})
            }

            if (command.nsfw && !message.channel.nsfw) {
                return message.reply({ content: 'Sorry, this command can only be used in a NSFW channel.'})
            }

            let GuildProfile = await require('../../Structures/Database/Schemas/Guild').findOne({ GuildId: message.guild.id })

            if (!GuildProfile) {
                GuildProfile = await new Guild({
                    _id: Mongoose.Types.ObjectId(),
                    GuildId: message.guild.id,
                    extensions: [
                        { name: 'MeaxisNetwork', status: false},
                        { name: 'Roblox', status: false}
                    ]
                })
            }

            if (GuildProfile.extensions[0]['status'] === false && command.category === 'MeaxisNetwork') {
                return await message.channel.send({ content: 'This command is not enabled on this server.'})
            }

            if (GuildProfile.extensions[1]['status'] === false && command.category === 'Roblox') {
                return await message.channel.send({ content: 'This command is not enabled on this server.'})
            }
            
            if (command.args && !args.length) {
                return message.reply({ content: `Sorry, this command requires arguments to function. Usage ${command.usage ? `${command.usage}` : 'This command doesn\'t have a usage format.'}`})
            }
			if (message.guild) {
				const userPermCheck = command.userPerms ? this.client.defaultPerms.add(command.userPerms) : this.client.defaultPerms;
				if (userPermCheck) {
					const missing = message.channel.permissionsFor(message.member).missing(userPermCheck);
					if (missing.length) {
						return message.reply({ content: `You are missing ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} permissions, you need them to use this command!`});
					}
				}

				const botPermCheck = command.botPerms ? this.client.defaultPerms.add(command.botPerms) : this.client.defaultPerms;
				if (botPermCheck) {
					const missing = message.channel.permissionsFor(this.client.user).missing(botPermCheck);
					if (missing.length) {
						return message.reply({ content: `I am missing ${this.client.utils.formatArray(missing.map(this.client.utils.formatPerms))} permissions, I need them to run this command!`});
					}
				}
            }

            console.log(`Invoked ${command.name} by ${message.author.username}`)
		try {
			command.run(message, ...args)
                .catch(error => console.log(`command ${command.name} fucked up, just like #cd3nt5hnx7 wants to f- snowy`))
		} catch (e) {
			console.log(`command ${command.name} fucked up, just like #cd3nt5hnx7 wants to f- snowy`)	
            if (this.utils.checkOwner(message.author.id)) {
                message.channel.send(`\`${e}\``)
            }
		}
			
        }
    }
}
