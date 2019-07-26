const mongoose = require('mongoose')

const episodeSchema = new mongoose.Schema({
    anime_id: Number,
    episode_id: Number,
    anime_title: String,
    title: Object,
    number: Number,
    thumbnail: String,
    description: String,
    source: String,
    view_id: {
        type: String,
        required: true,
        index: { unique: true }
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    create_at: Number,
    update_at: Number

})

episodeSchema.pre('save', function (next) {
    var anime = this
    anime.create_at = Date.now()
    anime.update_at = Date.now()
    next()
})

const Episode = mongoose.model('Episode', episodeSchema, 'episode')

module.exports = Episode