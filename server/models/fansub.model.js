const mongoose = require('mongoose'),
    Counter = require('./counter.model'),
    uniqid = require('uniqid')

const fansubSchema = new mongoose.Schema({
    fansub_id: Number,
    name: String,
    description: String,
    cover: String,
    banner: String,
    followers: {
        type: Number,
        default: 0
    },
    view_id: {
        type: String,
        index: { unique: true }
    },
    trusted: Boolean,
    created_at: Number
})

fansubSchema.pre('save', async function (next) {
    var fansub = this
    fansub.view_id = uniqid()
    fansub.created_at = Date.now()
    var counter = await Counter.findOneAndUpdate({ key: "fansub" }, { $inc: { value: 1 } }, { new: true })
    fansub.fansub_id = counter.value
    next()
})

const Fansub = mongoose.model('Fansub', fansubSchema, 'fansub')
module.exports = Fansub