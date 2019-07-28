const Fansub = require('../models/fansub.model')
const EpisodeMeta = require('../models/episodemeta.model')
module.exports = {
    async get(req, res) {
        try {
            var count = await Fansub.countDocuments()
            var fansubs = await Fansub.find({}, { _id: 0, __v: 0 })
            var data = []
            for (let fansub of fansubs) {
                var meta_value = fansub.name
                var countTL = await EpisodeMeta.countDocuments({ meta_value })
                fansub.set('count', countTL, { strict: false })
                data.push(fansub)
            }
            res.send({ success: true, data, count })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async post(req, res) {
        try {
            var { name, description, trusted } = req.body
            var cover = banner = ''
            if (req.files['cover']) {
                var fileName = req.files['cover'][0].originalname
                cover = `/upload/fansub/cover/${fileName}`
            }
            if (req.files['banner']) {
                var fileName = req.files['banner'][0].originalname
                banner = `/upload/fansub/banner/${fileName}`
            }

            var fansubCreate = await Fansub.create({ name, description, cover, banner, trusted })
            var fansub_id = fansubCreate.fansub_id

            res.send({ success: true, message: 'Added.', fansub_id })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async update(req, res) {
        try {
            var { fansub_id } = req.query
            if (fansub_id) {
                var fansub = await Fansub.findOne({ fansub_id }, { __v: 0, _id: 0 })
                return res.send({ success: true, data: fansub })
            }

            var { fansub_id, name, cover, banner, description, trusted } = req.body
            if (req.files['cover']) {
                var fileName = req.files['cover'][0].originalname
                cover = `/upload/fansub/cover/${fileName}`
            }
            if (req.files['banner']) {
                var fileName = req.files['banner'][0].originalname
                banner = `/upload/fansub/banner/${fileName}`
            }

            await Fansub.updateOne({ fansub_id }, { name, cover, banner, description, trusted })

            return res.send({ success: true, message: 'Edited.' })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async removeFansub(req, res) {
        try {
            var { fansub_id } = req.body
            await Fansub.deleteOne({ fansub_id })
            res.send({ success: true, message: "Removed." })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}