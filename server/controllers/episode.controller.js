const Anime = require('../models/anime.model')
const Episode = require('../models/episode.model')
module.exports = {
    async get(req, res) {
        try {
            var episodes = await Episode.find({}, { _id: 0, __v: 0 })
            var count = await Episode.countDocuments({})
            var data = []

            for (let episode of episodes) {
                var anime_id = episode.anime_id
                var anime = await Anime.findOne({ anime_id }).select('title')
                episode.set('anime_title', anime.title, { strict: false })
                data.push(episode)
            }
            res.send({ success: true, count, data: data })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async getAnime(req, res) {
        try {
            var animes = await Anime.find({}, { _id: 0 }).select('anime_id title thumbnail')
            res.send({ success: true, data: animes })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async post(req, res) {
        try {
            var { anime_id, title, number, description, type, audio, subtitle, fansub } = req.body
            var { source, thumbnail } = res.locals
            if (!thumbnail) thumbnail = ''
            var episodeCreate = await Episode.create({ anime_id, title, source, number, description, type, audio, subtitle, fansub, thumbnail })
            var episode_id = episodeCreate.episode_id
            res.send({ success: true, episode_id, message: "Added." })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async update(req, res) {
        try {
            var { episode_id } = req.query
            if (episode_id) {
                var episode = await Episode.findOne({ episode_id }, { __v: 0, _id: 0 })
                return res.send({ success: true, data: episode })
            }
            var { episode_id, anime_id, title, source, number, description, type, audio, subtitle, fansub } = req.body
            await Episode.updateOne({ episode_id, anime_id }, { title, source, number, description, type, audio, subtitle, fansub })
            return res.send({ success: true, message: 'Edited.' })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async removeEpisode(req, res) {
        try {
            var { episode_id, anime_id } = req.body
            await Episode.deleteOne({ episode_id, anime_id })
            return res.send({ success: true, message: 'Edited.' })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}