const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 1
    return jwt.sign(user, process.env.JWTSECRET, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register(req, res) {
        try {
            var { data } = res.locals
            await User.create(data)
            res.send({ success: true, message: 'Your account has been successfully created.' })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    // Login
    async login(req, res) {
        try {
            var { user } = res.locals

            var dataUser = {}

            var userToken = {
                ID: user.user_id
            }

            dataUser.token = jwtSignUser(userToken)
            dataUser.username = user.username
            res.cookie('USER_ACCESS_TOKEN', dataUser.token, {
                signed: true,
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1)
            })
            res.send({
                success: true,
                user: dataUser
            })

        } catch (err) {
            res.send({
                success: false,
                error: err.message
            })
        }
    },
    async logout(req, res) {
        try {
            res.clearCookie('USER_ACCESS_TOKEN')
            res.send({ success: true, message: 'You are log out.' })
        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    },
    // Check USER_ACCESS_TOKEN
    async checkUserToken(req, res) {
        try {
            if (!req.signedCookies.USER_ACCESS_TOKEN) {
                return res.send({ success: false, error: 'Missing User Token.' })
            }
            var token = req.signedCookies.USER_ACCESS_TOKEN
            var verify = jwt.verify(token, process.env.JWTSECRET)
            if (Date.now() >= verify.exp * 1000) {
                return res.send({ success: false, error: 'Token is expired.' })
            }
            res.send({ success: true })

        } catch (err) {
            res.send({ success: false, error: err.message })
        }
    }
}