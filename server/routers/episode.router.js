const { Router } = require('express')
const route = Router()
const { get } = require('../controllers/episode.controller')

route.get('/admin/episode/get', get)

module.exports = route