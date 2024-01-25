require('dotenv').config()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const favoriteGamesSchema = new mongoose.Schema ({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    platform: { type: String, required: true },
    release_year: {type: Number},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
})

favoriteGamesSchema.methods.generateAuthToken = async function(next) {
    const token = jwt.sign({ _id: this._id });
    return token
}

const FavoriteGames = mongoose.model('FavoriteGames', favoriteGamesSchema)

module.exports = FavoriteGames