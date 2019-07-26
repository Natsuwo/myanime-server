const Comment = require('../models/comment.model')
module.exports = {
    async get(req, res) {
        try {
            var comments = await Comment.find({}, { __v: 0, _id: 0 })  
            return res.send({ success: true, data: comments })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}