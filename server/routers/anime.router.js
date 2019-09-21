const { Router } = require('express')
const route = Router()
const { get, post, getUpdate, postUpdate, removeTerm, removeAnime, crawlAnime } = require('../controllers/anime.controller')
const { uploadImage } = require('../middlewares/upimg.middleware')
const { checkSecure, isUserLogin } = require('../validate/secure.validate')

route.get('/anime/get', checkSecure, isUserLogin, get)
route.get('/anime/update', checkSecure, isUserLogin, getUpdate)
route.put('/anime/update', checkSecure, isUserLogin, uploadImage, postUpdate)
route.post('/anime/post', checkSecure, isUserLogin, uploadImage, post)
route.post('/anime/crawl', checkSecure, isUserLogin, crawlAnime)
route.post('/anime/remove-term', checkSecure, isUserLogin, removeTerm)
route.post('/anime/remove-anime', checkSecure, isUserLogin, removeAnime)

module.exports = route