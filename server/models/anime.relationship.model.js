const mongoose = require('mongoose')

const animeRelationshipSchema = new mongoose.Schema({
    anime_id: String,
    meta_id: Number
})


const AnimeR = mongoose.model('AnimeR', animeRelationshipSchema, 'anime_relationship')

module.exports = AnimeR