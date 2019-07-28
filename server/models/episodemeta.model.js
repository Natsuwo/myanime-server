const mongoose = require('mongoose'),
    Counter = require('./counter.model')

const episodemetaSchema = new mongoose.Schema({
    episode_id: Number,
    meta_id: Number,
    meta_key: String,
    meta_value: mongoose.Schema.Types.Mixed

})

episodemetaSchema.pre('save', async function (next) {
    var episode = this
    var counter = await Counter.findOneAndUpdate({ key: "episodemeta" }, { $inc: { value: 1 } }, { new: true })
    episode.meta_id = counter.value
    next()
})


const EpisodeMeta = mongoose.model('EpisodeMeta', episodemetaSchema, 'episodemeta')

module.exports = EpisodeMeta