const mongoose = require('mongoose'),
    Counter = require('./counter.model'),
    uniqid = require('uniqid')

const animeSchema = new mongoose.Schema({
    anime_id: Number,
    title: String,
    description: String,
    rating: String,
    type: String,
    status: String,
    premiered: String,
    thumbnail: String,
    view_id: {
        type: String,
        index: { unique: true }
    },
    create_at: Number,
    update_at: Number

})

animeSchema.pre('save', async function (next) {
    var anime = this
    anime.create_at = Date.now()
    anime.update_at = Date.now()
    anime.view_id = uniqid()
    var counter = await Counter.findOneAndUpdate({ key: "anime" }, { $inc: { value: 1 } }, { new: true })
    anime.anime_id = counter.value
    next()
})

animeSchema.pre('updateOne', function (next) {
    var update = this.getUpdate()
    update.$set = update.$set || {};
    update.$set.update_at = Date.now();
    next()
})

const Anime = mongoose.model('Anime', animeSchema, 'anime')

module.exports = Anime