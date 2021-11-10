const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const Utils = require('../../Structures/Util')

const Util = new Utils();
const subreddits = [
    'memes',
    'bonehurtingjuice',
    'dankmemes',
    'me_irl',
    'funny'
]

module.exports = class extends Command {


    constructor(...args) {
        super(...args, {
            aliases: ["dankmemes"],
            category: "Fun"
        })
    }

    async run(message) {
        let subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
        console.log(subreddit)

        const data = await fetch(`https://imgur.com/r/${subreddit}/top.json`)
            .then(response => response.json())
            .then(body => body.data);
            let selected = data[Math.floor(Math.random() * data.length)]

            if (selected) {
                return await message.channel.send({ content: `https://imgur.com/${selected.hash}${selected.ext.replace(/\?.*/, '')}`})
            } else {
                selected = data[Math.floor(Math.random() * data.length)]
                if (selected) {
                    return await message.channel.send({ content: `https://imgur.com/${selected.hash}${selected.ext.replace(/\?.*/, '')}`})
                } else {
                return await message.channel.send({ content: 'An unknown error occured. Try running this command again and if this continues, contact `Mikey#8970` for further support.'})
            }}
    }
    }