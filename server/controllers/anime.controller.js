const Term = require('../models/term.model')
const Anime = require('../models/anime.model')
const AnimeR = require('../models/anime.relationship.model')
const AnimeMeta = require('../models/animemeta.model')
module.exports = {
    async get(req, res) {
        try {
            var count = await Anime.countDocuments()
            var animes = await Anime.find({}, { _id: 0, __v: 0 }).sort({ update_at: 1 })
            var animeMeta = []
            var terms = []

            for (let anime of animes) {
                var anime_id = anime.anime_id
                var animemeta = await AnimeMeta.find({ anime_id }, { _id: 0, __v: 0 })
                var animeR = await AnimeR.find({ anime_id }, { _id: 0, __v: 0 })

                for (let i = 0; i < animeR.length; i++) {
                    var term = await Term.findOne({ term_id: animeR[i].meta_id }, { _id: 0, __v: 0 }).sort({ key: 1 })
                    terms.push(term)
                }

                anime.set('terms', terms, { strict: false })
                anime.set('animemeta', animemeta, { strict: false })
                animeMeta.push(anime)
                terms = []
            }
            res.send({ success: true, data: animeMeta, count })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async post(req, res) {
        try {
            var { title, en, jp, type, rating, status, premiered, terms, description } = req.body
            var thumbnail = ''
            if (req.file) {
                thumbnail = `/upload/thumbnail/${req.file.originalname}`
            }

            var animeCreate = await Anime.create({ title, premiered, type, rating, status, description, thumbnail })
            var anime_id = animeCreate.anime_id

            if (en) {
                await AnimeMeta.create({ anime_id, meta_key: 'en_title', meta_value: en })
            }

            if (jp) {
                await AnimeMeta.create({ anime_id, meta_key: 'jp_title', meta_value: jp })
            }

            if (terms) {
                var term = terms.split(',')
                for (let i = 0; i < term.length; i++) {
                    var meta_id = term[i]
                    await AnimeR.create({ anime_id, meta_id })
                }
            }

            res.send({ success: true, anime_id, message: 'Added.' })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async update(req, res) {
        try {
            var { anime_id } = req.query
            if (anime_id) {
                var data = []
                var terms = []
                var anime = await Anime.findOne({ anime_id }, { _id: 0, __v: 0 })
                var animemeta = await AnimeMeta.find({ anime_id }, { _id: 0, __v: 0 })
                var animeR = await AnimeR.find({ anime_id }, { _id: 0, __v: 0 })

                for (let i = 0; i < animeR.length; i++) {
                    var term = await Term.findOne({ term_id: animeR[i].meta_id }, { _id: 0, __v: 0 })
                    terms.push(term)
                }
                anime.set('animemeta', animemeta, { strict: false })
                anime.set('terms', terms, { strict: false })
                data.push(anime)
                return res.send({ success: true, data })
            }
            var { anime_id, title, en, jp, type, rating, status, premiered, terms, description } = req.body

            if (req.file) {
                var thumbnail = `/upload/thumbnail/${req.file.originalname}`
                await Anime.updateOne({ anime_id }, { thumbnail })
            }

            await Anime.updateOne({ anime_id }, { title, premiered, type, rating, status, description })

            if (en) {
                await AnimeMeta.updateOne({ anime_id, meta_key: 'en_title' }, { meta_value: en })
            }

            if (jp) {
                await AnimeMeta.updateOne({ anime_id, meta_key: 'jp_title' }, { meta_value: jp })
            }

            if (terms) {
                await AnimeR.deleteMany({ anime_id })
                var term = terms.split(',')
                for (let i = 0; i < term.length; i++) {
                    var meta_id = term[i]
                    var animeR = await AnimeR.findOne({ anime_id, meta_id })
                    if (!animeR) {
                        await AnimeR.create({ anime_id, meta_id })
                    }
                }
            }

            return res.send({ success: true, message: 'Edited.' })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async removeTerm(req, res) {
        try {
            var { anime_id, meta_id } = req.body
            await AnimeR.deleteOne({ anime_id, meta_id })
            return res.send({ success: true, message: 'Removed.' })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async removeAnime(req, res) {
        try {
            var { anime_id } = req.body
            await Anime.deleteOne({ anime_id })
            await AnimeMeta.deleteMany({ anime_id })
            await AnimeR.deleteMany({ anime_id })
            return res.send({ success: true, message: 'Removed.' })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}