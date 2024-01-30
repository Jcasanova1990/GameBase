require('dotenv').config()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const favoriteGameSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    platform: { type: String, required: true },
    release_year: { type: Number, required: true },
}, {
    timestamps: true
})

favoriteGameSchema.methods.generateAuthToken = async function() {
    const secretKey = process.env.SECRET
    const token = jwt.sign({ _id: this._id }, secretKey)
    return token;
}

const FavoriteGame = mongoose.model('FavoriteGame', favoriteGameSchema)

module.exports = FavoriteGame
