const { Client, Collection, Permissions, Intents } = require('discord.js')
const Util = require('./Util.js')
const DisTube = require('distube')

module.exports = class BotClient extends Client {

    constructor(options = {}) {
        super({
            disableMentions: 'everyone',
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]
        });
        this.validate(options)


        this.distube = new DisTube.DisTube(this)
        this.commands = new Collection();
        this.aliases = new Collection();
        this.utils = new Util(this);
        this.events = new Collection();
        this.owners = options.owners;

        this.distube
            .on("playSong", (message, queue, song) => message.reply(
                { content: `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`}
            ))
            .on("addSong", (message, queue, song) => message.channel.send(
                { content: `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`}
            ))
            .on("playList", (message, queue, playlist, song) => message.channel.send(
                { content: `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\``}
            ))
            .on("addList", (message, queue, playlist) => message.channel.send(
                { content: `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n`}
            ))

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