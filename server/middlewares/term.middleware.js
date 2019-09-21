const Term = require('../models/Term')

module.exports = {
    async checkExist(req, res, next) {
        try {
            var { key, type } = req.body
            if (!key) throw Error('Missing name.')
            var termFound = await Term.findOne({ key, type })
            if (!termFound) {
                return next()
            }
            return res.send({ success: false, error: `This ${type} already exist.` })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}