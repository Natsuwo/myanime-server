const { Router } = require('express')
const multer = require('multer')
const route = Router()
const { get, post, update, removeTerm, removeAnime } = require('../controllers/anime.controller')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './static/upload/thumbnail/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage })

route.get('/admin/anime/get', get)
route.get('/admin/anime/update', update)
route.post('/admin/anime/update', upload.single('thumbnail'), update)
route.post('/admin/anime/post', upload.single('thumbnail'), post)
route.post('/admin/anime/remove-term', removeTerm)
route.post('/admin/anime/remove-anime', removeAnime)


module.exports = route