const Anime = require('../models/anime.model')
const Episode = require('../models/episode.model')
const EpisodeMeta = require('../models/episodemeta.model')
module.exports = {
    async get(req, res) {
        try {
            var episodes = await Episode.find({}, { _id: 0, __v: 0 })
            var count = await Episode.countDocuments({})
            var episodeMeta = []

            for (let episode of episodes) {
                var anime_id = episode.anime_id
                var anime = await Anime.findOne({ anime_id }).select('title')
                var episode_id = episode.episode_id
                var episodemeta = await EpisodeMeta.find({ episode_id }, { _id: 0, __v: 0 })
                for (let item of episodemeta) {
                    episode.set(item.meta_key, item.meta_value, { strict: false })
                }
                episode.set('anime_title', anime.title, { strict: false })
                episodeMeta.push(episode)
            }
            res.send({ success: true, count, data: episodeMeta })
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
            var { anime_id, title, source, number, description, type, audio, subtitle, fansub } = req.body
            var episodeCreate = await Episode.create({ anime_id, title, source, number, description })
            var episode_id = episodeCreate.episode_id
            var episodeMeta = [
                { key: 'type', value: type },
                { key: 'audio', value: audio },
                { key: 'subtitle', value: subtitle },
                { key: 'fansub', value: fansub }
            ]
            for (let item of episodeMeta) {
                var meta_key = item.key
                var meta_value = item.value
                await EpisodeMeta.create({ episode_id, meta_key, meta_value })
            }
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

                var episode_id = episode.episode_id
                var episodemeta = await EpisodeMeta.find({ episode_id }, { _id: 0, __v: 0 })
                for (let item of episodemeta) {
                    episode.set(item.meta_key, item.meta_value, { strict: false })
                }
                return res.send({ success: true, data: episode })
            }

            var { episode_id, anime_id, title, source, number, description, type, audio, subtitle, fansub } = req.body
            var episodeMeta = [
                { key: 'type', value: type },
                { key: 'audio', value: audio },
                { key: 'subtitle', value: subtitle },
                { key: 'fansub', value: fansub }
            ]
            for (let item of episodeMeta) {
                var meta_key = item.key
                var meta_value = item.value
                await EpisodeMeta.updateOne({ episode_id, meta_key }, { meta_value })
            }
            await Episode.updateOne({ episode_id, anime_id }, { title, source, number, description })
            return res.send({ success: true, message: 'Edited.' })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async removeEpisode(req, res) {
        try {
            var { episode_id, anime_id } = req.body
            await Episode.deleteOne({ episode_id, anime_id })
            await EpisodeMeta.deleteMany({ episode_id })
            return res.send({ success: true, message: 'Edited.' })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}