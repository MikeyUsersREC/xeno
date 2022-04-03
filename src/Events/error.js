const Event = require('../Structures/Event')
const Sentry = require('../index')
module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            once: false
        })
    }

	run(err) {
		const transaction = Sentry.startTransaction({
            op: "xeno-error",
            name: "An error occured",
        });
        Sentry.captureException(err);
        console.log(err)
        transaction.finish()
}}