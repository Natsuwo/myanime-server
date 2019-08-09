const { Router } = require('express')
const route = Router()
const { validateDrive, getThumbnail } = require('../middlewares/episode.middleware')
const { get, getAnime, post, update, removeEpisode } = require('../controllers/episode.controller')

route.get('/admin/episode/get', get)
route.get('/admin/episode/update', update)
route.get('/admin/episode/get-anime', getAnime)
route.post('/admin/episode/post', validateDrive, getThumbnail, post)
route.post('/admin/episode/update', update)
route.post('/admin/episode/remove-episode', removeEpisode)

module.exports = route