const Command = require('../../Structures/Command')
const { MessageAttachment } = require('discord.js')
const { inspect } = require('util');
const { Type } = require('@extreme_hero/deeptype')

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['ev'],
            description: 'Evaluates code on behalf of the bot.',
            category: 'Owner',
            ownerOnly: true,
            args: true,
            usage: '<Code>'
        })
    }

    clean(text) {
        if (typeof text === 'string') {
            text = text
                .replace(/`/g, `\`${String.fromCharCode(8203)}`)
                .replace(/@/g, `@${String.fromCharCode(8203)}`)
                .replace(new RegExp(this.client.token, 'gi'), '****')
        }
        return text
    }

    async run(message, ...args) {


        const msg = message;

        let code = args.join(' ');
        let evaluated;
        try {
            const start = process.hrtime();
            evaluated = eval(code);
            if (evaluated instanceof Promise) {
                evaluated = await evaluated
            }

            const text = this.clean(inspect(evaluated, { depth: 0 }))
            const stop = process.hrtime(start)
            const response = [
                '**Output:** \`\`\`js\n' + text + '\n\`\`\`',
                `**Type:** \`\`\`ts\n${new Type(evaluated).is}\n\`\`\``,
                `**Time Taken:** \`\`\`\n${(((stop[0] * 1e9))) + stop[1] / 1e6}ms\`\`\``
            ];

            const res = response.join('\n');
            if (res.length < 2000) {
                await msg.channel.send(res)
            } else {
                const output = new MessageAttachment(Buffer.from(res), 'output.txt')
                await msg.channel.send(output)
            }
        } catch (err) {
            console.error(err)
        }
    }
}