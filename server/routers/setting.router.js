const { Router } = require('express')
const route = Router()
const { getSetting, updateSetting, updateProfile } = require('../controllers/setting.controller')
const { changePassword, changePin } = require('../middlewares/setting.middleware')
const { checkSecure, isUserLogin } = require('../validate/secure.validate')
const { uploadImage } = require('../middlewares/upimg.middleware')

route.put('/setting/profile', checkSecure, isUserLogin, uploadImage, changePassword, changePin, updateProfile)
route.get('/setting/get', checkSecure, isUserLogin, getSetting)
route.put('/setting/update', checkSecure, isUserLogin, updateSetting)

module.exports = route