const { Router } = require('express')
const route = Router()
const { get } = require('../controllers/comment.controller')

route.get('/admin/comment/get', get)

module.exports = route