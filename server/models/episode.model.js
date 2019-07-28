const mongoose = require('mongoose'),
    Counter = require('./counter.model'),
    uniqid = require('uniqid')
EpisodeMeta = require('./episodemeta.model')

const episodeSchema = new mongoose.Schema({
    anime_id: Number,
    episode_id: Number,
    title: String,
    number: Number,
    description: String,
    source: String,
    view_id: {
        type: String,
        index: { unique: true }
    },
    created_at: Number,
    updated_at: Number

})

episodeSchema.pre('save', async function (next) {
    var episode = this
    episode.created_at = Date.now()
    episode.updated_at = Date.now()

    episode.view_id = uniqid()
    var counter = await Counter.findOneAndUpdate({ key: "episode" }, { $inc: { value: 1 } }, { new: true })
    episode.episode_id = counter.value
    await EpisodeMeta.create({ episode_id: counter.value, meta_key: 'views', meta_value: 0 })
    next()
})

const Episode = mongoose.model('Episode', episodeSchema, 'episode')

module.exports = Episode