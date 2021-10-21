const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const Utils = require('../../Structures/Util')

const Util = new Utils();


const subreddits = [
    'dog',
    'dogs',
    'dogpics',
]

module.exports = class extends Command {


    constructor(...args) {
        super(...args, {
            aliases: ["doggo", "dogpics"],
            category: "Fun"
        })
    }

    async run(message) {
        const data = await fetch(`https://imgur.com/r/${subreddits[Math.floor(Math.random() * subreddits.length)]}/hot.json`)
            .then(response => response.json())
            .then(body => body.data);
        let selected = data[Math.floor(Math.random() * data.length)]

        return message.channel.send(`https://imgur.com/${selected.hash}${selected.ext.replace(/\?.*/, '')}`)
    }
}