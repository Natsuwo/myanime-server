const mongoose = require('mongoose'),
    Counter = require('./counter.model')

const commentSchema = new mongoose.Schema({
    comment_id: Number,
    episode_id: {
        type: Number,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    create_at: Number
})

commentSchema.pre('save', async function (next) {
    var comment = this
    comment.create_at = Date.now()
    var counter = await Counter.findOneAndUpdate({ key: "comment_id" }, { $inc: { value: 1 } }, { new: true })
    comment.comment_id = counter.value
    next()
})


const Comment = mongoose.model('Comment', commentSchema, 'comment')
module.exports = Comment