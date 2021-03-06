const { Client, Collection, Permissions, Intents } = require('discord.js')
const Util = require('./Util.js')
const DisTube = require('distube')

module.exports = class BotClient extends Client {

    constructor(options = {}) {
        super({
            disableMentions: 'everyone',
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS]
        });
        this.validate(options)


        this.distube = new DisTube.DisTube(this, { leaveOnEmpty: true })
        this.commands = new Collection();
        this.aliases = new Collection();
        this.utils = new Util(this);
        this.events = new Collection();
        this.owners = options.owners

    }

    validate(options) {
        if (typeof(options) !== 'object') throw new TypeError('options are not object, error go brrrr')
        
        if (!options.token) throw Error('bonk, token no exist')

        this.token = options.token


        if (!options.prefix) throw new Error('bonk, prefix no exist')
        if (typeof(options.prefix) !== 'string') throw new Error('wdym? prefix is not a string?')
        this.prefix = options.prefix


        if (!options.defaultPerms) throw new Error('no perms?!')
        this.defaultPerms = new Permissions(options.defaultPerms).freeze();
    }

    async start(token = this.token) {
        this.utils.loadCommands();
        this.utils.loadEvents();
        require('./Database/Mongo').init()
        super.login(token)
    }
}