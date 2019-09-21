const { Router } = require('express')
const route = Router()
const { validateDrive, beforeAddMulti } = require('../middlewares/episode.middleware')
const { getThumbnail, getThumbnails } = require('../middlewares/upimg.middleware')
const { get, getAnime, post, getUpdate, update, removeEpisode, addMulti, getEditMulti, editMulti } = require('../controllers/episode.controller')
const { checkSecure, isUserLogin } = require('../validate/secure.validate')

route.get('/episode/get', checkSecure, isUserLogin, get)
route.get('/episode/update', checkSecure, isUserLogin, getUpdate)
route.get('/episode/get-anime', checkSecure, isUserLogin, getAnime)
route.get('/episode/edit-multi', checkSecure, isUserLogin, getEditMulti)
route.put('/episode/edit-multi', checkSecure, isUserLogin, editMulti)
route.put('/episode/update', checkSecure, isUserLogin, update)
route.post('/episode/post', checkSecure, isUserLogin, validateDrive, getThumbnail, post)
// route.post('/episode/postEx', validateDrive, getThumbnail, post)
route.post('/episode/add-multi', checkSecure, isUserLogin, beforeAddMulti, getThumbnails, addMulti)
route.delete('/episode/remove-episode', checkSecure, isUserLogin, removeEpisode)

module.exports = route