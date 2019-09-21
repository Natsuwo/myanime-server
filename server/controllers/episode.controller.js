const fs = require('fs')
const Anime = require('../models/Anime')
const Episode = require('../models/Episode')
const Comment = require('../models/Comment')
const UserMeta = require('../models/UserMeta')

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

async function newUpdate(newData, multi) {
    newData._id = undefined
    newData.__v = undefined
    newData.set('multi', multi, { strict: false })
    var isValid = await fs.readFileSync('../newupload.json', { encoding: 'utf8' })
    var oldData = JSON.parse(isValid)
    oldData.unshift(newData)
    var data = oldData
    if (data.length > 12) {
        data.splice(12, 1)
    }
    await fs.writeFileSync('../newupload.json', JSON.stringify(data), { encoding: 'utf8' })
}

async function deleteUpdate(episode_id) {
    var data = await fs.readFileSync('../newupload.json', { encoding: 'utf8' })
    var oldData = JSON.parse(data)
    var index = oldData.findIndex(x => x.episode_id === episode_id)
    if (index > -1) {
        oldData.splice(index, 1)
        await fs.writeFileSync('../newupload.json', JSON.stringify(oldData), { encoding: 'utf8' })
    }
}

module.exports = {
    async get(req, res) {
        try {
            var count = await Episode.countDocuments({})
            var page = parseInt(req.query.page || 1)
            var perPage = parseInt(req.query.limit || 20)
            var query = Episode.find({}, { __v: 0, _id: 0 }).sort({ created_at: -1 })
            var episodes = await query.skip((page - 1) * perPage).limit(perPage)
            var totalPage = Math.ceil(count / perPage);
            var search = req.query.q

            if (search) {
                var regex = new RegExp(escapeRegex(search), 'gi')
                var animes = await Anime.find({ $or: [{ title: regex }, { status: regex }, { season: regex }] }, { _id: 0 }).select('title anime_id')
                var episodes = []
                for (var item of animes) {
                    var items = await Episode.find({ anime_id: item.anime_id }, { __v: 0, _id: 0 }).skip((page - 1) * perPage).limit(perPage)
                    for (var episode of items) {
                        episodes.push(episode)
                    }

                }
                return res.send({ success: true, count, data: episodes, animes, meta: { page, perPage, totalPage } })
            }

            var animes = []
            for (let episode of episodes) {
                var anime_id = episode.anime_id
                var anime = await Anime.findOne({ anime_id }, { _id: 0 }).select('title anime_id')
                if (anime) animes.push(anime)
            }
            res.send({ success: true, count, data: episodes, animes, meta: { page, perPage, totalPage } })
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
            if (!anime_id) throw Error('Missing Anime')
            var { source, thumbnail } = res.locals
            if (!thumbnail) thumbnail = ''
            var episodeCreate = await Episode.create({ anime_id, title, source, number, description, type, audio, subtitle, fansub, thumbnail })
            await newUpdate(episodeCreate, false)
            var episode_id = episodeCreate.episode_id
            return res.send({ success: true, episode_id, message: "Added." })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async getUpdate(req, res) {
        try {
            var { episode_id } = req.query
            if (episode_id) {
                var episode = await Episode.findOne({ episode_id }, { __v: 0, _id: 0 })
                return res.send({ success: true, data: episode })
            }
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async update(req, res) {
        try {
            var { episode_id, anime_id, title, number, type, audio, subtitle, fansub, source } = req.body
            var { thumbnail } = res.locals
            await Episode.updateOne({ episode_id }, { anime_id, title, number, thumbnail, type, audio, subtitle, fansub, source })
            return res.send({ success: true, message: 'Edited.' })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async removeEpisode(req, res) {
        try {
            var { episode_id } = req.body
            await Episode.deleteOne({ episode_id })
            await deleteUpdate(episode_id)
            await Comment.deleteMany({ episode_id })
            await UserMeta.deleteMany({ parent_id: episode_id })
            return res.send({ success: true, message: 'Removed.' })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async addMulti(req, res) {
        try {
            var { form } = req.body
            var { lists } = res.locals
            var { anime_id, type, audio, subtitle, fansub } = form
            var episodeCreate = {}
            for (var item of lists) {
                var source = item.id
                var title = item.title
                var number = item.ep
                var thumbnail = item.thumbnail || 'https://cdn.discordapp.com/attachments/624579939471196180/624899350916759593/Fix_Error_Code_6602-720x340.jpeg'
                episodeCreate = await Episode.create({ anime_id, type, audio, subtitle, fansub, source, title, number, thumbnail })
            }
            var totalEp = lists.length
            var startEp = lists[0].ep
            var endEp = lists[totalEp - 1].ep
            episodeCreate.set('from', startEp, { strict: false })
            episodeCreate.set('to', endEp, { strict: false })
            await newUpdate(episodeCreate, true)
            res.send({ success: true, message: "You added." })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async getEditMulti(req, res) {
        try {
            var { anime_id, type, audio, subtitle, fansub } = req.query
            var episodes = await Episode.find({ anime_id, type, audio, subtitle, fansub })
            if (episodes.length === 0) throw Error('Not found')
            res.send({ success: true, results: episodes, message: "Found." })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    async editMulti(req, res) {
        try {
            var { lists } = req.body
            for (var item of lists) {
                var { episode_id, anime_id, type, audio, subtitle, fansub, source, title, number } = item
                await Episode.updateOne({ episode_id }, { source, title, anime_id, number, type, audio, subtitle, fansub })
            }
            res.send({ success: true, message: "You edited." })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}