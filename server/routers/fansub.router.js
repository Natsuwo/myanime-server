const { Router } = require('express')
const multer = require('multer')
const route = Router()
const { get, post, update, removeFansub } = require('../controllers/fansub.controller')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./static/upload/fansub/${file.fieldname}/`)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage })
var fields = upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'banner', maxCount: 1 }])

route.get('/admin/fansub/get', get)
route.get('/admin/fansub/update', update)
route.post('/admin/fansub/update', fields, update)
route.post('/admin/fansub/post', fields, post)
route.post('/admin/fansub/remove-fansub', removeFansub)


module.exports = route