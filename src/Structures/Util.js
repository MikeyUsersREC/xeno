const { type } = require('os');
const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const Command = require('./Command.js')
const Event = require('./Event.js')

module.exports = class Util {
    constructor(client) {
        this.client = client
    }

    isClass(input) {
        return typeof input === 'function' &&
        typeof input.prototype === 'object' &&
        input.toString().substring(0, 5) === 'class'
    }

    get directory() {
        return `${path.dirname(require.main.filename)}${path.sep}`
    }


    checkOwner(target) {
        return this.client.owners.includes(target)
    }

    comparePerms(member, target) {
        return member.roles.highest.position < target.roles.highest.position;
    }

	formatPerms(perm) {
		return perm
				.toLowerCase()
				.replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
				.replace(/_/g, ' ')
				.replace(/Guild/g, 'Server')
				.replace(/Use Vad/g, 'Use Voice Acitvity');
	}

    formatArray(array, type = 'conjunction') {
        return new Intl.ListFormat('en-GB', { style: 'short', type: type}).format(array)
    }

    async loadCommands() {
        return glob(`${this.directory}Commands/**/*.js`).then(commands => {
            for (const commandFile of commands) {
                delete require.cache[commandFile]
                const { name } = path.parse(commandFile);
                const File = require(commandFile);
                if (!this.isClass(File)) throw new TypeError(`Command ${name} doesn't support a class.`)
                const command = new File(this.client, name.toLowerCase());
                if (!(command instanceof Command)) throw new TypeError(`Command ${name} doesn't belong in Commands.`)
                this.client.commands.set(command.name, command)
                if(command.aliases.length) {
                    for (const alias of command.aliases) {
                        this.client.aliases.set(alias, command.name)
                    }
                }
            }
        })
    }

    async loadEvents() {
        return glob(`${this.directory}Events/**/*.js`).then(events => {
            for (const eventFile of events) {
                delete require.cache[eventFile];
                const { name } = path.parse(eventFile);
                const File = require(eventFile);
                if (!this.isClass(File)) throw new TypeError('does not export class?');
                const event = new File(this.client, name);
                if (!(event instanceof Event)) throw new TypeError('not event?!')
                this.client.events.set(event.name, event)
                event.emitter[event.type](name, (...args) => event.run(...args));
            }
        })
    }

    trimArray(arr, maxLen = 10) {
        if (arr.length > maxLen) {
            const len = arr.length - maxLen
            arr = arr.slice(0, maxLen);
            arr.push(`${len} more...`)
        }
        return arr;
    }

    formatBytes(bytes) {

        if (bytes === 0) {
            return bytes
        } 

        const sizes = ["Bytes", "KB", "MB", "GB"]
        const i = Math.floor(Math.log(bytes) / Math.log(1024))
        return `${parseFloat(bytes / Math.pow(1024)).toFixed(2)} ${sizes[i]}`
    }


    removeDuplicates(arr) {
        return [...new Set(arr)]
    }

    getColor() {
        let colors = [[125, 51, 204], [204, 153, 0], [51, 51, 153], 0x2f3136]
        return colors[Math.floor(Math.random() * colors.length)]
    }


    capitalise(string) {
        return string.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ')
    }

    findMember(client, message, target, option = true) {
        if (option == true) {
            return message.mentions.members.last() || message.guild.members.cache.get(target) || message.guild.members.cache.get('name', target) || client.users.cache.get(target) || message.member;
        } else {
            return message.mentions.members.last() || message.guild.members.cache.get(target) || message.guild.members.cache.get('name', target) || message.guild.members.cache.find((member) => member.tag === target);
        }
}
}