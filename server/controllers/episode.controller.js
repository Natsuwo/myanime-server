const Episode = require('../models/episode.model')
module.exports = {
    async get(req, res) {
        try {
            var episodes = await Episode.find({}, { _id: 0, __v: 0 })
            res.send({ success: true, data: episodes })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}