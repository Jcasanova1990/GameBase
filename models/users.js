require('dotenv').config()
const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    favoriteGames: [{type: mongoose.Schema.Types.ObjectId, ref: 'FavoriteGame'}]
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcryptjs.hash(this.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function () {
    const secretKey = process.env.SECRET
    const token = jwt.sign({ _id: this._id }, secretKey)
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User
