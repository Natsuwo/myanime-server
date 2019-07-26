const { Router } = require('express')
const route = Router()
const { login, checkUserToken, logout } = require('../controllers/auth.controller')
const { validateBeforeLogin } = require('../validate/auth.validate')

route.post('/admin/auth/login', validateBeforeLogin, login)
route.post('/admin/auth/check-user-token', checkUserToken)
route.post('/admin/auth/logout', logout)

module.exports = route