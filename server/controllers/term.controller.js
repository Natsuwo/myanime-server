const Term = require('../models/term.model')
const AnimeR = require('../models/anime.relationship.model')
module.exports = {
    async get(req, res) {
        try {
            var { term_id, type } = req.body
            if (!term_id) {
                var { type } = req.query
                var data = []
                var count = 0
                var terms = await Term.find({ type }, { _id: 0, __v: 0 })
                for (let term of terms) {
                    count = 0
                    var meta_id = term.term_id
                    var animeR = await AnimeR.find({ meta_id }).countDocuments()
                    count += animeR
                    term.set('count', count, { strict: false })
                    data.push(term)
                }

                return res.send({ success: true, data })
            }
            var terms = await Term.findOne({ type, term_id }, { _id: 0, __v: 0 })
            return res.send({ success: true, data: terms })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async post(req, res) {
        try {
            var { key, value, type, description } = req.body
            if (req.file) {
                value = `/upload/image/${req.file.originalname}`
            }
            var termCreate = await Term.create({ type, key, value, description })
            var term_id = termCreate.term_id
            return res.send({ success: true, message: 'Added', term_id })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async update(req, res) {
        try {
            var { type, key, value, description, term_id } = req.body
            if (req.file) {
                value = `/upload/image/${req.file.originalname}`
            }
            await Term.updateOne({ term_id, type }, { key, value, description })
            return res.send({ success: true, message: 'Edited.' })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async deleteTerm(req, res) {
        try {
            var { term_id, type } = req.body
            var meta_id = term_id
            await Term.deleteOne({ term_id, type })
            await AnimeR.deleteMany({ meta_id })
            res.send({ success: true, message: 'Deleted.' })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}