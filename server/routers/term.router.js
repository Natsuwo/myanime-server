const { Router } = require('express')
const route = Router()
const { get, post, update, deleteTerm } = require('../controllers/term.controller')
const { checkExist } = require('../middlewares/term.middleware')
const { uploadImage } = require('../middlewares/upimg.middleware')
const { checkSecure, isUserLogin } = require('../validate/secure.validate')

route.get('/term/get', checkSecure, isUserLogin, get)
route.post('/term/post', checkSecure, isUserLogin, checkExist, uploadImage, post)
route.put('/term/update', checkSecure, isUserLogin, uploadImage, update)
route.delete('/term/delete', checkSecure, isUserLogin, deleteTerm)

module.exports = route