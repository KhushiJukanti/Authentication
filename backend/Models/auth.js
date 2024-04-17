const mongoose = require('mongoose')

let authShema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    repassword: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true
    }
})


module.exports = mongoose.model("auth", authShema)