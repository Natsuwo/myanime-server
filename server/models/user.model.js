const mongoose = require('mongoose'),
    Counter = require('./counter.model'),
    bcrypt = require('bcrypt'),
    SALT_FACTOR = 12


const userSchema = new mongoose.Schema({
    user_id: Number,
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    username: {
        type: String,
        required: true,
        index: { unique: true }
    },
    nickname: String,
    password: {
        type: String,
        required: true
    },
    registered: Number
})

userSchema.pre('save', function (next) {
    var user = this

    // username to lowercase
    user.username = user.username.toLowerCase()
    // registered
    user.registered = Date.now()

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next()

    // generate a salt
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) return next(err)

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, async function (err, hash) {
            if (err) return next(err)

            // override the cleartext password with the hashed one
            user.password = hash
            // increment user_id
            var counter = await Counter.findOneAndUpdate({ key: "user_id" }, { $inc: { value: 1 } }, { new: true })
            user.user_id = counter.value
            next()
        })
    })
})

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
}
const User = mongoose.model('User', userSchema, 'user')
module.exports = User