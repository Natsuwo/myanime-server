const { Router } = require('express')
const route = Router()
const { get, getAnime, post, update, removeEpisode } = require('../controllers/episode.controller')

route.get('/admin/episode/get', get)
route.get('/admin/episode/update', update)
route.get('/admin/episode/get-anime', getAnime)
route.post('/admin/episode/post', post)
route.post('/admin/episode/update', update)
route.post('/admin/episode/remove-episode', removeEpisode)

module.exports = route