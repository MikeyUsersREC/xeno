const Command = require('../../Structures/Command')
const { MessageEmbed } = require('discord.js')
const trivia = require('open-trivia-db')
const Util = require('../../Structures/Util')


module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'trivia',
            category: 'Fun',
            description: 'Test your knowledge via randomly generated questions!'
        })
    }

    async run(message, ...args) {
        const questions = await trivia.getQuestions();
        let question = questions[0]
        console.log(question.all_answers)
        const Embed = new MessageEmbed()
            .setColor(new Util().getColor())
            .setFooter(`Category: ${question.category} | Difficulty: ${question.difficulty}`)
            .setTitle(`${question.question}`)
            .setDescription(question.all_answers.join('\n'))
        

        await message.channel.send({ embeds: [Embed]})

        await message.channel.awaitMessages(msg => msg.author === message.author, { max: 1, time: 15000}).then(collected => {
            if (collected.first().content.toLowerCase() === question.correct_answer.toLowerCase()) {
                return await message.channel.send({ content: 'Correct! You successfully answered that question.'})
            } else {
                return await message.channel.send({ content: `Unfortunately, your answer was incorrect. The correct answer was **${question.correct_answer}**.`})
        }})
    }
}