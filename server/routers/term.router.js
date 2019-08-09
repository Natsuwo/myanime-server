const { Router } = require('express')
const route = Router()
const multer = require('multer')
const { get, post, update, deleteTerm } = require('../controllers/term.controller')
const { checkMiddleware } = require('../middlewares/term.middleware')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../library/upload/image/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage })

route.get('/admin/term/get', get)
route.post('/admin/term/get', get)
route.post('/admin/term/post', upload.single('value'), checkMiddleware, post)
route.post('/admin/term/update', upload.single('value'), update)
route.post('/admin/term/delete', deleteTerm)

module.exports = route