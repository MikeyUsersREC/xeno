const Event = require('../Structures/Event')

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            once: false
        })
    }

	run(err) {
		
		console.error(err)

}