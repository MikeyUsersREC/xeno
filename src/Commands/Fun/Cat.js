const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const Utils = require('../../Structures/Util')

const Util = new Utils();

const subreddits = [
    'cat',
    'cats'
]

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ["cats"],
            category: "Fun"
        })
    }

    async run(message) {
        const data = await fetch(`https://imgur.com/r/${subreddits[Math.floor(Math.random() * subreddits.length)]}/hot.json`)
            .then(response => response.json())
            .then(body => body.data);
            let selected = data[Math.floor(Math.random() * data.length)]


        if (selected)
            return message.channel.send({ content: `https://imgur.com/${selected.hash}${selected.ext.replace(/\?.*/, '')}`})
        else {
            return message.channel.send({ content: 'An unknown error occured. Try running this command again and if this continues, contact Mikey#8970 for further support.'})
        }    }
}